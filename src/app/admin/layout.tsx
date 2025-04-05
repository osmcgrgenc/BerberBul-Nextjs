import { Metadata } from 'next'
import AdminNavbar from '@/components/navbar/AdminNavbar'

export const metadata: Metadata = {
  title: 'Admin Paneli | BerberBul',
  description: 'Yönetici paneli',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
} 