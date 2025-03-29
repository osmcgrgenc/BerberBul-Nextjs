interface RatingStarsProps {
  rating: number
  size?: 'small' | 'medium' | 'large'
}

export default function RatingStars({ rating, size = 'medium' }: RatingStarsProps) {
  const starSize = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
  }

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`${starSize[size]} ${
            index < Math.round(rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  )
} 