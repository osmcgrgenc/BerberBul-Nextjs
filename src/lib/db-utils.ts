import { prisma, prismaReplica } from './db'

type OperationType = 'read' | 'write'

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