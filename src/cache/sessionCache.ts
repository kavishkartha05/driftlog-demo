import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });

export async function cacheSession(sessionId: string, userId: string, ttl = 3600): Promise<void> {
  await redis.connect();
  await redis.setEx(`session:${sessionId}`, ttl, userId);
  await redis.disconnect();
}

export async function getCachedSession(sessionId: string): Promise<string | null> {
  await redis.connect();
  const userId = await redis.get(`session:${sessionId}`);
  await redis.disconnect();
  return userId;
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await redis.connect();
  await redis.del(`session:${sessionId}`);
  await redis.disconnect();
}
