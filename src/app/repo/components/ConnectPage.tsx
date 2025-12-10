'use client';

import { useState } from 'react';
import { useConnectRepo } from '../hooks/mutation/useConnectRepo';
import { useRepos } from '../hooks/query/useRepos';
import {
  button,
  container,
  description,
  error,
  existingRepoInfo,
  input,
  page,
  result,
  title,
} from './ConnectPage.css';
import WritePage from './WritePage';

interface Repo {
  name: string;
  html_url: string;
}

export default function ConnectRepoPage() {
  const [repoName, setRepoName] = useState('');

  const { data: reposData, isLoading: isReposLoading } = useRepos();

  const {
    mutate: handleRepo,
    data,
    isError,
    error: fetchError,
    isPending,
  } = useConnectRepo();

  if (reposData?.repoName && !isReposLoading) {
    return <WritePage />;
  }

  const trimmedName = repoName.trim();
  const targetRepo = reposData?.repos?.find(
    (repo: Repo) =>
      repo.name.toLowerCase() === trimmedName.toLowerCase(),
  );

  const actionText = targetRepo ? 'Connect' : 'Create';
  const existingRepoUrl = targetRepo?.html_url || null;

  const onClick = () => {
    if (repoName) handleRepo(repoName);
  };

  return (
    <main className={page}>
      <div className={container}>
        <h1 className={title}>{actionText} Repository</h1>
        <p className={description}>
          기록을 저장할 레포지토리를 생성해요.
          <br />
          기존 레포지토리도 연결할 수 있어요.
        </p>

        <input
          className={input}
          type="text"
          placeholder="ex) my-work-diary"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          disabled={isPending}
        />

        {existingRepoUrl && (
          <p className={existingRepoInfo}>
            이미 있는 레포지토리네요! {existingRepoUrl}에 연결할까요?
          </p>
        )}

        <button
          className={button}
          onClick={onClick}
          disabled={!repoName || isPending || isReposLoading}
        >
          {isPending ? '' : actionText}
        </button>

        {isError && (
          <p className={error}>{(fetchError as Error).message}</p>
        )}

        {data && <div className={result}>연결 완료</div>}
      </div>
    </main>
  );
}
