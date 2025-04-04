import { PrismaClient } from '@prisma/client'

// Singleton pattern ile PrismaClient örneği oluştur
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

// Replica için ayrı bir client
const prismaReplicaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_REPLICA_URL,
      },
    },
  })
}

// Global scope'da client'ları tanımla
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
  var prismaReplica: undefined | ReturnType<typeof prismaReplicaClientSingleton>
}

// Client'ları oluştur veya mevcut olanı kullan
const prisma = globalThis.prisma ?? prismaClientSingleton()
const prismaReplica = globalThis.prismaReplica ?? prismaReplicaClientSingleton()

// Development ortamında hot reload'u destekle
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
  globalThis.prismaReplica = prismaReplica
}

export { prisma, prismaReplica } 