'use client'

import { useState, useEffect, useCallback } from 'react'
import { Barber } from '@/types/berber'
import BerberInfo from './BerberInfo'
import WorkingHours from './WorkingHours'
import Services from './Services'
import Reviews from './Reviews'
import AppointmentSection from './AppointmentSection'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorMessage from '../ui/ErrorMessage'

interface BerberDetayClientProps {
  id: string
}

export default function BerberDetayClient({ id }: BerberDetayClientProps) {
  const [barber, setBarber] = useState<Barber | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBarber = useCallback(async () => {
    try {
      const response = await fetch(`/api/berber/${id}`)
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
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchBarber()
  }, [fetchBarber])

  if (loading) {
    return <LoadingSpinner message="Yükleniyor..." />
  }

  if (error || !barber) {
    return (
      <ErrorMessage
        error={error || 'Berber bulunamadı'}
        backLink="/berber-bul"
        backText="Berber Aramaya Dön"
      />
    )
  }

  const barberLocation = {
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Sütun - Berber Bilgileri */}
        <div className="lg:col-span-2">
          <BerberInfo barber={barber} />
          <WorkingHours workingHours={barber.workingHours} />
          <Services services={barber.services} />
          <Reviews reviews={barber.reviews} />
        </div>

        {/* Sağ Sütun - Harita ve Randevu */}
        <div className="lg:col-span-1">
          <AppointmentSection barber={barberLocation} />
        </div>
      </div>
    </div>
  )
} 