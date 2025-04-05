import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { csrfProtection } from './middleware/csrf'

// Korumalı rotalar
const protectedRoutes = {
  berber: ['/berber'],
  musteri: ['/musteri'],
  admin: ['/admin'],
}

export async function middleware(request: NextRequest) {
  // CSRF koruması
  const csrfResponse = await csrfProtection(request)
  if (csrfResponse instanceof NextResponse) {
    return csrfResponse
  }

  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Public rotalar
  if (pathname.startsWith('/genel') || pathname === '/') {
    return NextResponse.next()
  }

  // Kullanıcı giriş yapmamışsa
  if (!token) {
    const url = new URL('/genel/giris', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // Rol bazlı yetkilendirme
  const userRole = token.role as string

  // Berber rotaları
  if (pathname.startsWith('/berber')) {
    if (userRole !== 'berber') {
      return NextResponse.redirect(new URL('/genel/giris', request.url))
    }
  }

  // Müşteri rotaları
  if (pathname.startsWith('/musteri')) {
    if (userRole !== 'musteri') {
      return NextResponse.redirect(new URL('/genel/giris', request.url))
    }
  }

  // Admin rotaları
  if (pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/genel/giris', request.url))
    }
  }

  return NextResponse.next()
}

// Middleware'in çalışacağı rotalar
export const config = {
  matcher: [
    '/berber/:path*',
    '/musteri/:path*',
    '/admin/:path*',
    '/genel/:path*',
    '/api/:path*',
  ],
} 