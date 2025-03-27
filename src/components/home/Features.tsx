'use client'

import { CalendarDays, MapPin, Clock, Star } from 'lucide-react'

const features = [
  {
    name: 'Kolay Randevu',
    description: 'Birkaç tıkla istediğiniz berbere randevu alın.',
    icon: CalendarDays,
  },
  {
    name: 'Konum Bazlı Arama',
    description: 'Size en yakın berberleri kolayca bulun.',
    icon: MapPin,
  },
  {
    name: 'Çalışma Saatleri',
    description: 'Berberlerin müsait olduğu saatleri görün.',
    icon: Clock,
  },
  {
    name: 'Müşteri Yorumları',
    description: 'Diğer müşterilerin deneyimlerini okuyun.',
    icon: Star,
  },
]

export default function Features() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Neden BerberBul?
        </h2>
        <p className="mt-6 text-xl leading-8 text-gray-600">
          BerberBul ile berber randevusu almanın avantajları
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <dt className="flex items-center gap-3 font-semibold text-gray-900 text-lg mb-3">
                <feature.icon
                  className="h-8 w-8 text-blue-600"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>
              <dd className="text-gray-600">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
} 