import { NextResponse } from 'next/server'
import { verifyPassword, createToken, COOKIE_NAME } from '../../../../lib/auth'

// In-memory rate limiter: max 5 attempts per IP per 15 minutes
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function resolveAdminHash(raw: string): string {
  // If the value is valid base64, decode it first (base64 contains no "$").
  const trimmed = raw.trim()
  if (/^[A-Za-z0-9+/]+={0,2}$/.test(trimmed)) {
    try {
      const decoded = Buffer.from(trimmed, 'base64').toString('utf8')
      if (decoded.startsWith('$2')) return decoded
    } catch {
      // not base64 — fall through
    }
  }
  // Otherwise accept plain or backslash-escaped "$" forms.
  return trimmed.replace(/\\\$/g, '$')
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  entry.count += 1
  if (entry.count > MAX_ATTEMPTS) {
    return true
  }
  return false
}

export async function POST(req: Request) {
  const ip = getClientIp(req)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'محاولات كثيرة، حاول بعد 15 دقيقة' },
      { status: 429 }
    )
  }

  try {
    const { password } = await req.json()

    const rawPassword = process.env.ADMIN_PASSWORD
    if (!rawPassword) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Accept the bcrypt hash in any of these forms so the value survives every
    // env handling quirk (local .env "$" expansion, Render/other hosts literal):
    //   1. plain redis hash:     $2a$12$...
    //   2. escaped for .env:     \$2a\$12\$...
    //   3. base64 of the hash:   XC9XWkNn...  (no "$" at all — safest)
    const adminPassword = resolveAdminHash(rawPassword)

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