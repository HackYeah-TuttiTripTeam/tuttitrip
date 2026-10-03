#!/usr/bin/env node
// Deletes branch Workers with decks (tuttitrip-decks-<slug>) whose branch no longer exists,
// together with their Custom Domains. Only names matching ^tuttitrip-decks-[a-z0-9-]+$ are
// considered, so the main Worker (tuttitrip-decks) and the rest of the account are never touched.
//
//   CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... node docs/presentations/_site/cleanup.mjs [--dry-run]
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const PREFIX = 'tuttitrip-decks-'
const BRANCH_WORKER = /^tuttitrip-decks-[a-z0-9-]+$/
const dryRun = process.argv.includes('--dry-run')
const { CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: account } = process.env
if (!token || !account)
  throw new Error('CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are required')

const scripts = `https://api.cloudflare.com/client/v4/accounts/${account}/workers/scripts`
async function cloudflare(method, url) {
  const response = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } })
  const json = await response.json()
  if (!json.success) throw new Error(`${method} ${url}: ${JSON.stringify(json.errors)}`)
  return json.result
}

const target = join(dirname(fileURLToPath(import.meta.url)), 'target.sh')
const workerOf = (branch) =>
  execFileSync(target, [branch], { encoding: 'utf8' }).match(/^worker=(.*)$/m)[1]
const live = new Set(
  execFileSync('git', ['ls-remote', '--heads', 'origin'], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .map((line) => workerOf(line.replace(/^.*refs\/heads\//, ''))),
)

const workers = (await cloudflare('GET', scripts))
  .map((script) => script.id)
  .filter((id) => id.startsWith(PREFIX) && BRANCH_WORKER.test(id))
for (const worker of workers) {
  if (live.has(worker)) continue
  console.log(`decks cleanup: ${worker} has no branch${dryRun ? ' (dry run)' : ', deleting'}`)
  if (!dryRun) await cloudflare('DELETE', `${scripts}/${worker}?force=true`)
}
console.log(`decks cleanup: ${workers.length} branch Worker(s) checked, ${live.size} branch(es) live`)
