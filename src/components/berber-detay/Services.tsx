import { Service } from '@/types/berber'

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Hizmetler</h2>
      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex justify-between items-center py-2 border-b last:border-0"
          >
            <div>
              <h3 className="font-medium">{service.name}</h3>
              <p className="text-sm text-gray-500">
                {service.duration} dakika
              </p>
            </div>
            <span className="font-medium">
              {service.price.toFixed(2)} ₺
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 