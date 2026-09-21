// Fitrah DB backup → GitHub (fitrah-backups repo).
// Reads registrations from MongoDB, writes JSON+CSV locally, then pushes
// to backups/<YYYY-MM>/ via the gh CLI (no workflow scope needed).
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const GH_REPO = 'yasameenmsa/fitrah-backups'
const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI environment variable is required')
  process.exit(1)
}
try { execSync('gh auth status', { stdio: 'ignore' }) } catch {
  console.error('gh CLI is not authenticated — run: gh auth login')
  process.exit(1)
}

const timestamp = new Date()
const yearMonth = timestamp.toISOString().slice(0, 7) // YYYY-MM
const stamp = timestamp.toISOString().replace(/[:.]/g, '-').slice(0, 19)
const dir = path.join(repoRoot, 'backups', yearMonth)
fs.mkdirSync(dir, { recursive: true })

const conn = mongoose.createConnection(uri, { serverSelectionTimeoutMS: 20000 })
await conn.asPromise()
const docs = await conn.collection('registrations').find({}).sort({ createdAt: -1 }).toArray()
await conn.close()

// Unique filename per run so history is preserved.
const jsonFile = path.join(dir, `registrations-${stamp}.json`)
const csvFile = path.join(dir, `registrations-${stamp}.csv`)

fs.writeFileSync(jsonFile, JSON.stringify(docs, null, 2), 'utf8')

const headers = [
  'name', 'age', 'gender', 'nationality', 'education', 'currentJob',
  'awarenessActivity', 'contribution', 'phone', 'whatsapp', 'email', 'createdAt',
]
function cell(v) {
  const s = v === null || v === undefined ? '' : String(v)
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
const csv =
  '\uFEFF' + headers.join(',') + '\n' +
  docs.map((d) => headers.map((h) => cell(d[h])).join(',')).join('\n')
fs.writeFileSync(csvFile, csv, 'utf8')

// Push both files to GitHub (no git clone needed — direct commit via gh api).
function base64(p) { return fs.readFileSync(p).toString('base64') }
const msg = `backup ${yearMonth} (${stamp}) — ${docs.length} records`
for (const p of [jsonFile, csvFile]) {
  const rel = p.replace(repoRoot + path.sep, '').replace(/\\/g, '/')
  const content = base64(p)
  let sha = null
  try {
    const r = JSON.parse(execSync(`gh api "repos/${GH_REPO}/contents/${rel}" -q .sha`, { encoding: 'utf8' }))
    sha = r
  } catch {}
  const args = [
    `gh api "repos/${GH_REPO}/contents/${rel}" -X PUT`,
    `-f message="${msg}"`,
    `-f content="${content}"`,
    `-f branch="main"`,
  ]
  if (sha) args.push(`-f sha="${sha}"`)
  try {
    execSync(args.join(' '), { encoding: 'utf8', stdio: 'inherit' })
    console.log('Pushed', rel)
  } catch (e) {
    console.error('Failed to push', rel, e.message)
  }
}

console.log(`Backup done: ${docs.length} records → backups/${yearMonth}/`)