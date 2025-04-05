import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Yönetimi | BerberBul Admin',
  description: 'SEO ayarlarını yönetin',
}

export default function SeoYonetimPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">SEO Yönetimi</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meta Ayarları */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Meta Ayarları</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Başlığı
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Site başlığını girin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Açıklama
              </label>
              <textarea
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Meta açıklamasını girin"
              />
            </div>
          </div>
        </div>
        
        {/* Sayfa SEO Ayarları */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sayfa SEO Ayarları</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sayfa Seçin
              </label>
              <select className="w-full p-2 border rounded">
                <option>Ana Sayfa</option>
                <option>Berber Arama</option>
                <option>Giriş</option>
                <option>Kayıt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sayfa Başlığı
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Sayfa başlığını girin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sayfa Açıklaması
              </label>
              <textarea
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Sayfa açıklamasını girin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 