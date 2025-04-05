'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface AdminNavbarProps {
  user: {
    name: string
    email: string
  }
}

export default function AdminNavbar({ user }: AdminNavbarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold text-gray-800">
              BerberBul Admin
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin/seo"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin/seo')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              SEO
            </Link>
            <Link
              href="/admin/cms"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin/cms')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              CMS
            </Link>
            <Link
              href="/admin/raporlar"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin/raporlar')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Raporlar
            </Link>
            <Link
              href="/admin/ayarlar"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin/ayarlar')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Ayarlar
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">{user.name}</span>
            <button
              onClick={() => signOut()}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 