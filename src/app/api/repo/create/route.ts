import { cookies } from 'next/headers';
import { getSession } from '@/app/server/session';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;

    if (!sessionId) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const session = await getSession(sessionId);
    if (!session) {
      return Response.json({ error: 'Invalid session' }, { status: 401 });
    }

    const body = await request.json();
    const { repoName } = body;

    if (!repoName || typeof repoName !== 'string' || repoName.trim() === '') {
      return Response.json({ error: 'Repository name is required' }, { status: 400 });
    }

    const createRepoResponse = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        name: repoName.trim(),
        private: true,
      }),
    });

    const data = await createRepoResponse.json();

    if (!createRepoResponse.ok) {
      return Response.json(
        { error: data.message || 'Failed to create repository' },
        { status: createRepoResponse.status }
      );
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.error('Repository creation error:', error);
    return Response.json({ error: 'Failed to create repository' }, { status: 500 });
  }
}
