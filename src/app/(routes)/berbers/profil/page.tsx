'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'

const LocationPicker = dynamic(() => import('@/components/berber/LocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      Harita yükleniyor...
    </div>
  ),
})

interface BarberProfile {
  shopName: string
  description?: string
  phone: string
  address: string
  city: string
  district: string
  neighborhood: string
  latitude: number
  longitude: number
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
}

export default function BarberProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<BarberProfile>()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris')
    } else if (status === 'authenticated' && session.user.role !== 'BARBER') {
      router.push('/')
    } else if (status === 'authenticated') {
      fetchBarberProfile()
    }
  }, [status, session])

  const fetchBarberProfile = async () => {
    try {
      const response = await fetch('/api/berber/profil')
      if (response.ok) {
        const data = await response.json()
        reset(data)
      }
    } catch (error) {
      console.error('Profil yüklenirken hata:', error)
      setError('Profil bilgileri yüklenirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: BarberProfile) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/berber/profil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Profil güncellenirken bir hata oluştu')
      }

      fetchBarberProfile()
    } catch (error) {
      console.error('Profil güncellenirken hata:', error)
      setError('Profil güncellenirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setValue('latitude', location.lat)
    setValue('longitude', location.lng)
  }

  const currentLocation = {
    lat: watch('latitude') || 41.0082,
    lng: watch('longitude') || 28.9784,
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Berber Profili
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              İşletme bilgilerinizi güncelleyin
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    İşletme Adı
                  </label>
                  <input
                    type="text"
                    {...register('shopName', { required: 'İşletme adı gereklidir' })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.shopName && (
                    <p className="mt-1 text-sm text-red-600">{errors.shopName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Açıklama
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Telefon numarası gereklidir' })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Adres
                  </label>
                  <textarea
                    {...register('address', { required: 'Adres gereklidir' })}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      İl
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: 'İl gereklidir' })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      İlçe
                    </label>
                    <input
                      type="text"
                      {...register('district', { required: 'İlçe gereklidir' })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.district && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mahalle
                    </label>
                    <input
                      type="text"
                      {...register('neighborhood', { required: 'Mahalle gereklidir' })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.neighborhood && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.neighborhood.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konum
                  </label>
                  <LocationPicker
                    initialLocation={currentLocation}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 