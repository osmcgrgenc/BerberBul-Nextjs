'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface WorkingHour {
  id?: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isOpen: boolean
}

const DAYS_OF_WEEK = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
]

export default function WorkingHoursPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingDay, setEditingDay] = useState<number | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris')
    } else if (status === 'authenticated' && session.user.role !== 'BARBER') {
      router.push('/')
    } else if (status === 'authenticated') {
      fetchWorkingHours()
    }
  }, [status, session, router])

  const fetchWorkingHours = async () => {
    try {
      const response = await fetch('/api/berber/calisma-saatleri')
      if (response.ok) {
        const data = await response.json()
        if (data.length === 0) {
          const defaultHours = DAYS_OF_WEEK.map((_, index) => ({
            dayOfWeek: index + 1,
            startTime: '09:00',
            endTime: '18:00',
            isOpen: true,
          }))
          setWorkingHours(defaultHours)
        } else {
          setWorkingHours(data)
        }
      }
    } catch (error) {
      console.error('Çalışma saatleri yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateWorkingHours = async (day: number, data: Partial<WorkingHour>) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/berber/calisma-saatleri', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dayOfWeek: day,
          ...data,
        }),
      })

      if (response.ok) {
        fetchWorkingHours()
        setEditingDay(null)
      }
    } catch (error) {
      console.error('Çalışma saatleri güncellenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Çalışma Saatleri
        </h2>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {DAYS_OF_WEEK.map((day, index) => {
            const dayHours = workingHours.find((h) => h.dayOfWeek === index + 1) || {
              dayOfWeek: index + 1,
              startTime: '09:00',
              endTime: '18:00',
              isOpen: true,
            }

            return (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900 w-32">{day}</span>
                    {editingDay === index + 1 ? (
                      <div className="flex items-center space-x-4">
                        <input
                          type="time"
                          defaultValue={dayHours.startTime}
                          onChange={(e) =>
                            updateWorkingHours(index + 1, {
                              startTime: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          defaultValue={dayHours.endTime}
                          onChange={(e) =>
                            updateWorkingHours(index + 1, {
                              endTime: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md shadow-sm px-3 py-2"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-600">
                        {dayHours.isOpen
                          ? `${dayHours.startTime} - ${dayHours.endTime}`
                          : 'Kapalı'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        updateWorkingHours(index + 1, {
                          isOpen: !dayHours.isOpen,
                        })
                      }
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        dayHours.isOpen
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {dayHours.isOpen ? 'Açık' : 'Kapalı'}
                    </button>
                    <button
                      onClick={() =>
                        setEditingDay(editingDay === index + 1 ? null : index + 1)
                      }
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {editingDay === index + 1 ? 'Kaydet' : 'Düzenle'}
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
} 