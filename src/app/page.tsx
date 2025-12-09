'use client';

import { useState } from 'react';

export default function Home() {
  const [repoName, setRepoName] = useState('');
  const [result, setResult] = useState(null);

  const createRepo = async () => {
    if (!repoName) return;

    const res = await fetch('/api/repo/create', {
      method: 'POST',
      body: JSON.stringify({ repoName }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <main>
      <input
        type="text"
        placeholder="New repo name"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <button onClick={createRepo}>Create Repo</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
