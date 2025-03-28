'use client'

import { RefreshCcw, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ErrorActionsProps {
  reset?: () => void
  className?: string
}

export function ErrorActions({ reset, className }: ErrorActionsProps) {
  const router = useRouter()

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {reset && (
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
        >
          <RefreshCcw className="h-4 w-4" />
          Tekrar Dene
        </button>
      )}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        <Home className="h-4 w-4" />
        Ana Sayfaya Dön
      </button>
    </div>
  )
} 