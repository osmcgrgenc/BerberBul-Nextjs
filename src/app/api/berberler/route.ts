import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getCache } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const district = searchParams.get('district')
    const rating = searchParams.get('rating')

    const cacheKey = `berberler:${city}:${district}:${rating}`

    return await getCache(cacheKey, async () => {
      // Filtreleme koşullarını oluştur
      const where: Prisma.BarberWhereInput = {}

      if (city) {
        where.city = {
          equals: city,
          mode: 'insensitive',
        }
      }

      if (district) {
        where.district = {
          equals: district,
          mode: 'insensitive',
        }
      }

      // Berberleri getir
      const barbers = await prisma.barber.findMany({
        where,
        select: {
          id: true,
          shopName: true,
          description: true,
          address: true,
          city: true,
          district: true,
          neighborhood: true,
          latitude: true,
          longitude: true,
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      })

      // Ortalama puanları hesapla ve rating filtresini uygula
      const filteredBarbers = barbers
        .map(barber => {
          const avgRating = barber.reviews.length > 0
            ? barber.reviews.reduce((acc, review) => acc + review.rating, 0) / barber.reviews.length
            : 0

          return {
            ...barber,
            averageRating: avgRating,
          }
        })
        .filter(barber => !rating || barber.averageRating >= Number(rating))

      return NextResponse.json(filteredBarbers)
    })
  } catch (error) {
    console.error('Berberler getirme hatası:', error)
    return NextResponse.json(
      { error: 'Berberler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 