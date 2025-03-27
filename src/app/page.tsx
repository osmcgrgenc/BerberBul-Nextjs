import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            BerberBul ile En Yakın Berberi Keşfet
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Konumuna en yakın berberleri bul, randevunu hemen oluştur!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="space-y-4">
              <Link
                href="/musteri/kayit"
                className="block sm:inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Müşteri Olarak Kaydol
              </Link>
              <Link
                href="/musteri/giris"
                className="block sm:inline-block bg-blue-100 text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-200 transition"
              >
                Müşteri Girişi
              </Link>
            </div>
            
            <div className="space-y-4">
              <Link
                href="/berber/kayit"
                className="block sm:inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Berber Olarak Kaydol
              </Link>
              <Link
                href="/berber/giris"
                className="block sm:inline-block bg-blue-100 text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-200 transition"
              >
                Berber Girişi
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Kolay Randevu
            </h3>
            <p className="text-gray-600">
              Dilediğiniz berberi seçin ve birkaç tıkla randevunuzu oluşturun.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Konum Bazlı Arama
            </h3>
            <p className="text-gray-600">
              Size en yakın berberleri harita üzerinde görüntüleyin.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Detaylı Profiller
            </h3>
            <p className="text-gray-600">
              Berberlerin hizmetlerini, fiyatlarını ve müsaitlik durumlarını görüntüleyin.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
