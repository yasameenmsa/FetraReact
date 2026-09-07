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