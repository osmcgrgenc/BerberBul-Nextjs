'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Berberler', href: '/berberler' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
]

export default function PublicNavbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                BerberBul
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center space-x-4">
                <Link
                  href="/giris"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/kayit"
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
          </div>

          {/* Mobil menü butonu */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Menüyü aç</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                href="/giris"
                className="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 hover:bg-gray-50"
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit"
                className="block pl-3 pr-4 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-500"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 