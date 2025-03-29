import BerberDetayClient from '@/components/berber-detay/BerberDetayClient'

interface PageProps {
  params: { id: string }
}

export default function BerberDetayPage({ params }: PageProps) {
  return <BerberDetayClient id={params.id} />
} 