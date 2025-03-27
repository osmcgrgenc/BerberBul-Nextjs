'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AuthCard from '@/components/auth/AuthCard'
import FormInput from '@/components/auth/FormInput'
import SubmitButton from '@/components/auth/SubmitButton'

interface LoginForm {
  email: string
  password: string
}

export default function CustomerLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/berber-bul'
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        role: 'CUSTOMER',
        redirect: false,
      })

      if (result?.error) {
        setError('Geçersiz e-posta veya şifre')
        return
      }

      router.push(callbackUrl)
    } catch {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Müşteri Girişi"
      subtitle={
        <>
          Hesabınız yok mu?{' '}
          <Link
            href="/musteri/kayit"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Hemen kaydolun
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
          autoComplete="current-password"
          placeholder="••••••••"
        />

        <SubmitButton label="Giriş Yap" isLoading={isLoading} />
      </form>
    </AuthCard>
  )
} 