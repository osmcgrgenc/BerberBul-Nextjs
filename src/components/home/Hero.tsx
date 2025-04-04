'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          BerberBul ile<br />
          Daha Fazla<br />
          Müşteri!
        </h1>
        <p className="text-lg text-gray-600">
          Konumuna en yakın müşteriler<br />
          seni şimdi bulsun, Sadece 100₺/ay.
        </p>
        <Link 
          href="/register" 
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Hemen Ücretsiz Başla
        </Link>
      </div>
      
      <div className="flex-1 relative">
        <div className="relative w-full max-w-[500px] aspect-square">
          <Image
            src="/images/barber-illustration.png"
            alt="Berber İllüstrasyonu"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div>
                <div className="font-medium">Berber Ahmet</div>
                <div className="flex text-orange-400">★★★★☆</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div>
                <div className="font-medium">Berbel Mehmet</div>
                <div className="flex text-orange-400">★★★★☆</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 