import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import CTA from '@/components/home/CTA'
import Contact from '@/components/home/Contact'

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50">
      <Hero />
      <Features />
      <CTA />
      <Contact />
    </main>
  )
}
