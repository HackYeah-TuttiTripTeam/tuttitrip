// Prints a deck to PDF in headless Chrome over the DevTools protocol (build.mjs uses it).
// The page is opened with "?print", so a deck can prepare itself for paper (render every
// slide, finish animations). Besides the PDF it returns the text runs of the page with
// their CSS font: Chrome embeds variable fonts in PDFs as anonymous Type 3 fonts, and
// pdf2pptx.py uses these runs to give the PPTX text its real font family and weight.
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Runs in the page: every visible text node with its font, sizes in PDF points.
const RUNS = `(() => {
  const out = []
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    const text = n.textContent.replace(/\\s+/g, ' ').trim()
    const el = n.parentElement
    if (!text || !el || !el.getClientRects().length) continue
    const cs = getComputedStyle(el)
    out.push({
      text,
      family: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
      weight: Number(cs.fontWeight) || 400,
      size: parseFloat(cs.fontSize) * 0.75,
    })
  }
  return JSON.stringify(out)
})()`

export async function printDeck(chrome, html, pdf) {
  const port = 9300 + Math.floor(Math.random() * 600)
  const proc = spawn(chrome, ['--headless', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${port}`, 'about:blank'], { stdio: 'ignore' })
  try {
    let target
    for (let i = 0; i < 100 && !target; i++) {
      await sleep(100)
      try {
        target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page')
      } catch {}
    }
    if (!target) throw new Error('Chrome DevTools did not start')
    const ws = new WebSocket(target.webSocketDebuggerUrl)
    await new Promise((r, j) => { ws.addEventListener('open', r); ws.addEventListener('error', j) })
    let id = 0
    const pending = new Map()
    const events = []
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data)
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } else if (m.method) events.push(m.method)
    })
    const send = (method, params = {}) => new Promise((r, j) => {
      pending.set(++id, (m) => (m.error ? j(new Error(`${method}: ${m.error.message}`)) : r(m.result)))
      ws.send(JSON.stringify({ id, method, params }))
    })
    const log = (m) => process.env.DEBUG && console.error('print:', m)
    await send('Page.enable')
    await send('Emulation.setEmulatedMedia', { media: 'print' })
    await send('Page.navigate', { url: `file://${html}?print` })
    for (let i = 0; i < 200 && !events.includes('Page.loadEventFired'); i++) await sleep(50)
    log('loaded')
    await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true })
    log('fonts')
    await sleep(2500) // count-up animations and late layout
    const runs = JSON.parse((await send('Runtime.evaluate', { expression: RUNS, returnByValue: true })).result.value)
    log('runs')
    // Streamed: a big PDF does not fit into one DevTools message.
    const { stream } = await send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, transferMode: 'ReturnAsStream' })
    const chunks = []
    for (let eof = false; !eof; ) {
      const part = await send('IO.read', { handle: stream, size: 1 << 20 })
      chunks.push(Buffer.from(part.data, part.base64Encoded ? 'base64' : 'utf8'))
      eof = part.eof
    }
    await send('IO.close', { handle: stream })
    writeFileSync(pdf, Buffer.concat(chunks))
    ws.close()
    return runs
  } finally {
    proc.kill()
  }
}
