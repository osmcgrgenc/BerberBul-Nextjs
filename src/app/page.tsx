import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/home/Hero'), {
  loading: () => <div className="h-[600px] bg-gray-100 animate-pulse" />
})

const Features = dynamic(() => import('@/components/home/Features'), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse" />
})

const CTA = dynamic(() => import('@/components/home/CTA'), {
  loading: () => <div className="h-[300px] bg-gray-100 animate-pulse" />
})

const Contact = dynamic(() => import('@/components/home/Contact'), {
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse" />
})

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
