import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Redis bağlantısı
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Rate limit kuralları
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 saniyede 10 istek
})

export async function rateLimit(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
  const { success, limit, reset, remaining } = await ratelimit.limit(ip)

  const headers = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': reset.toString(),
  }

  if (!success) {
    return new Response(
      JSON.stringify({
        error: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
      }),
      {
        status: 429,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      }
    )
  }

  return { headers }
} 