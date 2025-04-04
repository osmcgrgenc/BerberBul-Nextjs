'use client'

import { Berber, Barber } from '@/types/berber'
import BerberInfo from './BerberInfo'
import WorkingHours from './WorkingHours'
import Services from './Services'
import Reviews from './Reviews'
import AppointmentSection from './AppointmentSection'

interface BerberDetayClientProps {
  berber: Berber
}

export default function BerberDetayClient({ berber }: BerberDetayClientProps) {
  const barberData: Barber = {
    ...berber,
    description: berber.description ?? null,
    address: berber.address ?? '',
    neighborhood: berber.neighborhood ?? '',
    rating: berber.rating ?? null,
    latitude: berber.latitude ?? 0,
    longitude: berber.longitude ?? 0,
    workingHours: berber.workingHours.map(hour => ({
      ...hour,
      dayOfWeek: hour.day
    })),
    reviews: berber.reviews.map(review => ({
      ...review,
      customer: {
        user: { name: `${review.customer.firstName} ${review.customer.lastName}` }
      }
    }))
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <BerberInfo barber={barberData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Services services={berber.services} />
        <WorkingHours workingHours={barberData.workingHours} />
      </div>
      <Reviews reviews={barberData.reviews} />
      <AppointmentSection barber={barberData} />
    </main>
  )
} 