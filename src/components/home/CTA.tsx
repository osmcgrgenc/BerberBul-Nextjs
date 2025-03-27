'use client'

import Link from 'next/link'

export default function CTA() {
  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Hemen Başlayın
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            İster müşteri olun, ister berber. BerberBul ile randevu sistemini
            dijitalleştirin.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/musteri/kayit"
              className="w-full sm:w-auto rounded-xl bg-white/10 backdrop-blur-sm px-10 py-4 text-lg font-semibold text-white shadow-lg hover:bg-white/20 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Müşteri Olarak Kaydol
            </Link>
            <Link
              href="/berber/kayit"
              className="w-full sm:w-auto rounded-xl bg-white px-10 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
            >
              Berber Olarak Kaydol
            </Link>
          </div>
          {/* Background blur */}
          <div
            className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-tr from-blue-500 to-blue-300 opacity-25"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 