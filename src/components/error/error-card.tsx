'use client'

import { AlertCircle } from 'lucide-react'

interface ErrorCardProps {
  title?: string
  message?: string
  className?: string
}

export function ErrorCard({
  title = 'Bir şeyler yanlış gitti',
  message = 'Üzgünüz, bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
  className,
}: ErrorCardProps) {
  return (
    <div className={`rounded-lg border border-red-200 bg-red-50 p-6 ${className}`}>
      <div className="flex items-center gap-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <div>
          <h3 className="text-lg font-semibold text-red-800">{title}</h3>
          <p className="mt-2 text-sm text-red-600">{message}</p>
        </div>
      </div>
    </div>
  )
} 