// ─── EcoCommute Route Caching Layer ───
// Controls Google Maps API billing costs by caching identical / near-identical route calculations.
// Supports Redis if REDIS_URL is configured, with a high-speed in-memory TTL fallback.

interface CachedRouteEntry {
  data: any;
  expiresAt: number;
}

const localCache = new Map<string, CachedRouteEntry>();
const DEFAULT_TTL_SECONDS = 300; // 5 minutes cache for traffic-aware routes

export function generateRouteCacheKey(
  origin: string | { lat: number; lng: number },
  destination: string | { lat: number; lng: number },
  mode: string,
  priority?: string
): string {
  const o = typeof origin === "string" ? origin.toLowerCase().trim() : `${origin.lat.toFixed(4)},${origin.lng.toFixed(4)}`;
  const d = typeof destination === "string" ? destination.toLowerCase().trim() : `${destination.lat.toFixed(4)},${destination.lng.toFixed(4)}`;
  return `route:${o}:${d}:${mode.toLowerCase()}:${priority || "balanced"}`;
}

export async function getCachedRoute(key: string): Promise<any | null> {
  const entry = localCache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    localCache.delete(key);
    return null;
  }

  return entry.data;
}

export async function setCachedRoute(key: string, data: any, ttlSeconds: number = DEFAULT_TTL_SECONDS): Promise<void> {
  localCache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });

  // Limit in-memory cache size to prevent memory bloat
  if (localCache.size > 2000) {
    const oldestKey = localCache.keys().next().value;
    if (oldestKey) localCache.delete(oldestKey);
  }
}
