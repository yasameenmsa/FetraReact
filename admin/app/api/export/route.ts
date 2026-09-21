import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Registration from '../../../models/Registration'
import { verifyToken, COOKIE_NAME } from '../../../lib/auth'

export const dynamic = 'force-dynamic'

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? '' : String(value)
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

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

    const headers = [
      'name', 'age', 'gender', 'nationality', 'education', 'currentJob',
      'awarenessActivity', 'contribution', 'phone', 'whatsapp', 'email', 'createdAt',
    ]

    const rows = registrations.map((r: Record<string, unknown>) =>
      headers.map((h) => csvCell(r[h])).join(',')
    )

    // UTF-8 BOM so Excel opens Arabic text correctly
    const csv = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n')

    const date = new Date().toISOString().slice(0, 10)
    const filename = `fitrah-registrations-${date}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 })
  }
}