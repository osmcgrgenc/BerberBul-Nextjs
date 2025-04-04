'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const BerberMap = dynamic(() => import('@/components/customer/BerberMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      Harita yükleniyor...
    </div>
  ),
})

interface Barber {
  id: string
  shopName: string
  description: string | null
  address: string
  city: string
  district: string
  neighborhood: string
  latitude: number
  longitude: number
  rating: number | null
  services: {
    id: string
    name: string
    duration: number
    price: number
  }[]
  workingHours: {
    id: string
    dayOfWeek: number
    startTime: string
    endTime: string
    isOpen: boolean
  }[]
  reviews: {
    id: string
    rating: number
    comment: string | null
    createdAt: string
    customer: {
      user: {
        name: string | null
      }
    }
  }[]
}

export default function BerberDetayPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: session } = useSession()
  const [barber, setBarber] = useState<Barber | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBarber()
  }, [params.id])

  const fetchBarber = async () => {
    try {
      const response = await fetch(`/api/berber/${params.id}`)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Berber bulunamadı')
        }
        throw new Error('Berber bilgileri yüklenirken bir hata oluştu')
      }
      const data = await response.json()
      setBarber(data)
    } catch (error) {
      console.error('Berber bilgileri yüklenirken hata:', error)
      setError(
        error instanceof Error ? error.message : 'Bir hata oluştu'
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error || !barber) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error || 'Berber bulunamadı'}
        </div>
        <Link
          href="/berber-bul"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
        >
          ← Berber Aramaya Dön
        </Link>
      </div>
    )
  }

  const dayNames = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Sütun - Berber Bilgileri */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {barber.shopName}
          </h1>

          {barber.rating !== null && (
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-2xl ${
                      index < Math.round(barber.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
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

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Çalışma Saatleri</h2>
            <div className="grid gap-2">
              {barber.workingHours
                .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                .map((hour) => (
                  <div
                    key={hour.id}
                    className="flex justify-between items-center py-2 border-b last:border-0"
                  >
                    <span className="font-medium">
                      {dayNames[hour.dayOfWeek - 1]}
                    </span>
                    <span className="text-gray-600">
                      {hour.isOpen
                        ? `${hour.startTime} - ${hour.endTime}`
                        : 'Kapalı'}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Hizmetler</h2>
            <div className="grid gap-4">
              {barber.services.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-500">
                      {service.duration} dakika
                    </p>
                  </div>
                  <span className="font-medium">
                    {service.price.toFixed(2)} ₺
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Yorumlar</h2>
            {barber.reviews.length > 0 ? (
              <div className="grid gap-6">
                {barber.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        {review.customer.user.name || 'Müşteri'}
                      </span>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`text-lg ${
                              index < review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-gray-600">{review.comment}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(review.createdAt).toLocaleDateString(
                        'tr-TR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Henüz yorum yapılmamış.</p>
            )}
          </div>
        </div>

        {/* Sağ Sütun - Harita ve Randevu */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="h-[300px] mb-6">
                <BerberMap
                  barbers={[
                    {
                      id: barber.id,
                      shopName: barber.shopName,
                      description: barber.description,
                      address: barber.address,
                      city: barber.city,
                      district: barber.district,
                      neighborhood: barber.neighborhood,
                      latitude: barber.latitude,
                      longitude: barber.longitude,
                      rating: barber.rating,
                    },
                  ]}
                />
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
        </div>
      </div>
    </div>
  )
} 