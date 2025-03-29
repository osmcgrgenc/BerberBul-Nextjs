'use client'

import { BarberLocation } from '@/types/berber'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const BerberMap = dynamic(() => import('@/components/customer/BerberMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      Harita yükleniyor...
    </div>
  ),
})

interface AppointmentSectionProps {
  barber: BarberLocation
}

export default function AppointmentSection({ barber }: AppointmentSectionProps) {
  const { data: session } = useSession()

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="h-[300px] mb-6">
          <BerberMap barbers={[barber]} />
        </div>

        {session?.user?.role === 'CUSTOMER' ? (
          <Link
            href={`/randevu-al/${barber.id}`}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Randevu Al
          </Link>
        ) : (
          <Link
            href="/giris"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Randevu almak için giriş yapın
          </Link>
        )}
      </div>
    </div>
  )
} 