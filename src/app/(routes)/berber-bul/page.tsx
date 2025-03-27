'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import BerberCard from '@/components/berber-bul/BerberCard'
import SearchFilters from '@/components/berber-bul/SearchFilters'
import BerberMap from '@/components/berber-bul/BerberMap'
import { Barber } from '@prisma/client'

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

        const response = await fetch(`/api/berberler?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Berberler yüklenirken bir hata oluştu')
        }

        const data = await response.json()
        setBerberler(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Bir hata oluştu')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBerberler()
  }, [city, district, minRating])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <SearchFilters
              city={city}
              setCity={setCity}
              district={district}
              setDistrict={setDistrict}
              minRating={minRating}
              setMinRating={setMinRating}
            />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sonuçlar</h2>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                  {error}
                </div>
              ) : berberler.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Arama kriterlerinize uygun berber bulunamadı.</p>
                  <p className="text-sm text-gray-400 mt-1">Lütfen farklı filtreler deneyin.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {berberler.map((berber) => (
                    <BerberCard key={berber.id} berber={berber} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 h-[calc(100vh-4rem)] sticky top-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 h-full">
              <BerberMap berberler={berberler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 