'use client';
import { useState } from 'react';

export default function Home() {
  const [repoName, setRepoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const createRepo = async () => {
    if (!repoName) return;
    setLoading(true);

    const res = await fetch('/api/repo/create', {
      method: 'POST',
      body: JSON.stringify({ repoName }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <input
        type="text"
        placeholder="New repo name"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <button onClick={createRepo} disabled={loading}>
        {loading ? 'Creating...' : 'Create Repo'}
      </button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}
