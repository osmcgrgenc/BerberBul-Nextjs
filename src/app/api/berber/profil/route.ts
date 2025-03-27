import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
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

    return NextResponse.json(barber)
  } catch (error) {
    console.error('Profil getirme hatası:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const {
      shopName,
      description,
      phone,
      address,
      city,
      district,
      neighborhood,
      latitude,
      longitude,
    } = data

    const barber = await prisma.barber.update({
      where: {
        userId: session.user.id,
      },
      data: {
        shopName,
        description,
        phone,
        address,
        city,
        district,
        neighborhood,
        latitude,
        longitude,
      },
    })

    return NextResponse.json(barber)
  } catch (error) {
    console.error('Profil güncelleme hatası:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 