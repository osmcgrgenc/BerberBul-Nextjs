'use client'

import { useSession } from 'next-auth/react'
import CustomerNavbar from './CustomerNavbar'
import BarberNavbar from './BarberNavbar'
import PublicNavbar from './PublicNavbar'

export default function Navbar() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null // veya loading spinner
  }

  if (!session) {
    return <PublicNavbar />
  }

  // Kullanıcı tipine göre navbar gösterimi
  switch (session.user?.role) {
    case 'BARBER':
      return <BarberNavbar user={session.user} />
    case 'CUSTOMER':
      return <CustomerNavbar user={session.user} />
    default:
      return <PublicNavbar />
  }
} 