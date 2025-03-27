import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password, role, ...userData } = body

    // E-posta kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanımda' },
        { status: 400 }
      )
    }

    // Şifre hashleme
    const hashedPassword = await hash(password, 12)

    // Kullanıcı oluşturma
    const user = await prisma.user.create({
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
      await prisma.barber.create({
        data: {
          userId: user.id,
          shopName,
          phone,
          address,
          city,
          district,
          neighborhood,
          latitude: 0, // TODO: Geocoding servisi ile koordinatlar alınacak
          longitude: 0,
        },
      })
    } else if (role === 'CUSTOMER') {
      const { phone } = userData
      await prisma.customer.create({
        data: {
          userId: user.id,
          phone,
        },
      })
    }

    return NextResponse.json(
      { message: 'Kullanıcı başarıyla oluşturuldu' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Kayıt hatası:', error)
    return NextResponse.json(
      { error: 'Kayıt işlemi sırasında bir hata oluştu' },
      { status: 500 }
    )
  }
} 