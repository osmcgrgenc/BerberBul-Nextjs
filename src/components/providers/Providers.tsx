'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider session={session}>
      {children}
      <Toaster position="top-right" />
    </SessionProvider>
  )
} 