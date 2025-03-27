import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const barber = await prisma.barber.findUnique({
      where: {
        id: params.id,
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

    // Ortalama puanı hesapla
    const rating =
      barber.reviews.length > 0
        ? barber.reviews.reduce(
            (acc: number, review: { rating: number }) =>
              acc + review.rating,
            0
          ) / barber.reviews.length
        : null

    return NextResponse.json({
      ...barber,
      rating,
    })
  } catch (error) {
    console.error('Berber bilgileri alınırken hata:', error)
    return NextResponse.json(
      { error: 'Berber bilgileri alınırken bir hata oluştu' },
      { status: 500 }
    )
  }
} 