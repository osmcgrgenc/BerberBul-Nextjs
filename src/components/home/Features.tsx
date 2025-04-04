'use client'

import { MapPin, Calendar, Star } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Müşteri Kazan',
    description: 'Google da seni bulsun\nYeni müşterilerle tanış.',
    color: 'from-blue-50 to-blue-100'
  },
  {
    icon: Calendar,
    title: 'Zaman Kazan',
    description: 'Takvimini sen seç.\nSıra kamiası yok.',
    color: 'from-teal-50 to-teal-100'
  },
  {
    icon: Star,
    title: 'Rekabette Öne Geç',
    description: 'Yorumların seni anlatsın\nMahallende öne çık',
    color: 'from-orange-50 to-orange-100'
  }
]

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Neden BerberBul?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          BerberBul ile işinizi büyütün, müşterilerinizi artırın ve zamanınızı daha iyi yönetin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br hover:scale-105 transition-transform duration-300"
            style={{ background: `linear-gradient(to bottom right, var(--${feature.color}))` }}
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
              <feature.icon className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 whitespace-pre-line">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
} 