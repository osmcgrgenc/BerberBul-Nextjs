import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getCache } from '@/lib/cache'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'CUSTOMER') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const cacheKey = `reviews:${session.user.id}`

    return await getCache(cacheKey, async () => {
      // Müşteri kaydını bul
      const customer = await prisma.customer.findUnique({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true
        }
      })

      if (!customer) {
        return NextResponse.json(
          { error: 'Müşteri bulunamadı' },
          { status: 404 }
        )
      }

      // Müşterinin yorumlarını getir
      const reviews = await prisma.review.findMany({
        where: {
          customerId: customer.id,
        },
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
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
        take: 20, // Sayfalama için limit
      })

      return NextResponse.json(reviews)
    })
  } catch (error) {
    console.error('Yorumlar getirme hatası:', error)
    return NextResponse.json(
      { error: 'Yorumlar getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 