import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'BARBER') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const barber = await prisma.barber.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    if (!barber) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        barberId: barber.id,
      },
      include: {
        customer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        service: true,
      },
      orderBy: {
        startTime: 'desc',
      },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Randevular getirme hatası:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 