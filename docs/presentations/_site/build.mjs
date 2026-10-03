#!/usr/bin/env node
// Builds docs/presentations into _site/dist for the "Decks" Worker
// (.github/workflows/decks.yml). No dependencies, Node 22+.
//
//   node docs/presentations/_site/build.mjs
//
// What counts as a deck (names starting with "_" or "." are skipped):
//   <name>.html                 one self-contained file, served at /<name>
//   <name>/package.json         a project (Slidev, Marp, reveal.js + Vite, ...):
//                               `npm run build` must write a static site with an
//                               index.html to $DECK_OUT, with asset paths under
//                               $DECK_BASE (= /<name>/). Served at /<name>/
//   <name>/index.html           a ready static folder, copied as is, at /<name>/
// A deck that links to "<name>.pdf" or "<name>.pptx" (download buttons) gets those files.
// The PDF is printed by headless Chrome (print.mjs; CHROME or google-chrome/chromium on
// PATH) with the page opened as "<name>.html?print", so the text stays selectable. The PPTX
// is made from that PDF by pdf2pptx.py (uv, or python3 with pymupdf and python-pptx):
// the page without text as the background and the text as editable text boxes on top.
// CI fails when a tool is missing; a local build skips the file with a warning.
// Then it writes the explorer (index.html) and 404.html next to the decks.
import { execFileSync } from 'node:child_process'
import { printDeck } from './print.mjs'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const site = dirname(fileURLToPath(import.meta.url))
const root = dirname(site)
const dist = join(site, 'dist')
const RESERVED = new Set(['index', '404'])

