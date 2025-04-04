import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import BerberDetayClient from '@/components/berber-detay/BerberDetayClient'
import { Berber } from '@/types/berber'

interface BerberPageProps {
  params: {
    sehir: string
    ilce: string
    slug: string
  }
}

// Metadata oluşturma fonksiyonu
export async function generateMetadata({ params }: BerberPageProps): Promise<Metadata> {
  const berber = await getBerberData(params)
  
  if (!berber) {
    return {
      title: 'Berber Bulunamadı',
      description: 'Aradığınız berber bulunamadı.'
    }
  }

  const title = `${berber.shopName} - ${params.ilce}/${params.sehir} Berber Randevu`
  const description = `${berber.shopName} randevu al. ${params.ilce}, ${params.sehir} bölgesinde profesyonel berberlik hizmeti. ${berber.description?.slice(0, 150)}`
  const url = `https://berberbul.com/berber/${params.sehir}/${params.ilce}/${params.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description: berber.description || '',
      images: berber.photos?.[0] ? [berber.photos[0]] : [],
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: berber.photos?.[0] ? [berber.photos[0]] : [],
    },
    alternates: {
      canonical: url,
    }
  }
}

// Statik sayfa oluşturma için paths
export async function generateStaticParams() {
  const berberler = await prisma.barber.findMany({
    select: {
      id: true,
      shopName: true,
      city: true,
      district: true
    }
  })

  return berberler.map((berber) => ({
    sehir: berber.city.toLowerCase(),
    ilce: berber.district.toLowerCase(),
    slug: slugify(berber.shopName)
  }))
}

// Berber verilerini getirme fonksiyonu
async function getBerberData(params: BerberPageProps['params']): Promise<Berber | null> {
  const berber = await prisma.barber.findFirst({
    where: {
      AND: [
        { city: { equals: params.sehir, mode: 'insensitive' } },
        { district: { equals: params.ilce, mode: 'insensitive' } },
        { shopName: { 
          equals: params.slug.replace(/-/g, ' '), 
          mode: 'insensitive' 
        }}
      ]
    },
    include: {
      reviews: {
        include: {
          customer: {
            include: {
              user: {
                select: {
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      services: true,
      workingHours: true
    }
  })

  if (!berber) return null

  // Çalışma günlerini dönüştür
  const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
  const formattedBerber: Berber = {
    id: berber.id,
    shopName: berber.shopName,
    city: berber.city,
    district: berber.district,
    neighborhood: berber.neighborhood,
    address: berber.address,
    description: berber.description,
    photos: [], // TODO: Fotoğrafları ekle
    latitude: berber.latitude,
    longitude: berber.longitude,
    phone: berber.phone,
    rating: berber.rating,
    reviews: berber.reviews.map(review => ({
      id: review.id,
      comment: review.comment || '',
      rating: review.rating,
      createdAt: review.createdAt.toISOString(),
      customer: {
        id: review.customer.id,
        firstName: review.customer.user.name?.split(' ')[0] || '',
        lastName: review.customer.user.name?.split(' ').slice(1).join(' ') || ''
      }
    })),
    services: berber.services.map(service => ({
      id: service.id,
      name: service.name,
      price: service.price,
      duration: service.duration
    })),
    workingHours: berber.workingHours.map(hour => ({
      id: hour.id,
      day: hour.dayOfWeek,
      dayOfWeek: daysOfWeek[hour.dayOfWeek],
      startTime: hour.startTime,
      endTime: hour.endTime,
      isOpen: hour.isOpen
    }))
  }

  return formattedBerber
}

export default async function BerberProfilPage({ params }: BerberPageProps) {
  const berber = await getBerberData(params)

  if (!berber) {
    notFound()
  }

  return <BerberDetayClient berber={berber} />
} 