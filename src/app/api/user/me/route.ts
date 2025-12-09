import { cookies } from 'next/headers';
import { getSession } from '@/app/server/session';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;

    if (!sessionId) {
      return Response.json(
        { error: 'Not authenticated' },
        { status: 401 },
      );
    }

    const session = await getSession(sessionId);
    if (!session) {
      return Response.json(
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
      return Response.json(
        { error: 'Failed to get user info' },
        { status: 500 },
      );
    }

    const user = await userResponse.json();

    return Response.json({
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return Response.json(
      { error: 'Failed to get user info' },
      { status: 500 },
    );
  }
}
