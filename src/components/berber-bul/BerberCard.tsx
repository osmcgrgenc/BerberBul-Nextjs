import dynamic from 'next/dynamic'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { Barber } from '@prisma/client'

// SVG ikonlarını lazy load et
const LocationIcon = dynamic(() => import('@/components/ui/icons/LocationIcon'), {
  loading: () => <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
})

const PhoneIcon = dynamic(() => import('@/components/ui/icons/PhoneIcon'), {
  loading: () => <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
})

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
          <LocationIcon className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{berber.district}, {berber.city}</span>
        </div>
        <div className="flex items-center gap-1">
          <PhoneIcon className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{berber.phone}</span>
        </div>
      </div>
    </Link>
  )
} 