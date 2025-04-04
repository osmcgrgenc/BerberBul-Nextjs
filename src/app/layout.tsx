import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "@/components/providers/Providers";

// Font yüklemesini optimize etmek için preload kullanımı
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true 
});

export const metadata: Metadata = {
  title: "BerberBul - Online Berber Randevu Sistemi",
  description: "Konumunuza en yakın berberleri bulun, online randevu alın. Sadece 100₺/ay.",
  keywords: "berber, randevu, online randevu, berber bul",
  authors: [{ name: "BerberBul" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1F7A8C"
};

interface LayoutProps {
  children: React.ReactNode;
  error?: React.ReactNode;
}

// Layout bileşenini Single Responsibility Principle'a uygun olarak ayırıyoruz
export default async function RootLayout({ children, error }: LayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="tr" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Providers session={session}>
          <Navbar />
          <div className="container mx-auto px-4">
            {error || children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
