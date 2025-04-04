export interface Service {
  id: string
  name: string
  price: number
  duration: number
}

export interface WorkingHour {
  id: string
  day: number
  dayOfWeek: number
  startTime: string
  endTime: string
  isOpen: boolean
}

export interface Review {
  id: string
  comment: string
  rating: number
  createdAt: string
  customer: {
    user: {
      name: string | null
    }
  }
}

export interface Barber {
  id: string
  shopName: string
  city: string
  district: string
  neighborhood: string
  address: string
  description: string | null
  photos?: string[]
  latitude: number
  longitude: number
  phone: string
  rating: number | null
  reviews: Review[]
  services: Service[]
  workingHours: WorkingHour[]
}

export interface BarberLocation {
  id: string
  shopName: string
  description: string | null
  address: string
  city: string
  district: string
  neighborhood: string
  latitude: number
  longitude: number
  rating: number | null
}

export interface Berber extends Omit<Barber, 'neighborhood' | 'address' | 'latitude' | 'longitude' | 'reviews' | 'workingHours'> {
  neighborhood?: string
  address?: string
  latitude?: number
  longitude?: number
  reviews: Array<{
    id: string
    comment: string
    rating: number
    createdAt: string
    customer: {
      id: string
      firstName: string
      lastName: string
    }
  }>
  workingHours: Array<{
    id: string
    day: number
    dayOfWeek: string
    startTime: string
    endTime: string
    isOpen: boolean
  }>
} 