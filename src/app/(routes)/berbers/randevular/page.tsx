'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

interface Appointment {
  id: string
  customerId: string
  customer: {
    user: {
      name: string
      email: string
    }
  }
  serviceId: string
  service: {
    name: string
    duration: number
    price: number
  }
  date: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
}

export default function AppointmentsPage() {
  const { data: session } = useSession()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/berber/randevular')
      if (response.ok) {
        const data = await response.json()
        setAppointments(data)
      }
    } catch (error) {
      console.error('Randevular yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    try {
      const response = await fetch(`/api/berber/randevular/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Randevu durumu güncellenirken hata:', error)
    }
  }

  const getStatusBadgeColor = (status: Appointment['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'PENDING':
        return 'Beklemede'
      case 'CONFIRMED':
        return 'Onaylandı'
      case 'CANCELLED':
        return 'İptal Edildi'
      case 'COMPLETED':
        return 'Tamamlandı'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Randevularım</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.customer.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.customer.user.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <span className="font-medium text-gray-900 mr-2">
                        Hizmet:
                      </span>
                      {appointment.service.name}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      <span className="font-medium text-gray-900 mr-2">
                        Tarih:
                      </span>
                      {format(new Date(appointment.date), 'PPpp', { locale: tr })}
                    </p>
                  </div>
                </div>
                {appointment.status === 'PENDING' && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, 'CONFIRMED')
                      }
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, 'CANCELLED')
                      }
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      İptal Et
                    </button>
                  </div>
                )}
                {appointment.status === 'CONFIRMED' && (
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, 'COMPLETED')
                      }
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Tamamlandı
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 