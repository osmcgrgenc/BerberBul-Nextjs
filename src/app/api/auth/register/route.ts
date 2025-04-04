import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import prisma from '@/lib/prisma'
import { getCache } from '@/lib/cache'

export async function POST(request: Request) {
  try {
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
        if (!shopName) {
          throw new Error('Berber dükkanı adı zorunludur')
        }
        await tx.barber.create({
          data: {
            userId: user.id,
            shopName,
            phone: phone || '',
            address: address || '',
            city: city || '',
            district: district || '',
            neighborhood: neighborhood || '',
            latitude: 0,
            longitude: 0,
          },
        })
      } else if (role === 'CUSTOMER') {
        const { phone } = userData
        await tx.customer.create({
          data: {
            userId: user.id,
            phone: phone || '',
          },
        })
      }

      return user
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Kayıt hatası:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Kayıt işlemi sırasında bir hata oluştu' },
      { status: 500 }
    )
  }
} 