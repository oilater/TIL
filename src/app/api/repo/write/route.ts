import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSession } from '@/app/server/session';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_HEADERS = {
  Accept: 'application/vnd.github+json',
} as const;

type WriteRequest = {
  title: string;
  content: string;
};

type GitHubUser = {
  login: string;
};

type GitHubFileResponse = {
  commit: {
    sha: string;
    html_url: string;
  };
  message?: string;
};

// Helper functions
const errorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

const getAuthHeaders = (accessToken: string) => ({
  ...GITHUB_HEADERS,
  Authorization: `Bearer ${accessToken}`,
});

const validateString = (
  value: unknown,
  fieldName: string,
): string | null => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

const getTodayDateString = () =>
  new Date().toISOString().split('T')[0];

const encodeContent = (content: string) =>
  Buffer.from(content.trim(), 'utf-8').toString('base64');

const fetchGitHubUser = async (accessToken: string) => {
  const response = await fetch(`${GITHUB_API_BASE}/user`, {
    headers: getAuthHeaders(accessToken),
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  return (await response.json()) as GitHubUser;
};

const createGitHubFile = async (
  username: string,
  repoName: string,
  filePath: string,
  content: string,
  accessToken: string,
) => {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${username}/${repoName}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(accessToken),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: '✨Write Diary',
        content: encodeContent(content),
      }),
    },
  );

  const data = (await response.json()) as GitHubFileResponse;

  if (!response.ok) {
    throw new Error(
      data.message || 'Failed to create file in repository',
    );
  }

  return data;
};

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session')?.value;

    if (!sessionId) {
      return errorResponse('Not authenticated', 401);
    }

    const session = await getSession(sessionId);
    if (!session) {
      return errorResponse('Invalid session', 401);
    }

    if (!session.repoName) {
      return errorResponse('No repository connected', 400);
    }

    const body = (await request.json()) as WriteRequest;
    const titleError = validateString(body.title, 'Title');
    const contentError = validateString(body.content, 'Content');

    if (titleError) return errorResponse(titleError, 400);
    if (contentError) return errorResponse(contentError, 400);

    const user = await fetchGitHubUser(session.accessToken);
    const trimmedTitle = body.title.trim();
    const trimmedContent = body.content.trim();

    const dateStr = getTodayDateString();
    const filePath = `${dateStr}/${trimmedTitle}.md`;

    const fileData = await createGitHubFile(
      user.login,
      session.repoName,
      filePath,
      trimmedContent,
      session.accessToken,
    );

    return NextResponse.json({
      success: true,
      filePath,
      commit: fileData.commit,
    });
  } catch (error) {
    console.error('Write diary error:', error);
    const message =
      error instanceof Error
        ? error.message
        : 'Internal server error';
    return errorResponse(message, 500);
  }
}
