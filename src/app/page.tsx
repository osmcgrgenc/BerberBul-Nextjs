import Link from 'next/link'
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

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Gradient */}
        <div
          className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-400 opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              En İyi Berberi{' '}
              <span className="text-blue-600 relative">
                BerberBul
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></span>
              </span>{' '}
              ile Keşfet
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-600">
              Konumuna en yakın berberleri bul, müşteri yorumlarını incele ve
              hemen randevunu oluştur. Artık berber randevusu almak çok kolay!
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/berber-bul"
                className="w-full sm:w-auto rounded-xl bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Berber Bul
              </Link>
              <Link
                href="/berber/kayit"
                className="w-full sm:w-auto rounded-xl bg-white px-10 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Berber Olarak Katıl
              </Link>
            </div>
          </div>
        </div>

        {/* Gradient */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-600 to-blue-400 opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      {/* Features Section */}
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

      {/* CTA Section */}
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
    </main>
  )
}
