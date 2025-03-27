'use client'

import dynamic from 'next/dynamic'
import { Barber } from '@prisma/client'

// Leaflet bileşenlerini client-side only olarak import ediyoruz
const Map = dynamic(() => import('@/components/berber-bul/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-2 text-sm text-gray-600">Harita yükleniyor...</p>
      </div>
    </div>
  ),
})

interface BerberWithRating extends Barber {
  averageRating: number
  reviewCount: number
}

interface BerberMapProps {
  berberler: BerberWithRating[]
}

export default function BerberMap(props: BerberMapProps) {
  return <Map {...props} />
} 