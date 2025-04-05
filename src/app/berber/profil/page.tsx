import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Berber Profili | BerberBul',
  description: 'Berber profilinizi yönetin ve güncelleyin',
}

export default function BerberProfilPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Berber Profili</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profil Bilgileri */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Temel Bilgiler</h2>
          {/* Form içeriği buraya gelecek */}
        </div>
        
        {/* Hizmetler */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Hizmetler</h2>
          {/* Hizmet listesi buraya gelecek */}
        </div>
        
        {/* Çalışma Saatleri */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Çalışma Saatleri</h2>
          {/* Çalışma saatleri formu buraya gelecek */}
        </div>
        
        {/* Konum */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Konum</h2>
          {/* Harita ve adres bilgileri buraya gelecek */}
        </div>
      </div>
    </div>
  )
} 