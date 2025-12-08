type Session = {
  sessionId: string;
  accessToken: string;
  userId: string;
  expiresAt: number;
};

const SESSION = globalThis.sessionStorage || {};

export function saveSession(session: Session) {
  SESSION[session.sessionId] = session;
}

export function getSession(sessionId: string) {
  const session = SESSION[sessionId];
  if (!session) return null;
  return session;
}
