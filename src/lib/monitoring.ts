import { NextRequest, NextResponse } from 'next/server'

interface MonitoringData {
  path: string
  method: string
  duration: number
  status: number
  timestamp: Date
}

const monitoringData: MonitoringData[] = []

export const monitorApiCall = async (
  request: NextRequest,
  handler: () => Promise<NextResponse>
) => {
  const startTime = Date.now()
  const path = request.nextUrl.pathname
  const method = request.method

  try {
    const response = await handler()
    const duration = Date.now() - startTime

    // Monitoring verisini kaydet
    monitoringData.push({
      path,
      method,
      duration,
      status: response.status,
      timestamp: new Date(),
    })

    // Eğer yanıt süresi 1 saniyeden uzunsa logla
    if (duration > 1000) {
      console.warn(`Yavaş API yanıtı: ${path} (${duration}ms)`)
    }

    return response
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`API hatası: ${path}`, error)
    
    monitoringData.push({
      path,
      method,
      duration,
      status: 500,
      timestamp: new Date(),
    })

    throw error
  }
}

export const getApiMetrics = () => {
  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

  const recentCalls = monitoringData.filter(
    data => data.timestamp > oneHourAgo
  )

  const averageResponseTime = recentCalls.reduce(
    (acc, curr) => acc + curr.duration,
    0
  ) / (recentCalls.length || 1)

  const slowEndpoints = recentCalls
    .filter(call => call.duration > 1000)
    .map(call => ({
      path: call.path,
      duration: call.duration,
      timestamp: call.timestamp,
    }))

  return {
    totalCalls: recentCalls.length,
    averageResponseTime,
    slowEndpoints,
    errorRate: recentCalls.filter(call => call.status >= 500).length / recentCalls.length,
  }
} 