// app/api/auth/github/callback/route.ts

import crypto from 'crypto';
import { unstable_noStore } from 'next/cache';
import { saveSession } from '@/app/server/session';

export async function GET(request: Request) {
  unstable_noStore();

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) return Response.json({ error: 'No code found' }, { status: 400 });

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token } = await tokenRes.json();
  if (!access_token)
    return Response.json({ error: 'No token' }, { status: 400 });

  // user 정보 가져오기
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  const user = await userRes.json();

  // 세션 생성
  const sessionId = crypto.randomUUID();

  saveSession({
    sessionId,
    accessToken: access_token,
    userId: user.id,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  const redirectUrl = new URL('/', request.url);
  console.log('callback - Session ID', sessionId);

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl.toString(),
      'Set-Cookie': `session=${sessionId}; HttpOnly; Path=/; Max-Age=604800`,
    },
  });
}
