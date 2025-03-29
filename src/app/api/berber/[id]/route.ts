import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params

    if (!id) {
      return NextResponse.json(
        { error: 'Berber ID gerekli' },
        { status: 400 }
      )
    }

    const barber = await prisma.barber.findUnique({
      where: {
        id,
      },
      include: {
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
    const averageRating =
      barber.reviews.length > 0
        ? barber.reviews.reduce((acc, review) => acc + review.rating, 0) /
          barber.reviews.length
        : null

    // Response nesnesini oluştur
    const response = {
      id: barber.id,
      shopName: barber.shopName,
      description: barber.description,
      address: barber.address,
      city: barber.city,
      district: barber.district,
      neighborhood: barber.neighborhood,
      latitude: barber.latitude,
      longitude: barber.longitude,
      rating: averageRating,
      services: barber.services,
      workingHours: barber.workingHours,
      reviews: barber.reviews,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Berber bilgileri alınırken hata:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
} 