'use client';
import './globals.css';

import ConnectRepoPage from './repo/components/ConnectPage';
import WritePage from './repo/components/WritePage';
import { useRepos } from './repo/hooks/query/useRepos';

export default function Home() {
  const { data: repo, isLoading } = useRepos();

  if (isLoading) {
    return (
      <main>
        <div>로딩 중...</div>
      </main>
    );
  }

  if (repo?.repoName) {
    return (
      <main>
        <WritePage />
      </main>
    );
  }

  return (
    <main>
      <ConnectRepoPage />
    </main>
  );
}
