import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id || session.user.role !== 'BARBER') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const barber = await prisma.barber.findUnique({
      where: {
        userId: session.user.id
      }
    })

    if (!barber) {
      return NextResponse.json({ error: 'Berber profili bulunamadı' }, { status: 404 })
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        barberId: barber.id
      },
      include: {
        customer: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        service: true
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Randevular getirme hatası:', error)
    return NextResponse.json(
      { error: 'Randevular getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 