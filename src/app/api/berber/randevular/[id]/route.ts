import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const body = await request.json()
    const { status } = body

    // Randevunun berbere ait olduğunu kontrol et
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: params.id,
        barberId: barber.id
      }
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Randevu bulunamadı' }, { status: 404 })
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: params.id
      },
      data: {
        status
      }
    })

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    console.error('Randevu durumu güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Randevu durumu güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 