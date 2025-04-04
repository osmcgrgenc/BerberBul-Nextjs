import { NextRequest, NextResponse } from 'next/server'
import { getCache } from '@/lib/cache'
import { monitorApiCall } from '@/lib/monitoring'
import { getPrismaClient } from '@/lib/db-utils'

async function getBarberHandler(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params

  if (!id) {
    return NextResponse.json(
      { error: 'Berber ID gerekli' },
      { status: 400 }
    )
  }

  const cacheKey = `barber:${id}`

  return await getCache(cacheKey, async () => {
    // Okuma işlemi olduğu için replica'yı kullan
    const prisma = getPrismaClient('read')

    const barber = await prisma.barber.findUnique({
      where: {
        id,
      },
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
        phone: true,
        services: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true,
          },
        },
        workingHours: {
          select: {
            id: true,
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            isOpen: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            customer: {
              select: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          take: 10,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!barber) {
      return NextResponse.json(
        { error: 'Berber bulunamadı' },
        { status: 404 }
      )
    }

    const averageRating = barber.reviews.length > 0
      ? barber.reviews.reduce((acc, review) => acc + review.rating, 0) / barber.reviews.length
      : 0

    return NextResponse.json({
      ...barber,
      averageRating,
    })
  })
}

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    return await monitorApiCall(request, () => getBarberHandler(request, context))
  } catch (error) {
    console.error('Berber getirme hatası:', error)
    return NextResponse.json(
      { error: 'Berber bilgileri getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 