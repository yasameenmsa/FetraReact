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