import { Star } from 'lucide-react'
import Link from 'next/link'
import { Barber } from '@prisma/client'

interface BerberCardProps {
  berber: Barber & {
    averageRating: number
    reviewCount: number
  }
}

export default function BerberCard({ berber }: BerberCardProps) {
  return (
    <Link
      href={`/randevu-al/${berber.id}`}
      className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{berber.shopName}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{berber.address}</p>
        </div>
        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-blue-700">
            {berber.averageRating?.toFixed(1) ?? '0.0'}
          </span>
          <span className="text-xs text-blue-600">({berber.reviewCount || 0})</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-600">{berber.district}, {berber.city}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-gray-600">{berber.phone}</span>
        </div>
      </div>
    </Link>
  )
} 