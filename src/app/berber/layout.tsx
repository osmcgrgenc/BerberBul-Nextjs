import { Metadata } from 'next'
import BarberNavbar from '@/components/navbar/BarberNavbar'

export const metadata: Metadata = {
  title: 'Berber Paneli | BerberBul',
  description: 'Berber yönetim paneli',
}

export default function BerberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <BarberNavbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
} 