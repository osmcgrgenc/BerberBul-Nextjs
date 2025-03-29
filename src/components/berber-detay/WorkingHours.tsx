import { WorkingHour } from '@/types/berber'

interface WorkingHoursProps {
  workingHours: WorkingHour[]
}

const dayNames = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
]

export default function WorkingHours({ workingHours }: WorkingHoursProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Çalışma Saatleri</h2>
      <div className="grid gap-2">
        {workingHours
          .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
          .map((hour) => (
            <div
              key={hour.id}
              className="flex justify-between items-center py-2 border-b last:border-0"
            >
              <span className="font-medium">
                {dayNames[hour.dayOfWeek - 1]}
              </span>
              <span className="text-gray-600">
                {hour.isOpen
                  ? `${hour.startTime} - ${hour.endTime}`
                  : 'Kapalı'}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
} 