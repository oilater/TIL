import { cookies } from 'next/headers';
import './globals.css';
import ConnectRepoPage from './repo/components/ConnectPage';
import WritePage from './repo/components/WritePage';
import { getSession } from './server/session';

export default async function Home() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return <ConnectRepoPage />;
  }

  const session = await getSession(sessionId);
  const hasRepoConnected = session?.repoName != null;

  return hasRepoConnected ? <WritePage /> : <ConnectRepoPage />;
}
