import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs <password>')
  process.exit(1)
}

const hashValue = bcrypt.hashSync(password, 12)
const jwtSecret = randomBytes(32).toString('hex')

console.log('\n--- Add these to admin/.env.local (or Render env vars) ---\n')
console.log(`ADMIN_PASSWORD=${hashValue}`)
console.log(`JWT_SECRET=${jwtSecret}`)
console.log('\n--- Done ---\n')