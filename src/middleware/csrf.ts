import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// CSRF token oluşturma
function generateToken() {
  return Math.random().toString(36).substring(2, 15)
}

// CSRF token kontrolü
export async function csrfProtection(req: NextRequest) {
  const token = req.cookies.get('csrf-token')?.value
  const method = req.method

  // GET istekleri için CSRF kontrolü yapma
  if (method === 'GET') {
    return NextResponse.next()
  }

  // CSRF token yoksa oluştur
  if (!token) {
    const response = NextResponse.next()
    response.cookies.set('csrf-token', generateToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    return response
  }

  // CSRF token kontrolü
  const csrfHeader = req.headers.get('x-csrf-token')
  if (!csrfHeader || csrfHeader !== token) {
    return new NextResponse(
      JSON.stringify({ error: 'CSRF token doğrulaması başarısız' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  return NextResponse.next()
} 