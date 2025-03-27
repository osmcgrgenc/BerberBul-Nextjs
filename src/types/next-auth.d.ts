import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: 'CUSTOMER' | 'BARBER'
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: 'CUSTOMER' | 'BARBER'
  }
} 