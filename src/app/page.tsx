import { cookies } from 'next/headers';
import './globals.css';
import { getSession } from '../server/session';
import ConnectRepoPage from './repo/components/ConnectPage';
import WritePage from './repo/components/WritePage';

export default async function Home() {
  const session = await getSession();
  const hasRepoConnected = session?.repoName != null;

  return hasRepoConnected ? <WritePage /> : <ConnectRepoPage />;
}
