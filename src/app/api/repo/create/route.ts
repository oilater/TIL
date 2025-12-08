import { cookies } from 'next/headers';
import { getSession } from '@/app/server/session';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  console.log('repo/create - Session ID', sessionId);
  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
    });
  }

  const session = await getSession(sessionId);
  if (!session)
    return new Response(JSON.stringify({ error: 'Invalid session' }), {
      status: 401,
    });

  const { repoName } = await request.json();

  const createRepoResponse = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: 'application/vnd.github+json',
    },
    body: JSON.stringify({
      name: repoName,
      private: true,
    }),
  });

  const data = await createRepoResponse.json();
  return new Response(JSON.stringify(data), {
    status: createRepoResponse.status,
  });
}
