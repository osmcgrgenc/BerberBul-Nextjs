'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, User, Scissors } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData)
  }

  return (
    <section className="container mx-auto px-4 py-16 space-y-16">
      {/* İletişim Formu */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-lg text-gray-600">
            Sorularınız için bize ulaşın, size yardımcı olmaktan mutluluk duyarız.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Adınız
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Adınız Soyadınız"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta Adresiniz
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="ornek@email.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Mesajınız
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors min-h-[120px]"
              placeholder="Size nasıl yardımcı olabiliriz?"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 group"
          >
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            Mesaj Gönder
          </button>
        </form>
      </div>

      {/* Kayıt Butonları */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hemen Ücretsiz Kayıt Olun
          </h2>
          <p className="text-lg text-gray-600">
            İster müşteri olun, ister berber. BerberBul ile randevu sistemini dijitalleştirin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/musteri-kayit"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition-colors border border-gray-200 group"
          >
            <User className="w-5 h-5 text-teal-600 transition-transform group-hover:scale-110" />
            Müşteri Olarak Kayıt Ol
          </Link>
          <Link
            href="/berber-kayit"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors group"
          >
            <Scissors className="w-5 h-5 transition-transform group-hover:scale-110" />
            Berber Olarak Kayıt Ol
          </Link>
        </div>
      </div>
    </section>
  )
} 