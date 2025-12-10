import { NextResponse } from 'next/server';
import { createSession, getSession } from '@/server/session';

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'No Session' },
        { status: 401 }, // 인증 문제이므로 401
      );
    }

    const { repoName } = await request.json();
    if (!repoName || typeof repoName !== 'string') {
      return NextResponse.json(
        { error: 'Repository name is required' },
        { status: 400 },
      );
    }

    const trimmedRepoName = repoName.trim();

    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!userRes.ok) {
      return NextResponse.json(
        { error: 'Failed to get user info' },
        { status: 500 },
      );
    }

    const user = await userRes.json();
    const username = user.login;

    const checkRepoRes = await fetch(
      `https://api.github.com/repos/${username}/${trimmedRepoName}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/vnd.github+json',
        },
      },
    );

    if (checkRepoRes.ok || checkRepoRes.status === 403) {
      const existingRepo = await checkRepoRes.json().catch(() => ({
        name: trimmedRepoName,
        html_url: `https://github.com/${username}/${trimmedRepoName}`,
      }));

      session.repoName = trimmedRepoName;
      await createSession(session);

      return NextResponse.json(
        { action: 'connect', repo: existingRepo },
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
      return NextResponse.json(
        { error: data.message || 'Failed to create repository' },
        { status: createRes.status },
      );
    }

    session.repoName = repoName.trim();
    await createSession(session);

    return NextResponse.json(
      { action: 'create', repo: data },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
