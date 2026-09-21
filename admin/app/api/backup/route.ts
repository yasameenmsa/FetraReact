import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '../../../lib/mongodb'
import { verifyToken, COOKIE_NAME } from '../../../lib/auth'

export const dynamic = 'force-dynamic'

const BACKUP_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days ~ monthly

function getToken(req: Request): string | null {
  return req.headers.get('cookie')
    ?.split('; ')
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    ?.split('=')[1] ?? null
}

/**
 * Creates a monthly automatic snapshot of all registrations, stored in the
 * "backups" collection. Called on every dashboard open (see GET). Returns
 * { lastBackup, created } so the UI can show backup status.
 */
export async function GET(req: Request) {
  try {
    const token = getToken(req)
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    await dbConnect()
    const backups = mongoose.connection.collection('backups')
    const last = await backups.find({}).sort({ createdAt: -1 }).limit(1).next()

    const now = Date.now()
    const lastAt = last ? new Date(last.createdAt).getTime() : 0
    const shouldCreate = !last || now - lastAt >= BACKUP_INTERVAL_MS

    if (shouldCreate) {
      const registrations = await mongoose.connection
        .collection('registrations')
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      if (registrations.length > 0) {
        const doc = {
          createdAt: new Date(),
          count: registrations.length,
          data: registrations,
        }
        await backups.insertOne(doc)
        return NextResponse.json({
          success: true,
          created: true,
          lastBackup: {
            createdAt: doc.createdAt.toISOString(),
            count: doc.count,
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      created: false,
      lastBackup: last
        ? { createdAt: new Date(last.createdAt).toISOString(), count: last.count }
        : null,
    })
  } catch (error) {
    console.error('Backup check error:', error)
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}

/** Force an immediate snapshot on demand. */
export async function POST(req: Request) {
  try {
    const token = getToken(req)
    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    await dbConnect()
    const registrations = await mongoose.connection
      .collection('registrations')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    const doc = {
      createdAt: new Date(),
      count: registrations.length,
      data: registrations,
    }
    await mongoose.connection.collection('backups').insertOne(doc)

    return NextResponse.json({
      success: true,
      created: true,
      lastBackup: { createdAt: doc.createdAt.toISOString(), count: doc.count },
    })
  } catch (error) {
    console.error('Manual backup error:', error)
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}