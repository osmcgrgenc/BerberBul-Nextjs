'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthCard from '@/components/auth/AuthCard'
import FormInput from '@/components/auth/FormInput'
import SubmitButton from '@/components/auth/SubmitButton'

interface RegisterForm {
  name: string
  email: string
  password: string
  phone: string
}

export default function CustomerRegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>()

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          role: 'CUSTOMER',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Kayıt işlemi başarısız oldu')
      }

      router.push('/musteri/giris')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Müşteri Hesabı Oluştur"
      subtitle={
        <>
          Zaten hesabınız var mı?{' '}
          <Link
            href="/musteri/giris"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Giriş yapın
          </Link>
        </>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <FormInput
          id="name"
          label="Ad Soyad"
          type="text"
          register={register}
          error={errors.name?.message}
          autoComplete="name"
          placeholder="Adınız Soyadınız"
        />

        <FormInput
          id="email"
          label="E-posta"
          type="email"
          register={register}
          error={errors.email?.message}
          autoComplete="email"
          placeholder="ornek@email.com"
        />

        <FormInput
          id="password"
          label="Şifre"
          type="password"
          register={register}
          error={errors.password?.message}
          autoComplete="new-password"
          placeholder="••••••••"
        />

        <FormInput
          id="phone"
          label="Telefon"
          type="tel"
          register={register}
          error={errors.phone?.message}
          autoComplete="tel"
          placeholder="05XX XXX XX XX"
          required={false}
        />

        <SubmitButton label="Hesap Oluştur" isLoading={isLoading} />
      </form>
    </AuthCard>
  )
} 