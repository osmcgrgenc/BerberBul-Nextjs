'use client'

import { useEffect } from 'react'
import { ErrorCard } from './error-card'
import { ErrorActions } from './error-actions'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps) {
  useEffect(() => {
    // Hata loglama servisi burada entegre edilebilir
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <ErrorCard 
          title={error.name} 
          message={error.message || 'Beklenmeyen bir hata oluştu.'} 
        />
        <ErrorActions reset={reset} />
      </div>
    </div>
  )
} 