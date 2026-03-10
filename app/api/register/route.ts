import { NextResponse } from 'next/server';
import dbConnect from '../../../src/lib/mongodb';
import Registration from '../../../src/models/Registration';

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const {
            name, age, gender, nationality, education,
            currentJob, awarenessActivity, contribution,
            phone, whatsapp, email
        } = body;

        // Basic validation
        if (
            !name || !age || !gender || !nationality || !education ||
            !currentJob || !awarenessActivity || !contribution || !phone || !whatsapp || !email
        ) {
            return NextResponse.json({ success: false, message: 'جميع الحقول مطلوبة' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ success: false, message: 'صيغة البريد الإلكتروني غير صحيحة' }, { status: 400 });
        }

        if (Number(age) < 10 || Number(age) > 100) {
            return NextResponse.json({ success: false, message: 'العمر يجب أن يكون بين 10 و 100' }, { status: 400 });
        }

        const registration = new Registration({
            name, age, gender, nationality, education,
            currentJob, awarenessActivity, contribution,
            phone, whatsapp, email,
        });

        await registration.save();

        return NextResponse.json({ success: true, message: 'تم التسجيل بنجاح' }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ success: false, message: 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً' }, { status: 500 });
    }
}
