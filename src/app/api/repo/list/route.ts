import { NextResponse } from 'next/server';
import { getSession } from '@/server/session';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ repoName: null, repos: [] });
  }

  // Fetch all repositories (GitHub API allows up to 100 per page)
  // For users with more than 100 repos, we'd need pagination, but 100 should cover most cases
  const res = await fetch(
    'https://api.github.com/user/repos?per_page=100&affiliation=owner&sort=updated',
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    },
  );
  const repos: Array<{ name: string; html_url: string }> =
    await res.json();

  return NextResponse.json({
    repoName: session.repoName || null,
    repos: repos.map((r) => ({
      name: r.name,
      html_url: r.html_url,
    })),
  });
}
