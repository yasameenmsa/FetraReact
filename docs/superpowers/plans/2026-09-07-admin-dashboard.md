# Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a password-protected admin dashboard that displays all ambassador registrations from MongoDB, deployed as a separate Next.js app.

**Architecture:** A standalone Next.js 14 app in `admin/` with its own package.json, connecting to the same MongoDB database. Uses `jose` for JWT-based session tokens stored in cookies. The main app's `output: 'export'` config is untouched — admin runs as its own server.

**Tech Stack:** Next.js 14 (App Router, NOT static export), React 18, TypeScript, Tailwind CSS, Mongoose, `jose` (JWT), `bcryptjs` (password hashing)

**Spec:** User requested an admin app to view registration results with password protection, deployed separately from the main site.

## Global Constraints

- Main app (`output: 'export'`) must NOT be modified — admin is a separate deployment
- MongoDB connection reuses `src/lib/mongodb.ts` and `src/models/Registration.ts` from parent project
- Admin password stored as bcrypt hash in `ADMIN_PASSWORD` env var
- JWT secret stored in `JWT_SECRET` env var
- All UI text in Arabic (RTL)
- Deploy to Render (web service, NOT static) — the admin app REQUIRES a Node.js web service because it uses API routes (server-side JWT auth + MongoDB). It cannot be a static site.
- Admin is a **separate website** — its own Render service with its own URL, independent of the main Fitrah site

## File Structure

```
admin/
├── package.json                    # Separate dependencies (adds jose, bcryptjs)
├── next.config.js                  # NO output: 'export' — needs API routes
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts              # Tailwind config
├── postcss.config.mjs              # PostCSS config
├── render.yaml                     # Render web service config (separate from main site)
├── .env.example                    # Template for required env vars
├── .gitignore
├── scripts/
│   └── hash-password.ts            # Generates bcrypt hash + JWT secret
├── app/
│   ├── layout.tsx                  # Root layout (Arabic RTL, Tailwind)
│   ├── page.tsx                    # Login page (redirects to /dashboard if authenticated)
│   ├── globals.css                 # Tailwind directives + RTL styles
│   ├── dashboard/
│   │   └── page.tsx                # Protected registrations table
│   └── api/
│       ├── auth/
│       │   └── login/route.ts      # POST: verify password, set JWT cookie
│       └── registrations/
│           └── route.ts            # GET: fetch all registrations (protected)
```

---

### Task 1: Scaffold the admin app with dependencies

**Files:**
- Create: `admin/package.json`
- Create: `admin/next.config.js`
- Create: `admin/tsconfig.json`
- Create: `admin/tailwind.config.ts`
- Create: `admin/postcss.config.mjs`
- Create: `admin/.env.example`

**Interfaces:**
- Produces: Installable admin app with all config files ready

- [ ] **Step 1: Create `admin/package.json`**

```json
{
  "name": "fitrah-admin",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p ${PORT:-10000}",
    "lint": "next lint"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "jose": "^5.9.0",
    "mongoose": "^9.2.4",
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20.14.9",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.27",
    "postcss": "^8.5.8",
    "tailwindcss": "^3.4.19",
    "tsx": "^4.19.0",
    "typescript": "^5.5.3"
  }
}
```

- [ ] **Step 2: Create `admin/next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
```

- [ ] **Step 3: Create `admin/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `admin/tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

- [ ] **Step 5: Create `admin/postcss.config.mjs`**

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

- [ ] **Step 6: Create `admin/render.yaml` (Render web service — NOT static)**

```yaml
# Render Web Service config for Fitrah Admin Dashboard
# This is a SEPARATE service from the main fitrah-project static site.
# It runs as a Node.js web service because it needs API routes (JWT auth + MongoDB).

services:
  - type: web
    name: fitrah-admin
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: ADMIN_PASSWORD
        sync: false
      - key: JWT_SECRET
        sync: false
```

