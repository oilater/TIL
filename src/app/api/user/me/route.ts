import { NextResponse } from 'next/server';
import { getSession } from '@/server/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 },
      );
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
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

    return NextResponse.json({
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user info' },
      { status: 500 },
    );
  }
}
