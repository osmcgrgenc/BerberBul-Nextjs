'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import type { LatLng } from 'leaflet'
import { Barber } from '@prisma/client'
import 'leaflet/dist/leaflet.css'

interface BerberWithRating extends Barber {
  averageRating: number
  reviewCount: number
}

interface LeafletMapProps {
  berberler: BerberWithRating[]
}

function RecenterMap({ berberler }: LeafletMapProps) {
  const map = useMap()
  const [L, setL] = useState<typeof import('leaflet')>()

  useEffect(() => {
    import('leaflet').then(setL)
  }, [])

  useEffect(() => {
    if (!L || berberler.length === 0) return

    const bounds = L.latLngBounds(
      berberler.map((berber) => [berber.latitude, berber.longitude] as [number, number])
    )
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [L, berberler, map])

  return null
}

function LocationMarker() {
  const map = useMap()
  const [L, setL] = useState<typeof import('leaflet')>()
  const [position, setPosition] = useState<LatLng | null>(null)

  useEffect(() => {
    import('leaflet').then(setL)
  }, [])

  useEffect(() => {
    if (!L) return

    map.locate().on('locationfound', (e: { latlng: LatLng }) => {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 13)
    })
  }, [L, map])

  if (!L || !position) return null

  return (
    <Marker
      position={position}
      icon={
        new L.Icon({
          iconUrl: '/user-marker.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })
      }
    >
      <Popup>Konumunuz</Popup>
    </Marker>
  )
}

export default function LeafletMap({ berberler }: LeafletMapProps) {
  const defaultCenter = { lat: 41.0082, lng: 28.9784 } // İstanbul
  const [L, setL] = useState<typeof import('leaflet')>()

  useEffect(() => {
    import('leaflet').then(setL)
  }, [])

  if (!L) return null

  return (
    <MapContainer
      center={[defaultCenter.lat, defaultCenter.lng]}
      zoom={11}
      className="w-full h-full rounded-xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />
      <RecenterMap berberler={berberler} />

      {berberler.map((berber) => (
        <Marker
          key={berber.id}
          position={[berber.latitude, berber.longitude]}
          icon={
            new L.Icon({
              iconUrl: '/barber-marker.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })
          }
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-gray-900">{berber.shopName}</h3>
              <p className="text-sm text-gray-600 mt-1">{berber.address}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-medium">
                  {berber.averageRating?.toFixed(1) ?? '0.0'}
                </span>
                <span className="text-xs text-gray-500">
                  ({berber.reviewCount} yorum)
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
} 