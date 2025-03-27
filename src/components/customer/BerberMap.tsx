'use client'

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    if (!mapRef.current) {
      // İstanbul'un merkezi
      const center = { lat: 41.0082, lng: 28.9784 }

      // Haritayı başlat
      const map = L.map('map').setView([center.lat, center.lng], 11)
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
  }, [barbers])

  return <div id="map" className="h-full w-full" />
}

export default BerberMap 