- [ ] **Step 7: Create `admin/.env.example`**

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/fitrah
ADMIN_PASSWORD=your-bcrypt-hash-here
JWT_SECRET=your-random-secret-at-least-32-chars
```

- [ ] **Step 8: Install dependencies**

Run: `cd admin && npm install`

- [ ] **Step 9: Commit**

```bash
git add admin/
git commit -m "feat(admin): scaffold admin dashboard app"
```

---

### Task 2: Create shared utilities (dbConnect copy + auth helpers)

Since the admin app is a separate Next.js project, it cannot import from `../src/`. We copy the MongoDB connection and create auth helpers locally.

**Files:**
- Create: `admin/lib/mongodb.ts`
- Create: `admin/models/Registration.ts`
- Create: `admin/lib/auth.ts`

**Interfaces:**
- Consumes: `MONGODB_URI`, `ADMIN_PASSWORD`, `JWT_SECRET` env vars
- Produces: `dbConnect()` function, `Registration` model, `hashPassword()`, `verifyPassword()`, `createToken()`, `verifyToken()`, `getAuthFromRequest()`

- [ ] **Step 1: Create `admin/lib/mongodb.ts`**

```ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// @ts-ignore
let cached = global.mongoose

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
```

- [ ] **Step 2: Create `admin/models/Registration.ts`**

```ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IRegistration extends Document {
  name: string
  age: number
  gender: string
  nationality: string
  education: string
  currentJob: string
  awarenessActivity: string
  contribution: string
  phone: string
  whatsapp: string
  email: string
  createdAt: Date
}

const registrationSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    education: { type: String, required: true },
    currentJob: { type: String, required: true },
    awarenessActivity: { type: String, required: true },
    contribution: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', registrationSchema)
```

- [ ] **Step 3: Create `admin/lib/auth.ts`**

```ts
import { SignJWT, jwtVerify } from 'jose'
import { hash, compare } from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const TOKEN_EXPIRY = '24h'
const COOKIE_NAME = 'admin-token'

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

export async function createToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(TOKEN_EXPIRY)
    .setIssuedAt()
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export { COOKIE_NAME }
```

- [ ] **Step 4: Commit**

```bash
git add admin/lib/ admin/models/
git commit -m "feat(admin): add MongoDB connection, Registration model, and auth helpers"
```

---

### Task 3: Create root layout and global styles

**Files:**
- Create: `admin/app/globals.css`
- Create: `admin/app/layout.tsx`

**Interfaces:**
- Produces: RTL Arabic layout with Tailwind CSS

- [ ] **Step 1: Create `admin/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  direction: rtl;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

- [ ] **Step 2: Create `admin/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'لوحة التحكم - مشروع فطرة',
  description: 'إدارة تسجيلات سفراء مشروع فطرة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add admin/app/globals.css admin/app/layout.tsx
git commit -m "feat(admin): add root layout with RTL Arabic support"
```

---

### Task 4: Create the login page and auth API

**Files:**
- Create: `admin/app/page.tsx`
- Create: `admin/app/api/auth/login/route.ts`

**Interfaces:**
- Consumes: `hashPassword`, `verifyPassword`, `createToken`, `COOKIE_NAME` from `lib/auth`
- Produces: Login form UI, POST `/api/auth/login` endpoint, redirects to `/dashboard` on success

- [ ] **Step 1: Create `admin/app/api/auth/login/route.ts`**

