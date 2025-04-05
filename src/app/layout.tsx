import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'

// Font yüklemesini optimize etmek için preload kullanımı
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true 
});

export const metadata: Metadata = {
  metadataBase: new URL('https://berberbul.com'),
  title: 'BerberBul - Berber Randevu Sistemi',
  description: 'Size en yakın berberi bulun, kolayca randevu alın',
  keywords: ['berber', 'randevu', 'online randevu', 'kuaför', 'saç kesimi', 'tıraş'],
  authors: [{ name: 'BerberBul' }],
  creator: 'BerberBul',
  publisher: 'BerberBul',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'BerberBul',
    title: 'BerberBul - Online Berber Randevu Sistemi',
    description: 'Size en yakın berberi bulun, online randevu alın.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BerberBul',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BerberBul - Online Berber Randevu Sistemi',
    description: 'Size en yakın berberi bulun, online randevu alın.',
    images: ['/twitter-image.png'],
    creator: '@berberbul',
  },
  verification: {
    google: 'Google Search Console doğrulama kodu',
    yandex: 'Yandex Webmaster doğrulama kodu',
  },
  alternates: {
    canonical: 'https://berberbul.com',
    languages: {
      'tr-TR': 'https://berberbul.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface LayoutProps {
  children: React.ReactNode;
  error?: React.ReactNode;
}

// Layout bileşenini Single Responsibility Principle'a uygun olarak ayırıyoruz
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
