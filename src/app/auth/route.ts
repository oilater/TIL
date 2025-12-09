import { NextResponse } from 'next/server';
import { __PROD__ } from '@/constant';

const origin = __PROD__
  ? (process.env.ORIGIN_SERVER_URL ?? 'https://localhost:3000')
  : 'https://localhost:3000';

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'GitHub OAuth configuration is missing' },
      { status: 500 },
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo read:user user:email',
  });

  const githubAuthURL = `https://github.com/login/oauth/authorize?${params.toString()}`;

  const response = NextResponse.redirect(githubAuthURL);
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET');
  return response;
}
