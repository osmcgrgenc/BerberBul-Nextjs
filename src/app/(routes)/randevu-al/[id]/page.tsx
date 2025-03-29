import { Metadata } from 'next'
import BerberDetayClient from '@/components/berber-detay/BerberDetayClient'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const barber = await prisma.barber.findUnique({
    where: { id: params.id },
    select: {
      shopName: true,
      description: true,
      city: true,
      district: true,
    },
  })

  if (!barber) {
    return {
      title: 'Berber Bulunamadı | BerberBul',
      description: 'Aradığınız berber bulunamadı.',
    }
  }

  return {
    title: `${barber.shopName} - ${barber.city}/${barber.district} | BerberBul`,
    description: barber.description || `${barber.shopName} - ${barber.city}/${barber.district} konumunda hizmet veren berber.`,
  }
}

async function getBarber(id: string) {
  const barber = await prisma.barber.findUnique({
    where: { id },
    include: {
      services: {
        select: {
          id: true,
          name: true,
          duration: true,
          price: true,
        },
      },
      workingHours: {
        select: {
          id: true,
          dayOfWeek: true,
          startTime: true,
          endTime: true,
          isOpen: true,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          customer: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!barber) {
    notFound()
  }

  return barber
}

export default async function BerberDetayPage({ params }: PageProps) {
  const initialData = await getBarber(params.id)
  
  return <BerberDetayClient id={params.id} initialData={initialData} />
} 