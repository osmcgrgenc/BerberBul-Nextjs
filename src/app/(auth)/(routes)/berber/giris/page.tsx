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

export default function BarberLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/berber/profil'
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
        role: 'BARBER',
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
      title="Berber Girişi"
      subtitle={
        <>
          Hesabınız yok mu?{' '}
          <Link
            href="/berber/kayit"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Hemen kaydolun
          </Link>
        </>
      }
    >
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          👋 Tekrar Hoş Geldiniz!
        </h3>
        <p className="text-sm text-blue-700">
          İşletmenizi dijital dünyada büyütmeye devam edin. Premium özellikleri keşfetmek için giriş yapın.
        </p>
      </div>

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

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/berber/sifremi-unuttum"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Şifremi Unuttum
            </Link>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
          <p className="font-medium">Premium Özellikler:</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Online Randevu</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Müşteri Yönetimi</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>İstatistikler</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Promosyonlar</span>
            </div>
          </div>
        </div>

        <SubmitButton label="Giriş Yap" isLoading={isLoading} />
      </form>
    </AuthCard>
  )
} 