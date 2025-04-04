interface RatingProps {
  value: number;
  max?: number;
}

export default function Rating({ value, max = 5 }: RatingProps) {
  return (
    <div className="flex text-orange-400">
      {[...Array(max)].map((_, index) => (
        <span key={index}>
          {index < Math.floor(value) ? '★' : index < value ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
} 