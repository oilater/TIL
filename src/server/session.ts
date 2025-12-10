import { cookies } from 'next/headers';
import { Infer, number, object, optional, string } from 'superstruct';
import { getRedisClient } from './redis';

const SessionStruct = object({
  sessionId: string(),
  accessToken: string(),
  userId: string(),
  createdAt: number(),
  expiresAt: number(),
  repoName: optional(string()),
});

type Session = Infer<typeof SessionStruct>;

const PREFIX = 'session:';
const SESSION_TTL = 5 * 24 * 60 * 60; // 5일

export async function createSession(
  sessionData: Omit<Session, 'sessionId' | 'createdAt' | 'expiresAt'>,
) {
  const redis = getRedisClient();
  const sessionId = randomUUID();
  const now = Date.now();
  const expiresAt = now + SESSION_TTL * 1000;

  const session: Session = {
    ...sessionData,
    sessionId,
    createdAt: now,
    expiresAt,
  };

  await redis.set(`${PREFIX}${sessionId}`, JSON.stringify(session), {
    ex: SESSION_TTL,
  });

  return session;
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session');
  const sessionId = cookie?.value;

  if (!sessionId) return null;

  const redis = getRedisClient();
  const raw = await redis.get(`${PREFIX}${sessionId}`);
  if (!raw) return null;

  let session: Session;
  try {
    session = SessionStruct.create(raw);
  } catch {
    await redis.del(`${PREFIX}${sessionId}`);
    return null;
  }

  if (session.expiresAt < Date.now()) {
    await redis.del(`${PREFIX}${sessionId}`);
    return null;
  }

  return session;
}
