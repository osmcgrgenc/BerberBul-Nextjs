import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // params'ı await etmemize gerek yok çünkü artık tip güvenli
    if (!params.id) {
      return NextResponse.json(
        { error: 'Berber ID gerekli' },
        { status: 400 }
      )
    }

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
        rating: true,
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

    return NextResponse.json(barber)
  } catch (error) {
    console.error('Berber bilgileri alınırken hata:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
} 