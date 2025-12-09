import { cookies } from 'next/headers';
import { getSession, saveSession } from '@/app/server/session';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401 },
      );
    }

    const session = await getSession(sessionId);
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Invalid session' }),
        { status: 401 },
      );
    }

    const { repoName } = await request.json();
    if (!repoName || typeof repoName !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Repository name is required' }),
        { status: 400 },
      );
    }

    const listRes = await fetch('https://api.github.com/user/repos', {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
    const repos: Array<{ name: string }> = await listRes.json();

    const existingRepo = repos.find(
      (r) => r.name === repoName.trim(),
    );

    if (existingRepo) {
      session.repoName = repoName.trim();
      await saveSession(session);
      return new Response(
        JSON.stringify({ action: 'connect', repo: existingRepo }),
        { status: 200 },
      );
    }

    const createRes = await fetch(
      'https://api.github.com/user/repos',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/vnd.github+json',
        },
        body: JSON.stringify({
          name: repoName.trim(),
          private: true,
        }),
      },
    );
    const data = await createRes.json();
    if (!createRes.ok) {
      return new Response(
        JSON.stringify({
          error: data.message || 'Failed to create repository',
        }),
        { status: createRes.status },
      );
    }

    session.repoName = repoName.trim();
    await saveSession(session);

    return new Response(
      JSON.stringify({ action: 'create', repo: data }),
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 },
    );
  }
}
