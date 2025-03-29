import Link from 'next/link'

interface ErrorMessageProps {
  error: string
  backLink?: string
  backText?: string
}

export default function ErrorMessage({
  error,
  backLink,
  backText,
}: ErrorMessageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
        {error}
      </div>
      {backLink && (
        <Link
          href={backLink}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
        >
          ← {backText || 'Geri Dön'}
        </Link>
      )}
    </div>
  )
} 