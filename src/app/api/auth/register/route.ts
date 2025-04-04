import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import prisma from '@/lib/prisma'
import { getCache } from '@/lib/cache'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Rate limiting için Redis bağlantısı
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 1 dakikada maksimum 5 istek
})

export async function POST(request: Request) {
  try {
    // Rate limiting kontrolü
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Çok fazla istek gönderdiniz. Lütfen bir süre bekleyin.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, name, password, role, ...userData } = body

    // E-posta kontrolü için önbellek kullanımı
    const existingUser = await getCache(`user:${email}`, async () => {
      return await prisma.user.findUnique({
        where: { email },
        select: { id: true }
      })
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanımda' },
        { status: 400 }
      )
    }

    // Transaction kullanarak atomik işlem
    const result = await prisma.$transaction(async (tx) => {
      // Şifre hashleme
      const hashedPassword = await hash(password, 12)

      // Kullanıcı oluşturma
      const user = await tx.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role,
        },
      })

      // Role göre ilgili profil oluşturma
      if (role === 'BARBER') {
        const { shopName, phone, address, city, district, neighborhood } = userData
        await tx.barber.create({
          data: {
            userId: user.id,
            shopName,
            phone,
            address,
            city,
            district,
            neighborhood,
            latitude: 0,
            longitude: 0,
          },
        })
      } else if (role === 'CUSTOMER') {
        const { phone } = userData
        await tx.customer.create({
          data: {
            userId: user.id,
            phone,
          },
        })
      }

      return user
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Kayıt hatası:', error)
    return NextResponse.json(
      { error: 'Kayıt işlemi sırasında bir hata oluştu' },
      { status: 500 }
    )
  }
} 