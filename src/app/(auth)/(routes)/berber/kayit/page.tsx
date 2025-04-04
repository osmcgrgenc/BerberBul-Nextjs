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
  shopName: string
  address: string
}

export default function BarberRegisterPage() {
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
          role: 'BARBER',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Kayıt işlemi başarısız oldu')
      }

      router.push('/berber/giris')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Berber Hesabı Oluştur"
      subtitle={
        <>
          Zaten hesabınız var mı?{' '}
          <Link
            href="/berber/giris"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Giriş yapın
          </Link>
        </>
      }
    >
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🎉 Ücretsiz Başlayın!
        </h3>
        <p className="text-sm text-blue-700">
          Hemen ücretsiz kayıt olun ve işletmenizi dijitalleştirmeye başlayın. Premium özellikler için daha sonra abonelik planlarımızı inceleyebilirsiniz.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Ücretsiz Profil</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Konum Bilgisi</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Temel Hizmetler</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>7/24 Destek</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            id="shopName"
            label="İşletme Adı"
            type="text"
            register={register}
            error={errors.shopName?.message}
            placeholder="İşletmenizin Adı"
          />
        </div>

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
        />

        <FormInput
          id="address"
          label="Adres"
          type="text"
          register={register}
          error={errors.address?.message}
          placeholder="İşletmenizin açık adresi"
        />

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
          <p className="font-medium mb-1">Premium Özellikler için Abonelik Gereklidir:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Online Randevu Alma</li>
            <li>Müşteri Yönetimi</li>
            <li>Detaylı İstatistikler</li>
            <li>Özel Promosyonlar</li>
          </ul>
        </div>

        <SubmitButton label="Ücretsiz Hesap Oluştur" isLoading={isLoading} />
      </form>
    </AuthCard>
  )
} 