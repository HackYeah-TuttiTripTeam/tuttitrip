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
// A deck that links to "<name>.pdf" (e.g. a download button) also gets that PDF, printed
// from the page by headless Chrome (CHROME or google-chrome/chromium on PATH), so its text
// stays selectable. CI fails without Chrome; locally the PDF is skipped with a warning.
// Then it writes the explorer (index.html) and 404.html next to the decks.
import { execFileSync } from 'node:child_process'
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

function printPdf(html, pdf) {
  const chrome = findChrome()
  if (!chrome) {
    if (process.env.CI) throw new Error(`no Chrome to print ${pdf} (set CHROME)`)
    console.warn(`decks: no Chrome found, skipping ${pdf} (set CHROME to build it)`)
    return false
  }
  execFileSync(chrome, [
    '--headless', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer',
    '--virtual-time-budget=10000', `--print-to-pdf=${pdf}`, `file://${html}`,
  ], { stdio: 'ignore' })
  if (!existsSync(pdf)) throw new Error(`Chrome did not write ${pdf}`)
  return true
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
  let pdf = ''
  if (entry.isFile() && entry.name.endsWith('.html')) {
    name = entry.name.slice(0, -'.html'.length)
    kind = 'HTML'
    cpSync(src, join(dist, entry.name))
    if (readFileSync(src, 'utf8').includes(`href="${name}.pdf"`))
      pdf = printPdf(join(dist, entry.name), join(dist, `${name}.pdf`)) ? `/${name}.pdf` : ''
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
    pdf,
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
        ${d.pdf ? `<a class="pdf" href="${esc(d.pdf)}" download>Pobierz PDF</a>` : ''}
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
for (const d of decks) console.log(`  ${d.href}  (${d.kind}) ${d.title}${d.pdf ? ` + ${d.pdf}` : ''}`)
