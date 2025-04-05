'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Barber } from '@prisma/client'
import { withCache, withPerformanceMonitoring } from '@/lib/db-utils'

// Bileşenleri lazy load et
const BerberMap = dynamic(() => import('@/components/berber-bul/BerberMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
        <p className="mt-2 text-sm text-gray-600">Harita yükleniyor...</p>
      </div>
    </div>
  ),
})

const BerberCard = dynamic(() => import('@/components/berber-bul/BerberCard'), {
  loading: () => (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-4 h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  ),
})

const SearchFilters = dynamic(() => import('@/components/berber-bul/SearchFilters'), {
  loading: () => (
    <div className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  ),
})

interface BerberWithRating extends Barber {
  averageRating: number
  reviewCount: number
}

export default function BerberBulPage() {
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [berberler, setBerberler] = useState<BerberWithRating[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBerberler = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (city) params.append('city', city)
        if (district) params.append('district', district)
        if (minRating > 0) params.append('minRating', minRating.toString())

        const cacheKey = `berberler-${params.toString()}`
        
        const data = await withPerformanceMonitoring(
          () => withCache(
            cacheKey,
            async () => {
              const response = await fetch(`/api/berberler?${params.toString()}`)
              if (!response.ok) {
                throw new Error('Berberler yüklenirken bir hata oluştu')
              }
              return response.json()
            },
            'shortTerm'
          ),
          'fetchBerberler'
        )

        setBerberler(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBerberler()
  }, [city, district, minRating])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SearchFilters
            city={city}
            district={district}
            minRating={minRating}
            onCityChange={setCity}
            onDistrictChange={setDistrict}
            onMinRatingChange={setMinRating}
          />
          
          {isLoading ? (
            <div className="mt-8 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="mt-4 h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="mt-8 text-center text-red-500">{error}</div>
          ) : (
            <div className="mt-8 space-y-4">
              {berberler.map((berber) => (
                <BerberCard key={berber.id} berber={berber} />
              ))}
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-4 h-[600px]">
            <BerberMap berberler={berberler} />
          </div>
        </div>
      </div>
    </div>
  )
} 