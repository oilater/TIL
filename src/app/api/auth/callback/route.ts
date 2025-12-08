// app/api/auth/github/callback/route.ts

import crypto from 'crypto';
import { saveSession } from '@/app/server/session';

const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const code = searchParams.get('code');
  if (!code) {
    return Response.json({ error: 'No code found' }, { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      return Response.json({ error: 'Failed to get access token' }, { status: 500 });
    }
    
    const { access_token: accessToken } = await tokenResponse.json();
    if (!accessToken) {
      return Response.json({ error: 'No token received' }, { status: 400 });
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!userResponse.ok) {
      return Response.json({ error: 'Failed to get user info' }, { status: 500 });
    }

    const user = await userResponse.json();

    if (!user?.id) {
      return Response.json({ error: 'Invalid user data' }, { status: 500 });
    }

    const sessionId = crypto.randomUUID();

    await saveSession({
      sessionId,
      accessToken,
      userId: user.id,
      expiresAt: Date.now() + SESSION_TTL,
    });

    const redirectUrl = new URL('/', request.url);

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl.toString(),
        'Cache-Control': 'no-store',
        'Set-Cookie': `session=${sessionId}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_TTL / 1000}`
      },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return Response.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
