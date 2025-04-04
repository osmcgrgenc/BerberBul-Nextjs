import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getApiMetrics } from '@/lib/monitoring'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const metrics = getApiMetrics()

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Metrikler getirme hatası:', error)
    return NextResponse.json(
      { error: 'Metrikler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
} 