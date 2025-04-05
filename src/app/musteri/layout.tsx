import { Metadata } from 'next'
import CustomerNavbar from '@/components/navbar/CustomerNavbar'

export const metadata: Metadata = {
  title: 'Müşteri Paneli | BerberBul',
  description: 'Müşteri yönetim paneli',
}

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
} 