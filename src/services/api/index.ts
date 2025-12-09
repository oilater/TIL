export const api = {
  connectRepo: async (repoName: string) => {
    const res = await fetch('/api/repo/create-or-connect', {
      method: 'POST',
      body: JSON.stringify({ repoName }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    return res.json();
  },

  getRepos: async () => {
    const res = await fetch('/api/repo/list', {
      method: 'GET',
      credentials: 'include',
    });
    return res.json();
  },
};
