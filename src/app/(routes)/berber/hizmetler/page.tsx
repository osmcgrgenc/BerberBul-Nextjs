'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Service {
  id: string
  name: string
  duration: number
  price: number
}

interface ServiceForm {
  name: string
  duration: number
  price: number
}

export default function ServicesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceForm>()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris')
    } else if (status === 'authenticated' && session.user.role !== 'BARBER') {
      router.push('/')
    } else if (status === 'authenticated') {
      fetchServices()
    }
  }, [status, session])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/berber/hizmetler')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Hizmetler yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: ServiceForm) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/berber/hizmetler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        reset()
        fetchServices()
      }
    } catch (error) {
      console.error('Hizmet eklenirken hata:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/berber/hizmetler/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error('Hizmet silinirken hata:', error)
    }
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
              Hizmet Ekle
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Müşterilerinize sunduğunuz hizmetleri ekleyin
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hizmet Adı
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Hizmet adı gereklidir' })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Süre (dakika)
                  </label>
                  <input
                    type="number"
                    {...register('duration', {
                      required: 'Süre gereklidir',
                      min: { value: 1, message: 'Süre en az 1 dakika olmalıdır' },
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fiyat (TL)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', {
                      required: 'Fiyat gereklidir',
                      min: { value: 0, message: 'Fiyat 0 TL veya üzeri olmalıdır' },
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isSubmitting ? 'Ekleniyor...' : 'Hizmet Ekle'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Mevcut Hizmetler
        </h3>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {services.map((service) => (
              <li key={service.id}>
                <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {service.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {service.duration} dakika • {service.price} TL
                    </p>
                  </div>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="ml-4 text-red-600 hover:text-red-900"
                  >
                    Sil
                  </button>
                </div>
              </li>
            ))}
            {services.length === 0 && (
              <li className="px-4 py-4 text-center text-gray-500 sm:px-6">
                Henüz hizmet eklenmemiş
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
} 