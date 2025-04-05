import LRUCache from 'lru-cache'

// Cache istatistikleri için interface
interface CacheStats {
  size: number
  hits: number
  misses: number
}

// Cache instance'ları ve istatistikleri
const cacheStats: Record<string, CacheStats> = {
  default: { size: 0, hits: 0, misses: 0 },
  longTerm: { size: 0, hits: 0, misses: 0 },
  shortTerm: { size: 0, hits: 0, misses: 0 },
}

const caches = {
  default: new LRUCache<string, unknown>({
    max: 500,
    ttl: 1000 * 60 * 5, // 5 dakika
  }),
  longTerm: new LRUCache<string, unknown>({
    max: 100,
    ttl: 1000 * 60 * 60, // 1 saat
  }),
  shortTerm: new LRUCache<string, unknown>({
    max: 1000,
    ttl: 1000 * 30, // 30 saniye
  }),
}

type CacheType = keyof typeof caches

export const getCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  cacheType: CacheType = 'default'
): Promise<T> => {
  const cache = caches[cacheType]
  const cached = cache.get(key) as T | undefined

  if (cached) {
    cacheStats[cacheType].hits++
    return cached
  }

  cacheStats[cacheType].misses++
  const data = await fetcher()
  cache.set(key, data)
  cacheStats[cacheType].size = cache.size
  return data
}

export const invalidateCache = (key: string, cacheType?: CacheType) => {
  if (cacheType) {
    caches[cacheType].delete(key)
    cacheStats[cacheType].size = caches[cacheType].size
  } else {
    // Tüm cache'leri temizle
    Object.entries(caches).forEach(([type, cache]) => {
      cache.delete(key)
      cacheStats[type].size = cache.size
    })
  }
}

// Cache istatistiklerini al
export const getCacheStats = () => {
  return Object.entries(caches).reduce((acc, [type, cache]) => {
    acc[type as CacheType] = {
      size: cache.size,
      hits: cacheStats[type].hits,
      misses: cacheStats[type].misses,
    }
    return acc
  }, {} as Record<CacheType, CacheStats>)
} 