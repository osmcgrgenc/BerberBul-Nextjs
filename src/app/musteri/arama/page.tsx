import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berber Ara | BerberBul',
  description: 'Size en uygun berberi bulun',
}

export default function BerberAramaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Berber Ara</h1>
      
      {/* Arama Filtreleri */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konum
            </label>
            <input
              type="text"
              placeholder="Adres veya konum girin"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hizmet
            </label>
            <select className="w-full p-2 border rounded">
              <option>Tüm Hizmetler</option>
              {/* Hizmet listesi buraya gelecek */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarih
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
      
      {/* Berber Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Berber kartları buraya gelecek */}
      </div>
    </div>
  )
} 