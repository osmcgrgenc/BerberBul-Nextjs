import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json()

    // Gerekli alanların kontrolü
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: 'Tüm alanlar zorunludur' },
        { status: 400 }
      )
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Geçersiz email formatı' },
        { status: 400 }
      )
    }

    // Şifre uzunluğu kontrolü
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Şifre en az 6 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Rol kontrolü
    if (!['musteri', 'berber'].includes(role)) {
      return NextResponse.json(
        { message: 'Geçersiz rol' },
        { status: 400 }
      )
    }

    // Email kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      )
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10)

    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    // Rol bazlı ek bilgileri oluştur
    if (role === 'berber') {
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