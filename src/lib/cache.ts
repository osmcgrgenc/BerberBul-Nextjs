import { LRUCache } from 'lru-cache'

const cache = new LRUCache({
  max: 500, // maksimum önbellek boyutu
  ttl: 1000 * 60 * 5, // 5 dakika
})

export const getCache = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  const cached = cache.get(key) as T | undefined
  if (cached) return cached

  const data = await fetcher()
  cache.set(key, data)
  return data
}

export const invalidateCache = (key: string) => {
  cache.delete(key)
} 