```ts
import { NextResponse } from 'next/server'
import { verifyPassword, createToken, COOKIE_NAME } from '../../../../lib/auth'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const isValid = await verifyPassword(password, adminPassword)
    if (!isValid) {
      return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 })
    }

    const token = await createToken()

    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Create `admin/app/page.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/dashboard')
      } else {
        const data = await res.json()
        setError(data.error || 'كلمة المرور غير صحيحة')
      }
    } catch {
      setError('حدث خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          لوحة تحكم مشروع فطرة
        </h1>
        <p className="text-center text-gray-500 mb-8">
          أدخل كلمة المرور للوصول
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
              autoFocus
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add admin/app/page.tsx admin/app/api/auth/login/route.ts
git commit -m "feat(admin): add login page with password authentication"
```

---

### Task 5: Create the registrations API route (protected)

**Files:**
- Create: `admin/app/api/registrations/route.ts`

**Interfaces:**
- Consumes: `dbConnect` from `lib/mongodb`, `Registration` model, `verifyToken`, `COOKIE_NAME` from `lib/auth`
- Produces: GET `/api/registrations` returning all registrations as JSON (401 if unauthenticated)

- [ ] **Step 1: Create `admin/app/api/registrations/route.ts`**

```ts
import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/mongodb'
import Registration from '../../../../models/Registration'
import { verifyToken, COOKIE_NAME } from '../../../../lib/auth'

export async function GET(req: Request) {
  try {
    const token = req.headers.get('cookie')
      ?.split('; ')
      .find((c) => c.startsWith(`${COOKIE_NAME}=`))
      ?.split('=')[1]

    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    await dbConnect()
    const registrations = await Registration.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ success: true, data: registrations })
  } catch (error) {
    console.error('Fetch registrations error:', error)
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add admin/app/api/registrations/route.ts
git commit -m "feat(admin): add protected registrations API endpoint"
```

---

### Task 6: Create the dashboard page

**Files:**
- Create: `admin/app/dashboard/page.tsx`

**Interfaces:**
- Consumes: GET `/api/registrations` (returns `{ success, data: IRegistration[] }`)
- Produces: Full dashboard UI with stats, search, and registrations table

- [ ] **Step 1: Create `admin/app/dashboard/page.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Registration {
  _id: string
  name: string
  age: number
  gender: string
  nationality: string
  education: string
  currentJob: string
  awarenessActivity: string
  contribution: string
  phone: string
  whatsapp: string
  email: string
  createdAt: string
}

export default function DashboardPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('/api/registrations')
      if (res.status === 401) {
        router.push('/')
        return
      }
      const data = await res.json()
      if (data.success) {
        setRegistrations(data.data)
      } else {
        setError('فشل في تحميل البيانات')
      }
    } catch {
      setError('حدث خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    document.cookie = 'admin-token=; path=/; max-age=0'
    router.push('/')
  }

  const filtered = registrations.filter(
    (r) =>
      r.name.includes(search) ||
      r.email.includes(search) ||
      r.phone.includes(search) ||
      r.nationality.includes(search)
  )

  const stats = {
    total: registrations.length,
    male: registrations.filter((r) => r.gender === 'ذكر').length,
    female: registrations.filter((r) => r.gender === 'أنثى').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">جاري التحميل...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
          <p className="text-gray-500 mt-1">إدارة تسجيلات سفراء مشروع فطرة</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">إجمالي التسجيلات</p>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">الذكور</p>
          <p className="text-3xl font-bold text-blue-600">{stats.male}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">الإناث</p>
          <p className="text-3xl font-bold text-pink-600">{stats.female}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث بالاسم، البريد، الهاتف، الجنسية..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">#</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">الاسم</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">العمر</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">الجنس</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">الجنسية</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">التعليم</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">المهنة</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">الهاتف</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">البريد</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-400">
                    لا توجد نتائج
                  </td>
                </tr>
              ) : (
                filtered.map((reg, i) => (
                  <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{reg.name}</td>
                    <td className="px-4 py-3 text-gray-600">{reg.age}</td>
                    <td className="px-4 py-3 text-gray-600">{reg.gender}</td>
                    <td className="px-4 py-3 text-gray-600">{reg.nationality}</td>
                    <td className="px-4 py-3 text-gray-600">{reg.education}</td>
                    <td className="px-4 py-3 text-gray-600">{reg.currentJob}</td>
                    <td className="px-4 py-3 text-gray-600" dir="ltr">{reg.phone}</td>
                    <td className="px-4 py-3 text-gray-600" dir="ltr">{reg.email}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(reg.createdAt).toLocaleDateString('ar-SA')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 text-sm text-gray-500 text-left">
            عرض {filtered.length} من {registrations.length} تسجيل
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add admin/app/dashboard/page.tsx
git commit -m "feat(admin): add dashboard with stats, search, and registrations table"
```

---

### Task 7: Generate password hash and configure environment

**Files:**
- Modify: `admin/.env.example` (already created)
- Create: `admin/.env.local` (gitignored)

**Interfaces:**
- Consumes: `ADMIN_PASSWORD` plain text from user
- Produces: `ADMIN_PASSWORD_HASH` and `JWT_SECRET` for `.env.local`

- [ ] **Step 1: Create a script to generate password hash**

Create `admin/scripts/hash-password.ts`:

```ts
import { hash } from 'bcryptjs'
import { randomBytes } from 'crypto'

const password = process.argv[2]

if (!password) {
  console.error('Usage: npx tsx scripts/hash-password.ts <password>')
  process.exit(1)
}

async function main() {
  const hashValue = await hash(password, 12)
  const jwtSecret = randomBytes(32).toString('hex')

  console.log('\n--- Add these to admin/.env.local ---\n')
  console.log(`ADMIN_PASSWORD=${hashValue}`)
  console.log(`JWT_SECRET=${jwtSecret}`)
  console.log('\n--- Done ---\n')
}

main()
```

- [ ] **Step 2: Create `admin/.env.local` (after generating)**

The actual values will be generated by running the hash script. The `.env.local` file is gitignored and never committed.

- [ ] **Step 3: Add `admin/.env.local` to `admin/.gitignore`**

Create `admin/.gitignore`:
```
node_modules/
.next/
.env.local
```

- [ ] **Step 4: Commit (without .env.local)**

```bash
git add admin/scripts/ admin/.gitignore
git commit -m "feat(admin): add password hash generator and gitignore"
```

---

### Task 8: Test locally

**Files:** No new files — verification only

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified working admin app on localhost:3001

- [ ] **Step 1: Set up .env.local**

Generate a password hash:
```bash
cd admin && npx tsx scripts/hash-password.ts mypassword
```
Copy the output to `admin/.env.local` along with `MONGODB_URI`.

- [ ] **Step 2: Start dev server**

Run: `cd admin && npm run dev`
Expected: Server starts on port 3001

- [ ] **Step 3: Test login flow**

1. Open `http://localhost:3001`
2. See login form with Arabic text
3. Enter wrong password → see error message
4. Enter correct password → redirected to `/dashboard`
5. See stats cards (total, male, female counts)
6. See registrations table with data
7. Test search filter
8. Test logout button → returns to login

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix(admin): local testing fixes"
```

---

### Task 9: Deploy to Render (separate website)

**Files:**
- No file changes — deployment only

**Interfaces:**
- Consumes: Working admin app, MongoDB connection string, admin password
- Produces: Live admin dashboard on its OWN Render URL (separate from main Fitrah site)

> Important: This is a **separate Render web service** with its own URL (e.g. `https://fitrah-admin.onrender.com`). It is NOT part of the existing static `fitrah-project` Render site. The admin app MUST run as a **web service** (Node runtime) because it uses API routes — it cannot be a static site.

- [ ] **Step 1: Commit and push the admin app to GitHub**

Make sure the main repo is pushed to GitHub (the main site is already served from `yasameenmsa/FetraReact`). The admin folder lives in the same repo.

```bash
git add -A
git commit -m "feat(admin): complete admin dashboard app"
git push
```

- [ ] **Step 2: Create the Render web service**

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**
2. Connect the `yasameenmsa/FetraReact` GitHub repo
3. Render needs to know to build the `admin/` subfolder. Set:
   - **Root Directory:** `admin`
   - **Name:** `fitrah-admin`
   - **Runtime:** `Node`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free
4. Click **Create Web Service**

> Note: With `Root Directory: admin` set, Render runs build/start commands from inside `admin/`, so NO `.render.yaml` file is even required — the GUI settings above are sufficient. (The `render.yaml` committed earlier is optional and only used with Blueprint deploys.)

- [ ] **Step 3: Set environment variables in Render**

In the Render service → **Environment** tab, add these three secrets (all `sync` disabled):

```
MONGODB_URI   = your MongoDB connection string (same one used by the main site)
ADMIN_PASSWORD = the bcrypt HASH generated by scripts/hash-password.ts (starts with $2a$ or $2b$)
JWT_SECRET    = the random hex secret generated by scripts/hash-password.ts
```

- [ ] **Step 4: Trigger deploy & verify**

1. In Render, click **Manual Deploy** → **Deploy latest commit** (or it auto-deploys)
2. Wait for build to finish (free plan takes a few minutes)
3. Open the service URL: `https://fitrah-admin.onrender.com`
4. Test login with your admin password
5. Verify registrations load from MongoDB
6. Confirm stats, search, table, and logout all work
7. Re-visit after ~1 min if the free instance sleeps — first load may be slow (cold start)

- [ ] **Step 5: Add admin URL to project docs**

Update `DEPLOY.md` (or add a new note) with the admin dashboard URL and credentials reminder.

```bash
git add -A
git commit -m "docs: add admin dashboard deployment info"
git push
```
