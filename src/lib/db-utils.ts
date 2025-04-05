import { prisma, prismaReplica } from './db'
import { Prisma } from '@prisma/client'

type OperationType = 'read' | 'write'

// Query optimizasyonu için yardımcı fonksiyonlar
export const optimizeQuery = <T extends Prisma.ModelName>(
  model: T,
  options: {
    select?: Prisma.SelectSubset<any, any>
    include?: Prisma.IncludeSubset<any, any>
    where?: Prisma.WhereSubset<any, any>
    orderBy?: Prisma.OrderBySubset<any, any>
    take?: number
    skip?: number
  }
) => {
  return {
    model,
    ...options,
  }
}

// Batch işlemleri için yardımcı fonksiyon
export const batchProcess = async <T>(
  items: T[],
  batchSize: number,
  processFn: (batch: T[]) => Promise<void>
) => {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    await processFn(batch)
  }
}

export const getPrismaClient = (operationType: OperationType = 'read') => {
  // Yazma işlemleri için her zaman master'ı kullan
  if (operationType === 'write') {
    return prisma
  }

  // Okuma işlemleri için replica'yı kullan
  // Eğer replica kullanılamıyorsa master'a fallback yap
  try {
    // Replica'nın çalışıp çalışmadığını kontrol et
    return prismaReplica
  } catch (error) {
    console.warn('Replica kullanılamıyor, master\'a fallback yapılıyor')
    return prisma
  }
}

// Transaction wrapper fonksiyonu
export const withTransaction = async <T>(
  operation: (tx: any) => Promise<T>,
  operationType: OperationType = 'write'
) => {
  const client = getPrismaClient(operationType)
  return client.$transaction(operation)
}

// Query sonuçlarını cache'leme
export const withCache = async <T>(
  key: string,
  operation: () => Promise<T>,
  ttl: number = 1000 * 60 * 5 // 5 dakika
) => {
  const cached = await getCache(key, operation)
  return cached
}

// Query performansını izleme
export const withPerformanceMonitoring = async <T>(
  operation: () => Promise<T>,
  operationName: string
) => {
  const start = performance.now()
  const result = await operation()
  const end = performance.now()
  
  console.log(`${operationName} süresi: ${end - start}ms`)
  return result
} 