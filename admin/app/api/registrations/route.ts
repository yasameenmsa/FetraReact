import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Registration from '../../../models/Registration'
import { verifyToken, COOKIE_NAME } from '../../../lib/auth'

export const dynamic = 'force-dynamic'

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