'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const BerberMap = dynamic(() => import('@/components/customer/BerberMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
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
}

export default function BerberBulPage() {
  const { data: session } = useSession()
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'list' | 'map'>('list')
  const [filters, setFilters] = useState({
    city: '',
    district: '',
    rating: '',
  })

  useEffect(() => {
    fetchBarbers()
  }, [filters])

  const fetchBarbers = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      if (filters.city) queryParams.append('city', filters.city)
      if (filters.district) queryParams.append('district', filters.district)
      if (filters.rating) queryParams.append('rating', filters.rating)

      const response = await fetch(`/api/berberler?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error('Berberler yüklenirken bir hata oluştu')
      }
      const data = await response.json()
      setBarbers(data)
    } catch (error) {
      console.error('Berberler yüklenirken hata:', error)
      setError('Berberler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Berber Bul
        </h1>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Tüm Şehirler</option>
              <option value="istanbul">İstanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">İzmir</option>
            </select>
            <select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Tüm İlçeler</option>
              {filters.city === 'istanbul' && (
                <>
                  <option value="kadikoy">Kadıköy</option>
                  <option value="besiktas">Beşiktaş</option>
                  <option value="sisli">Şişli</option>
                </>
              )}
            </select>
            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Tüm Puanlar</option>
              <option value="4">4 ve üzeri</option>
              <option value="3">3 ve üzeri</option>
              <option value="2">2 ve üzeri</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md ${
                view === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setView('map')}
              className={`px-4 py-2 rounded-md ${
                view === 'map'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Harita
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {view === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barbers.map((barber) => (
            <Link
              key={barber.id}
              href={`/berber/${barber.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {barber.shopName}
                </h2>
                {barber.description && (
                  <p className="text-gray-600 mb-4">{barber.description}</p>
                )}
                <div className="text-sm text-gray-500">
                  <p className="mb-1">
                    {barber.address}, {barber.neighborhood}
                  </p>
                  <p>
                    {barber.district}, {barber.city}
                  </p>
                </div>
                {barber.rating !== null && (
                  <div className="mt-4 flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-700">
                      {barber.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-[600px] rounded-lg overflow-hidden">
          <BerberMap barbers={barbers} />
        </div>
      )}
    </div>
  )
} 