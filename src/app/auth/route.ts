export async function GET() {
  const githubAuthURL =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_REDIRECT_URI}` +
    `&scope=read:user user:email`;

  return Response.redirect(githubAuthURL);
}
