'use client'

import Link from 'next/link'
import ReviewCard from '../ui/ReviewCard'
import { Check } from 'lucide-react'

const reviews = [
  {
    name: 'Berber Ahmet',
    rating: 4,
    comment: 'İşlerim gözle görülür şekilde arttı!'
  },
  {
    name: 'Berber Mehmet',
    rating: 4,
    comment: 'Platform kullanımı çok kolay'
  },
  {
    name: 'Berber Munun',
    rating: 5,
    comment: 'Müşteriler yorumlara önem veriyor'
  }
]

const features = [
  'Sınırsız randevu alımı',
  'Müşteri yorumları',
  'Konuma göre listeleme',
  'Profesyonel berber profili'
]

export default function CTA() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Sol taraf - Grafik ve Yorumlar */}
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-6">
              {/* Grafik gösterimi */}
              <div className="aspect-[4/3] relative bg-white rounded-lg mb-6 p-4">
                <div className="w-full h-full bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600 mb-2">100+</div>
                    <div className="text-gray-600">Aktif Berber</div>
                  </div>
                </div>
              </div>
              
              {/* Yorumlar */}
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </div>
          </div>

          {/* Sağ taraf - Fiyat ve Özellikler */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <h3 className="text-3xl font-bold">Sadece 100₺</h3>
                <span className="text-gray-600">/ Ay</span>
              </div>
              
              <p className="text-gray-600 mb-8">
                Tüm özelliklere sınırsız erişim, ek ücret yok!
              </p>

              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-teal-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                href="/register"
                className="block w-full bg-teal-600 text-white text-center px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Hemen Ücretsiz Başla
              </Link>
              <p className="text-sm text-center text-gray-500">
                14 gün ücretsiz deneme, istediğin zaman iptal et
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 