import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')
    const district = searchParams.get('district')
    const rating = searchParams.get('rating')

    // Filtreleme koşullarını oluştur
    const where: any = {}

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
        _count: {
          select: {
            reviews: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    // Ortalama puanları hesapla ve rating filtresini uygula
    const barbersWithRating = barbers.map((barber) => {
      const totalRating = barber.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      )
      const averageRating =
        barber.reviews.length > 0
          ? totalRating / barber.reviews.length
          : null

      return {
        ...barber,
        rating: averageRating,
        reviews: undefined,
        _count: undefined,
      }
    })

    // Rating filtresini uygula
    const filteredBarbers = rating
      ? barbersWithRating.filter(
          (barber) =>
            barber.rating !== null && barber.rating >= Number(rating)
        )
      : barbersWithRating

    return NextResponse.json(filteredBarbers)
  } catch (error) {
    console.error('Berberler getirme hatası:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 