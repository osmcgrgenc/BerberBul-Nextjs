import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { rateLimit } from '@/middleware/rate-limit'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
        role: { label: 'Rol', type: 'text' }
      },
      async authorize(credentials, req) {
        // Rate limiting kontrolü
        const rateLimitResponse = await rateLimit(req as Request)
        if (rateLimitResponse instanceof Response) {
          throw new Error(await rateLimitResponse.text())
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email ve şifre gereklidir')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error('Kullanıcı bulunamadı')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Geçersiz şifre')
        }

        if (user.role !== credentials.role) {
          throw new Error('Geçersiz rol')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: '/genel/giris',
    error: '/genel/hata',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST } 