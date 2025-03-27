'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Barber {
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

interface BerberMapProps {
  barbers: Barber[]
}

const BerberMap = ({ barbers }: BerberMapProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    // Kullanıcının konumunu al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Konum alınamadı:', error)
          setLocationError('Konumunuz alınamadı')
          // İstanbul merkezi varsayılan konum olarak kullanılacak
          setUserLocation({ lat: 41.0082, lng: 28.9784 })
        }
      )
    } else {
      setLocationError('Tarayıcınız konum özelliğini desteklemiyor')
      // İstanbul merkezi varsayılan konum olarak kullanılacak
      setUserLocation({ lat: 41.0082, lng: 28.9784 })
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current && userLocation) {
      // Haritayı başlat
      const map = L.map('map').setView([userLocation.lat, userLocation.lng], 13)
      mapRef.current = map

      // OpenStreetMap katmanını ekle
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Özel marker ikonunu oluştur
      const icon = L.icon({
        iconUrl: '/marker-icon.png',
        iconRetinaUrl: '/marker-icon-2x.png',
        shadowUrl: '/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      // Kullanıcı konumunu ekle
      const userIcon = L.icon({
        iconUrl: '/user-marker.png', // Bu ikonu oluşturacağız
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })

      L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
      })
        .addTo(map)
        .bindPopup('Konumunuz')
        .openPopup()

      // Berberleri haritaya ekle
      barbers.forEach((barber) => {
        const marker = L.marker([barber.latitude, barber.longitude], {
          icon,
        }).addTo(map)

        // Popup içeriğini oluştur
        const popupContent = `
          <div class="p-2">
            <h3 class="font-semibold">${barber.shopName}</h3>
            <p class="text-sm text-gray-600">${barber.address}</p>
            ${
              barber.rating !== null
                ? `<div class="mt-1">
                    <span class="text-yellow-400">★</span>
                    <span class="text-gray-700">${barber.rating.toFixed(1)}</span>
                   </div>`
                : ''
            }
            <a href="/berber/${
              barber.id
            }" class="mt-2 inline-block text-blue-500 hover:text-blue-700">
              Detayları Gör
            </a>
          </div>
        `

        marker.bindPopup(popupContent)
      })
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [barbers, userLocation])

  if (locationError) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
        {locationError}
      </div>
    )
  }

  return <div id="map" className="h-full w-full" />
}

export default BerberMap 