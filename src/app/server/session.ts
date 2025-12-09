import { getRedisClient } from './redis';

type Session = {
  sessionId: string;
  accessToken: string;
  userId: string;
  expiresAt: number;
};

const PREFIX = 'session:';
const SESSION_TTL = 7 * 24 * 60 * 60;

export async function saveSession(session: Session) {
  try {
    const redis = getRedisClient();
    const key = `${PREFIX}${session.sessionId}`;
    await redis.set(key, JSON.stringify(session), { ex: SESSION_TTL });
  } catch (error) {
    console.error('Failed to save session:', error);
    throw error;
  }
}

export async function getSession(sessionId: string): Promise<Session | null> {
  try {
    const redis = getRedisClient();
    const key = `${PREFIX}${sessionId}`;
    const data = await redis.get<string>(key);

    if (!data) return null;

    const session = JSON.parse(data) as Session;

    if (session.expiresAt < Date.now()) {
      await redis.del(key);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}
