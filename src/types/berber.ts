export interface Service {
  id: string
  name: string
  duration: number
  price: number
}

export interface WorkingHour {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isOpen: boolean
}

export interface Review {
  id: string
  rating: number
  comment: string | null
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
  description: string | null
  address: string
  city: string
  district: string
  neighborhood: string
  latitude: number
  longitude: number
  rating: number | null
  services: Service[]
  workingHours: WorkingHour[]
  reviews: Review[]
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