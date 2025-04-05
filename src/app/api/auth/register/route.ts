import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations/auth'
import { rateLimit } from '@/middleware/rate-limit'

export async function POST(req: Request) {
  try {
    // Rate limiting kontrolü
    const rateLimitResponse = await rateLimit(req)
    if (rateLimitResponse instanceof Response) {
      return rateLimitResponse
    }

    const body = await req.json()
    const validatedData = registerSchema.parse(body)

    // Email kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      )
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
      },
    })

    // Hassas bilgileri çıkar
    const { password, ...userWithoutPassword } = user

    // Rol bazlı ek bilgileri oluştur
    if (validatedData.role === 'berber') {
      await prisma.berber.create({
        data: {
          userId: user.id,
          adres: '',
          telefon: '',
          calismaSaatleri: {},
          hizmetler: {},
        },
      })
    } else if (role === 'musteri') {
      await prisma.musteri.create({
        data: {
          userId: user.id,
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
      { message: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
} 