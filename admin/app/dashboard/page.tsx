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
  const [backup, setBackup] = useState<{ createdAt: string; count: number } | null>(null)
  const [backupJustCreated, setBackupJustCreated] = useState(false)
  const [backingUp, setBackingUp] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchRegistrations()
    checkBackup()
  }, [])

  const checkBackup = async () => {
    try {
      const res = await fetch('/api/backup')
      if (res.status === 401) {
        router.push('/')
        return
      }
      const data = await res.json()
      if (data.success) {
        setBackup(data.lastBackup)
        setBackupJustCreated(Boolean(data.created))
      }
    } catch {
      // silent — backup is best-effort, dashboard still works
    }
  }

  const handleBackupNow = async () => {
    try {
      setBackingUp(true)
      const res = await fetch('/api/backup', { method: 'POST' })
      if (res.status === 401) {
        router.push('/')
        return
      }
      const data = await res.json()
      if (data.success) {
        setBackup(data.lastBackup)
        setBackupJustCreated(true)
        alert('تم حفظ نسخة احتياطية بنجاح')
      } else {
        alert('فشل في حفظ النسخة الاحتياطية')
      }
    } catch {
      alert('حدث خطأ في الاتصال')
    } finally {
      setBackingUp(false)
    }
  }

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

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const handleExport = async () => {
    try {
      const res = await fetch('/api/export')
      if (res.status === 401) {
        router.push('/')
        return
      }
      if (!res.ok) {
        alert('فشل في تنزيل الملف')
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const date = new Date().toISOString().slice(0, 10)
      a.download = `fitrah-registrations-${date}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      alert('حدث خطأ في الاتصال')
    }
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
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            تنزيل Excel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
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

      {/* Auto backup card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <p className="font-semibold text-emerald-800">نسخة احتياطية تلقائية شهرية</p>
          {backup ? (
            <p className="text-sm text-emerald-700 mt-1">
              آخر نسخة: {new Date(backup.createdAt).toLocaleString('ar-SA')} — {backup.count} تسجيل
              {backupJustCreated && <span className="font-semibold"> (تم إنشاؤها الآن)</span>}
            </p>
          ) : (
            <p className="text-sm text-emerald-700 mt-1">لم تُنشأ نسخة بعد</p>
          )}
        </div>
        <button
          onClick={handleBackupNow}
          disabled={backingUp}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {backingUp ? 'جارٍ الحفظ...' : 'نسخ احتياطي الآن'}
        </button>
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

      {/* Export note */}
      <p className="text-xs text-gray-400 mt-4">
        للتنزيل كملف Excel: يُخرج الموقع البيانات بصيغة CSV (تُفتح مباشرة في Excel).
      </p>
    </div>
  )
}