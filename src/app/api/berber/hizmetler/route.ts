import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'BARBER') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const barber = await prisma.barber.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        services: true,
      },
    })

    if (!barber) {
      return NextResponse.json({ error: 'Berber profili bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(barber.services)
  } catch (error) {
    console.error('Hizmetler getirme hatası:', error)
    return NextResponse.json(
      { error: 'Hizmetler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'BARBER') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const barber = await prisma.barber.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    if (!barber) {
      return NextResponse.json({ error: 'Berber profili bulunamadı' }, { status: 404 })
    }

    const body = await request.json()
    const { name, duration, price } = body

    const service = await prisma.service.create({
      data: {
        barberId: barber.id,
        name,
        duration,
        price,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Hizmet ekleme hatası:', error)
    return NextResponse.json(
      { error: 'Hizmet eklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 