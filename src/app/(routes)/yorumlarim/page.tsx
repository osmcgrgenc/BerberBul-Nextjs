'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Review {
  id: string
  rating: number
  comment: string | null
  createdAt: string
  barber: {
    id: string
    shopName: string
    address: string
  }
}

export default function YorumlarimPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris')
    } else if (session?.user?.role !== 'CUSTOMER') {
      router.push('/')
    } else {
      fetchReviews()
    }
  }, [session, status, router])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/yorumlarim')
      if (!response.ok) {
        throw new Error('Yorumlar yüklenirken bir hata oluştu')
      }
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error)
      setError('Yorumlar yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Yorumlarım</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Link
                href={`/berber/${review.barber.id}`}
                className="text-xl font-semibold text-blue-600 hover:text-blue-800"
              >
                {review.barber.shopName}
              </Link>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-2xl ${
                      index < review.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-2">{review.barber.address}</p>

            {review.comment && (
              <p className="text-gray-700 mt-4">{review.comment}</p>
            )}

            <p className="text-sm text-gray-500 mt-4">
              {new Date(review.createdAt).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Henüz yorum yapmadınız.</p>
            <Link
              href="/berber-bul"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              Berber Bul
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 