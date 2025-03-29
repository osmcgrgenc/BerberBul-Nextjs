import { Review } from '@/types/berber'
import RatingStars from './RatingStars'

interface ReviewsProps {
  reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Yorumlar</h2>
      {reviews.length > 0 ? (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b last:border-0 pb-4 last:pb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  {review.customer.user.name || 'Müşteri'}
                </span>
                <RatingStars rating={review.rating} size="small" />
              </div>
              {review.comment && (
                <p className="text-gray-600">{review.comment}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {new Date(review.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Henüz yorum yapılmamış.</p>
      )}
    </div>
  )
} 