'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface CustomerNavbarProps {
  user: {
    id: string
    name: string
    email: string
    image?: string | null
  }
}

const navItems = [
  { href: '/profil/musteri', label: 'Profil' },
  { href: '/randevularim', label: 'Randevularım' },
  { href: '/yorumlarim', label: 'Yorumlarım' },
  { href: '/ayarlar', label: 'Ayarlar' },
]

export default function CustomerNavbar({ user }: CustomerNavbarProps) {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            BerberBul
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
            <button
              onClick={() => signOut()}
              className="text-sm text-gray-600 hover:text-primary"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 