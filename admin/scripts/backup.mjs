// Fitrah registrations backup script — JSON + CSV, no external tools needed.
// Usage: node scripts/backup.mjs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const adminRoot = path.resolve(__dirname, '..')
const root = path.resolve(adminRoot, '..')

// ---- read .env without dotenv ----
function loadEnv(file) {
  const env = {}
  const text = fs.readFileSync(file, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*?)\s*$/)
    if (!m) continue
    let val = m[2]
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    env[m[1]] = val
  }
  return env
}

const env = loadEnv(path.join(adminRoot, '.env'))
if (!env.MONGODB_URI) {
  console.error('MONGODB_URI not found in admin/.env')
  process.exit(1)
}

// ---- backup destination, outside the public repo ----
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const direction = path.join(
  env.BACKUP_DIR || path.join(root, '..', 'fitrah-backups'),
  stamp
)
fs.mkdirSync(direction, { recursive: true })

// ---- connect + read raw collection (schema-free: safest for backup) ----
const conn = mongoose.createConnection(env.MONGODB_URI, {
  serverSelectionTimeoutMS: 15000,
})
await conn.asPromise()
const coll = conn.collection('registrations')
const docs = await coll.find({}).sort({ createdAt: -1 }).toArray()

// ---- JSON backup ----
const jsonPath = path.join(direction, 'registrations.json')
fs.writeFileSync(jsonPath, JSON.stringify(docs, null, 2), 'utf8')

// ---- CSV backup (opens in Excel with Arabic) ----
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
const csvPath = path.join(direction, 'registrations.csv')
fs.writeFileSync(csvPath, csv, 'utf8')

await conn.close()

console.log(`Backup saved to: ${direction}`)
console.log(`  registrations.json  (${(fs.statSync(jsonPath).size / 1024).toFixed(1)} KB)` ?? '')
console.log(`  registrations.csv   (Excel)`)
console.log(`Records backed up: ${docs.length}`)