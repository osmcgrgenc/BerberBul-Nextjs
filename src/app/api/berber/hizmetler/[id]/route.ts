import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Hizmetin berbere ait olduğunu kontrol et
    const service = await prisma.service.findFirst({
      where: {
        id: params.id,
        barberId: barber.id,
      },
    })

    if (!service) {
      return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })
    }

    await prisma.service.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: 'Hizmet başarıyla silindi' })
  } catch (error) {
    console.error('Hizmet silme hatası:', error)
    return NextResponse.json(
      { error: 'Hizmet silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 