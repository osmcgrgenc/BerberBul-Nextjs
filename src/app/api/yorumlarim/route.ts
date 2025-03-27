import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'CUSTOMER') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Müşteri kaydını bul
    const customer = await prisma.customer.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    if (!customer) {
      return new NextResponse('Not Found', { status: 404 })
    }

    // Müşterinin yorumlarını getir
    const reviews = await prisma.review.findMany({
      where: {
        customerId: customer.id,
      },
      include: {
        barber: {
          select: {
            id: true,
            shopName: true,
            address: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Yorumlar getirme hatası:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 