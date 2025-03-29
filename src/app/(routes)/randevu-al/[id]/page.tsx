'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Barber } from '@/types/berber'
import BerberInfo from '@/components/berber-detay/BerberInfo'
import WorkingHours from '@/components/berber-detay/WorkingHours'
import Services from '@/components/berber-detay/Services'
import Reviews from '@/components/berber-detay/Reviews'
import AppointmentSection from '@/components/berber-detay/AppointmentSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'

interface PageProps {
  params: { id: string }
}

export default function BerberDetayPage({ params }: PageProps) {
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
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

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