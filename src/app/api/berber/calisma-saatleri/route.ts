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
        workingHours: {
          orderBy: {
            dayOfWeek: 'asc',
          },
        },
      },
    })

    if (!barber) {
      return NextResponse.json({ error: 'Berber profili bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(barber.workingHours)
  } catch (error) {
    console.error('Çalışma saatleri getirme hatası:', error)
    return NextResponse.json(
      { error: 'Çalışma saatleri getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
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
    const { dayOfWeek, startTime, endTime, isOpen } = body

    // Önce mevcut çalışma saatini bul veya oluştur
    const existingHours = await prisma.workingHours.findFirst({
      where: {
        barberId: barber.id,
        dayOfWeek,
      },
    })

    let workingHours
    if (existingHours) {
      // Mevcut çalışma saatini güncelle
      workingHours = await prisma.workingHours.update({
        where: {
          id: existingHours.id,
        },
        data: {
          startTime: startTime || existingHours.startTime,
          endTime: endTime || existingHours.endTime,
          isOpen: isOpen !== undefined ? isOpen : existingHours.isOpen,
        },
      })
    } else {
      // Yeni çalışma saati oluştur
      workingHours = await prisma.workingHours.create({
        data: {
          barberId: barber.id,
          dayOfWeek,
          startTime: startTime || '09:00',
          endTime: endTime || '18:00',
          isOpen: isOpen !== undefined ? isOpen : true,
        },
      })
    }

    return NextResponse.json(workingHours)
  } catch (error) {
    console.error('Çalışma saatleri güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Çalışma saatleri güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 