// lib/rateLimit.ts
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import {env} from '@/lib/env'
import { webcrypto } from 'node:crypto';

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

// Configure strict window parameters: max 3 entries per 60 seconds
export const contactRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '5 m'), 
  analytics: true,
  prefix: 'ratelimit:contact',
});

// ⚡ ADD THIS: Dedicated limiter for reservations
export const reservationRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '5 m'), // 3 reservations per 5 minutes
  analytics: true,
  prefix: 'ratelimit:reservation',
});

// Universal Web Crypto reference (works on Node 18, Node 20+, and Edge runtimes)
const cryptoImpl = globalThis.crypto ?? webcrypto;

/**
 * Encrypts raw tracking metadata using standard browser/server Web Crypto digest.
 */
async function hashIp(ip: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(ip);
  const hashBuffer = await cryptoImpl.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Extracts, parses, and hashes multi-layered IP proxy networks.
 * Aborts connection safely on unidentifiable production targets.
 */
export async function getClientIpHash(headers: Headers): Promise<string> {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  
  let rawIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp?.trim();

  if (!rawIp) {
    if (env.NODE_ENV === 'production') {
      throw new Error('Untrusted network connection: Missing identifying IP headers.');
    }
    rawIp = '127.0.0.1';
  }
  
  return hashIp(rawIp);
}