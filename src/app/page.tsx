'use client';

import './globals.css';
import ConnectRepoPage from './repo/components/ConnectPage';
import WritePage from './repo/components/WritePage';
import { useRepos } from './repo/hooks/query/useRepos';

export default function Home() {
  const { data: repo, isLoading } = useRepos();
  const hasRepoConnected = repo?.repoName !== null;

  if (isLoading) {
    return (
      <main>
        <div>Loading...</div>
      </main>
    );
  }

  return hasRepoConnected ? <WritePage /> : <ConnectRepoPage />;
}
