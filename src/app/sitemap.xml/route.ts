import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://berberbul.com'

  // XML başlığı ve namespace tanımlamaları
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const xmlns = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
  
  // Statik sayfalar
  const staticUrls = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/hakkimizda`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/iletisim`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.5'
    }
  ]

  // Berber sayfaları
  const berberler = await prisma.barber.findMany({
    select: {
      shopName: true,
      city: true,
      district: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  const berberUrls = berberler.map(berber => ({
    loc: `${baseUrl}/berber/${berber.city.toLowerCase()}/${berber.district.toLowerCase()}/${slugify(berber.shopName)}`,
    lastmod: berber.updatedAt.toISOString(),
    changefreq: 'daily',
    priority: '0.9'
  }))

  // Şehir ve ilçe sayfaları
  const locations = await prisma.barber.groupBy({
    by: ['city', 'district'],
  })

  const locationUrls = locations.map(location => ({
    loc: `${baseUrl}/berber/${location.city.toLowerCase()}/${location.district.toLowerCase()}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.7'
  }))

  // Tüm URL'leri birleştir
  const allUrls = [...staticUrls, ...berberUrls, ...locationUrls]

  // XML oluştur
  const sitemap = `${xmlHeader}
<urlset ${xmlns}>
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // XML response döndür
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  })
} 