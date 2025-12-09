import { Infer, number, object, string, type } from 'superstruct';
import { getRedisClient } from './redis';

const SessionStruct = object({
  sessionId: string(),
  accessToken: string(),
  userId: number(),
  expiresAt: number(),
});

type Session = Infer<typeof SessionStruct>;

const PREFIX = 'session:';
const SESSION_TTL = 7 * 24 * 60 * 60;

export async function saveSession(session: Session) {
  try {
    const redis = getRedisClient();
    const key = `${PREFIX}${session.sessionId}`;
    await redis.set(key, JSON.stringify(session), {
      ex: SESSION_TTL,
    });
  } catch (error) {
    console.error('Failed to save session:', error);
    throw error;
  }
}

export async function getSession(
  sessionId: string,
): Promise<Session | null> {
  try {
    const redis = getRedisClient();
    const key = `${PREFIX}${sessionId}`;
    const sessionData = await redis.get(key);

    if (!sessionData) return null;
    const session = SessionStruct.create(sessionData);

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