function findChrome() {
  const candidates = [process.env.CHROME, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']
  for (const bin of candidates.filter(Boolean)) {
    try {
      execFileSync(bin, ['--version'], { stdio: 'ignore' })
      return bin
    } catch {}
  }
  return null
}

function missing(what, file) {
  if (process.env.CI) throw new Error(`no ${what} to build ${file}`)
  console.warn(`decks: no ${what} found, skipping ${file}`)
  return false
}

function has(bin, args = ['--version']) {
  try {
    execFileSync(bin, args, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

// PDF and/or PPTX next to dist/<name>.html; returns the published paths that exist.
async function downloads(name, html) {
  const want = (ext) => html.includes(`href="${name}.${ext}"`)
  if (!want('pdf') && !want('pptx')) return {}
  const chrome = findChrome()
  if (!chrome) return missing('Chrome (set CHROME)', `${name}.pdf`) && {}
  const pdf = join(dist, `${name}.pdf`)
  const runs = await printDeck(chrome, join(dist, `${name}.html`), pdf)
  const out = want('pdf') ? { pdf: `/${name}.pdf` } : {}
  if (want('pptx')) {
    const fonts = join(dist, `${name}.fonts.json`)
    writeFileSync(fonts, JSON.stringify(runs))
    const args = [join(site, 'pdf2pptx.py'), pdf, join(dist, `${name}.pptx`), fonts]
    if (has('uv')) execFileSync('uv', ['run', '--quiet', ...args], { stdio: 'inherit' })
    else if (has('python3', ['-c', 'import pymupdf, pptx'])) execFileSync('python3', args, { stdio: 'inherit' })
    else missing('uv or python3 with pymupdf and python-pptx', `${name}.pptx`)
    rmSync(fonts)
    if (existsSync(join(dist, `${name}.pptx`))) out.pptx = `/${name}.pptx`
  }
  if (!want('pdf')) rmSync(pdf)
  return out
}

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

const meta = (html, re) => html.match(re)?.[1]?.trim().replace(/\s+/g, ' ')
const titleOf = (html) => meta(html, /<title[^>]*>([^<]*)<\/title>/i)
const descriptionOf = (html) =>
  meta(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)

function kindOf(pkg) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  if (deps['@slidev/cli']) return 'Slidev'
  if (deps['@marp-team/marp-cli']) return 'Marp'
  if (deps['reveal.js']) return 'reveal.js'
  return 'projekt'
}

function buildProject(dir, name) {
  const out = join(dist, name)
  const env = { ...process.env, DECK_BASE: `/${name}/`, DECK_OUT: out }
  const run = (cmd, args) => execFileSync(cmd, args, { cwd: dir, env, stdio: 'inherit' })
  if (existsSync(join(dir, 'pnpm-lock.yaml'))) {
    run('corepack', ['pnpm', 'install', '--frozen-lockfile'])
    run('corepack', ['pnpm', 'run', 'build'])
  } else {
    run('npm', [existsSync(join(dir, 'package-lock.json')) ? 'ci' : 'install'])
    run('npm', ['run', 'build'])
  }
  if (!existsSync(join(out, 'index.html')))
    throw new Error(`${name}: "npm run build" did not write ${out}/index.html (use $DECK_OUT)`)
}

const decks = []
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (/^[_.]/.test(entry.name)) continue
  const src = join(root, entry.name)
  let name
  let kind
  let files = {}
  if (entry.isFile() && entry.name.endsWith('.html')) {
    name = entry.name.slice(0, -'.html'.length)
    kind = 'HTML'
    cpSync(src, join(dist, entry.name))
    files = await downloads(name, readFileSync(src, 'utf8'))
  } else if (entry.isDirectory() && existsSync(join(src, 'package.json'))) {
    name = entry.name
    kind = kindOf(JSON.parse(readFileSync(join(src, 'package.json'), 'utf8')))
    buildProject(src, name)
  } else if (entry.isDirectory() && existsSync(join(src, 'index.html'))) {
    name = entry.name
    kind = 'HTML'
    cpSync(src, join(dist, name), { recursive: true })
  } else {
    continue
  }
  if (RESERVED.has(name)) throw new Error(`"${entry.name}": the name "${name}" is reserved`)
  const page = readFileSync(kind === 'HTML' && entry.isFile() ? src : join(dist, name, 'index.html'), 'utf8')
  decks.push({
    name,
    kind,
    href: entry.isFile() ? `/${name}` : `/${name}/`,
    title: titleOf(page) || name,
    description: descriptionOf(page) || '',
    ...files,
  })
}
decks.sort((a, b) => a.title.localeCompare(b.title, 'pl'))

const esc = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const template = readFileSync(join(site, 'explorer.html'), 'utf8')
const cards = decks
  .map(
    (d) => `      <li>
        <a class="deck" href="${esc(d.href)}">
          <span class="kind">${esc(d.kind)}</span>
          <span class="title">${esc(d.title)}</span>
          ${d.description ? `<span class="description">${esc(d.description)}</span>` : ''}
          <span class="path">${esc(d.href)}</span>
        </a>
        ${d.pdf || d.pptx ? `<span class="files">${d.pdf ? `<a class="pdf" href="${esc(d.pdf)}" download>Pobierz PDF</a>` : ''}${d.pptx ? `<a class="pptx" href="${esc(d.pptx)}" download>Pobierz PPTX</a>` : ''}</span>` : ''}
      </li>`,
  )
  .join('\n')
const page = (heading, body) =>
  template.replaceAll('{{heading}}', () => heading).replace('{{body}}', () => body)

writeFileSync(
  join(dist, 'index.html'),
  page(
    'Prezentacje',
    decks.length
      ? `<ul class="decks">\n${cards}\n    </ul>`
      : '<p class="empty">Nie ma jeszcze żadnej prezentacji.</p>',
  ),
)
writeFileSync(
  join(dist, '404.html'),
  page('Nie ma takiej prezentacji', '<p class="empty"><a href="/">Wróć do listy prezentacji</a></p>'),
)
console.log(`decks: ${decks.length} deck(s) -> ${dist}`)
for (const d of decks) console.log(`  ${d.href}  (${d.kind}) ${d.title}${d.pdf ? ` + ${d.pdf}` : ''}${d.pptx ? ` + ${d.pptx}` : ''}`)
