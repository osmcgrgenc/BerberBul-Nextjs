import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BerberBul",
  description: "Online berber randevu sistemi",
};

export default async function RootLayout({
  children,
  error,
}: {
  children: React.ReactNode;
  error: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="tr">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          {error || children}
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
