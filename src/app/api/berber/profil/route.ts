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
      },
      include: {
        services: true,
        workingHours: true
      }
    })

    if (!barber) {
      return NextResponse.json({ error: 'Berber profili bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(barber)
  } catch (error) {
    console.error('Profil getirme hatası:', error)
    return NextResponse.json(
      { error: 'Profil getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id || session.user.role !== 'BARBER') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const {
      shopName,
      description,
      phone,
      address,
      city,
      district,
      neighborhood,
    } = body

    const updatedBarber = await prisma.barber.update({
      where: {
        userId: session.user.id
      },
      data: {
        shopName,
        description,
        phone,
        address,
        city,
        district,
        neighborhood,
      }
    })

    return NextResponse.json(updatedBarber)
  } catch (error) {
    console.error('Profil güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Profil güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 