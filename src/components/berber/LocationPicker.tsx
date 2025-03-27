'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface LocationPickerProps {
  initialLocation: {
    lat: number
    lng: number
  }
  onLocationSelect: (location: { lat: number; lng: number }) => void
}

const LocationPicker = ({ initialLocation, onLocationSelect }: LocationPickerProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      // Haritayı başlat
      const map = L.map('map').setView([initialLocation.lat, initialLocation.lng], 13)
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

      // İlk markeri ekle
      const marker = L.marker([initialLocation.lat, initialLocation.lng], {
        draggable: true,
        icon,
      }).addTo(map)
      markerRef.current = marker

      // Marker sürüklendiğinde konumu güncelle
      marker.on('dragend', () => {
        const position = marker.getLatLng()
        onLocationSelect({ lat: position.lat, lng: position.lng })
      })

      // Haritaya tıklandığında markeri taşı
      map.on('click', (e) => {
        marker.setLatLng(e.latlng)
        onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng })
      })
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }
    }
  }, [initialLocation.lat, initialLocation.lng, onLocationSelect])

  return <div id="map" className="h-[400px] w-full rounded-lg" />
}

export default LocationPicker 