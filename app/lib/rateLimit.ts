// Simple in-memory rate limiter for API routes
interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute window
  maxRequests: 5, // max 5 requests per window
};

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown';
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = store[ip];

  // Clean up old records
  if (record && record.resetTime <= now) {
    delete store[ip];
  }

  // Create new record if doesn't exist
  if (!store[ip]) {
    store[ip] = {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    };
    return { allowed: true };
  }

  // Check if limit exceeded
  if (store[ip].count >= RATE_LIMIT.maxRequests) {
    const retryAfter = Math.ceil((store[ip].resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Increment counter
  store[ip].count += 1;
  return { allowed: true };
}

// Cleanup expired records every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((ip) => {
    if (store[ip].resetTime <= now) {
      delete store[ip];
    }
  });
}, 5 * 60 * 1000);
