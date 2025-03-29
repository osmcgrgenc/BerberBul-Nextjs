'use client'

import { Barber } from '@/types/berber'
import RatingStars from './RatingStars'

interface BerberInfoProps {
  barber: Barber
}

export default function BerberInfo({ barber }: BerberInfoProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {barber.shopName}
      </h1>

      {barber.rating !== null && (
        <div className="flex items-center mb-4">
          <RatingStars rating={barber.rating} size="large" />
          <span className="ml-2 text-gray-600">
            ({(barber.rating || 0).toFixed(1)})
          </span>
        </div>
      )}

      {barber.description && (
        <p className="text-gray-600 mb-6">{barber.description}</p>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
        <p className="text-gray-600">
          {barber.address}, {barber.neighborhood}
          <br />
          {barber.district}, {barber.city}
        </p>
      </div>
    </>
  )
} 