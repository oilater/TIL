import { serialize } from 'cookie';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { __PROD__ } from '@/constant';
import { createSession, getSession } from '@/server/session';

const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');
  if (!code) {
    return NextResponse.json(
      { error: 'No code found' },
      { status: 400 },
    );
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 },
    );
  }

  try {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      },
    );

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get access token' },
        { status: 500 },
      );
    }

    const { access_token: accessToken } = await tokenResponse.json();
    if (!accessToken) {
      return NextResponse.json(
        { error: 'No token received' },
        { status: 400 },
      );
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get user info' },
        { status: 500 },
      );
    }

    const user = await userResponse.json();
    if (!user) {
      return NextResponse.json(
        { error: 'No User Exists' },
        { status: 404 },
      );
    }

    if (!user?.id) {
      return NextResponse.json(
        { error: 'Invalid user data' },
        { status: 500 },
      );
    }

    const sessionId = nanoid();
    let session = await getSession();

    if (!session) {
      session = await createSession({
        accessToken,
        userId: user.id,
      });
    }

    const redirectUrl = new URL('/', request.url);

    const cookie = serialize('session', sessionId, {
      httpOnly: true,
      secure: __PROD__,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL / 1000,
    });

    return NextResponse.redirect(redirectUrl, {
      headers: {
        'Cache-Control': 'no-store',
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
