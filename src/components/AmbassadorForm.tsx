"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const AmbassadorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        nationality: '',
        education: '',
        currentJob: '',
        awarenessActivity: '',
        contribution: '',
        phone: '',
        whatsapp: '',
        email: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
        if (!formData.age || Number(formData.age) < 10 || Number(formData.age) > 100) newErrors.age = 'العمر يجب أن يكون بين 10 و 100';
        if (!formData.gender) newErrors.gender = 'الجنس مطلوب';
        if (!formData.nationality.trim()) newErrors.nationality = 'الجنسية مطلوبة';
        if (!formData.education.trim()) newErrors.education = 'المستوى التعليمي مطلوب';
        if (!formData.currentJob.trim()) newErrors.currentJob = 'العمل الحالي مطلوب';
        if (!formData.awarenessActivity.trim()) newErrors.awarenessActivity = 'هذا الحقل مطلوب';
        if (!formData.contribution.trim()) newErrors.contribution = 'هذا الحقل مطلوب';
        if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
        if (!formData.whatsapp.trim()) newErrors.whatsapp = 'رقم الواتساب مطلوب';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, age: Number(formData.age) }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                data = { message: 'Unexpected response from server' };
            }

            if (!response.ok) {
                // Determine if there are specific backend field errors
                // For simplicity we use the generic message if available
                throw new Error(data.message || 'فشل الإرسال (حدث خطأ في الخادم)');
            }

            setStatus('success');
            setFormData({
                name: '', age: '', gender: '', nationality: '', education: '',
                currentJob: '', awarenessActivity: '', contribution: '',
                phone: '', whatsapp: '', email: '',
            });
            setErrors({});
            setTimeout(() => setStatus('idle'), 6000);

        } catch (error: unknown) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'فشل الاتصال، يرجى المحاولة مرة أخرى.');
        }
    };

    const getInputClass = (fieldName: string) => {
        const baseClass = "w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-colors bg-white";
        if (errors[fieldName]) {
            return `${baseClass} border-red-500 focus:ring-red-500 focus:border-red-500`;
        }
        return `${baseClass} border-gray-300 focus:ring-green-500 focus:border-green-500`;
    };

    return (
        <section id="ambassador-form" className="section-padding bg-gray-50 relative">
            <div className="container-custom max-w-3xl">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-brown-900 font-cairo mb-4">
                        سجل الآن كسفير فطرة
                    </h2>
                    <p className="text-lg text-brown-700">
                        انضم إلينا في رسالتنا وكن جزءاً من التغيير الإيجابي في المجتمع
                    </p>
                </div>

                <div className="bg-cream-100 p-8 md:p-10 rounded-2xl shadow-xl border border-brown-50 animate-fade-in-up delay-100">
                    {status === 'success' ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="text-green-600 w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-green-800 mb-2 font-cairo">تم تسجيلك بنجاح!</h3>
                            <p className="text-gray-600">شكراً لانضمامك كسفير لمشروع فطرة، سنتواصل معك قريباً.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            {status === 'error' && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                    <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
                                    <p className="text-red-700 text-sm">{errorMessage}</p>
                                </div>
                            )}

                            {/* Row 1: Name + Age */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">الاسم *</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={getInputClass('name')} placeholder="أدخل اسمك الكامل" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">العمر *</label>
                                    <input type="number" id="age" name="age" min={10} max={100} value={formData.age} onChange={handleChange} className={getInputClass('age')} placeholder="مثال: 25" dir="ltr" />
                                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                                </div>
                            </div>

                            {/* Row 2: Gender + Nationality */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">الجنس *</label>
                                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={getInputClass('gender')}>
                                        <option value="">اختر الجنس</option>
                                        <option value="ذكر">ذكر</option>
                                        <option value="أنثى">أنثى</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                                </div>
                                <div>
                                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">الجنسية *</label>
                                    <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} className={getInputClass('nationality')} placeholder="مثال: جزائري، مغربي..." />
                                    {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                                </div>
                            </div>

                            {/* Row 3: Education + Current Job */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">دراسته *</label>
                                    <input type="text" id="education" name="education" value={formData.education} onChange={handleChange} className={getInputClass('education')} placeholder="مجال الدراسة أو المستوى التعليمي" />
                                    {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
                                </div>
                                <div>
                                    <label htmlFor="currentJob" className="block text-sm font-medium text-gray-700 mb-2">عمله الحالي *</label>
                                    <input type="text" id="currentJob" name="currentJob" value={formData.currentJob} onChange={handleChange} className={getInputClass('currentJob')} placeholder="المسمى الوظيفي الحالي" />
                                    {errors.currentJob && <p className="text-red-500 text-xs mt-1">{errors.currentJob}</p>}
                                </div>
                            </div>

                            {/* Awareness Activity */}
                            <div>
                                <label htmlFor="awarenessActivity" className="block text-sm font-medium text-gray-700 mb-2">نشاطه بالعمل التوعوي *</label>
                                <textarea id="awarenessActivity" name="awarenessActivity" rows={3} value={formData.awarenessActivity} onChange={handleChange} className={`${getInputClass('awarenessActivity')} resize-none`} placeholder="صف تجربتك ونشاطك في مجال التوعية والعمل المجتمعي..." />
                                {errors.awarenessActivity && <p className="text-red-500 text-xs mt-1">{errors.awarenessActivity}</p>}
                            </div>

                            {/* Contribution */}
                            <div>
                                <label htmlFor="contribution" className="block text-sm font-medium text-gray-700 mb-2">ماذا يريد أن يقدم للمشروع *</label>
                                <textarea id="contribution" name="contribution" rows={3} value={formData.contribution} onChange={handleChange} className={`${getInputClass('contribution')} resize-none`} placeholder="حدثنا عمّا تودّ تقديمه ودورك في مشروع فطرة..." />
                                {errors.contribution && <p className="text-red-500 text-xs mt-1">{errors.contribution}</p>}
                            </div>

                            {/* Row 4: Phone + WhatsApp */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">رقم هاتف للتواصل *</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={getInputClass('phone')} placeholder="مثال: +213 5XX XXX XXX" dir="ltr" />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">رقم هاتف للتواصل واتس اب *</label>
                                    <input type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className={getInputClass('whatsapp')} placeholder="مثال: +213 5XX XXX XXX" dir="ltr" />
                                    {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">ايميل *</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass('email')} placeholder="example@domain.com" dir="ltr" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <span className="flex items-center gap-2">جاري الإرسال... <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>
                                ) : (
                                    <>
                                        إرسال الطلب
                                        <Send size={20} className="rotate-180" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AmbassadorForm;
