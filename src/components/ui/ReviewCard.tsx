import Rating from './Rating'

interface ReviewCardProps {
  name: string;
  rating: number;
  comment?: string;
  image?: string;
}

export default function ReviewCard({ name, rating, comment, image }: ReviewCardProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          <Rating value={rating} />
        </div>
        {comment && (
          <p className="text-sm text-gray-600 mt-1">{comment}</p>
        )}
      </div>
    </div>
  )
} 