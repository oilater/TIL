export const api = {
  connectRepo: async (repoName: string) => {
    const res = await fetch('/api/repo/create-or-connect', {
      method: 'POST',
      body: JSON.stringify({ repoName }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error ||
          `Failed to ${res.status === 422 ? 'create or connect' : 'process'} repository`,
      );
    }

    return data;
  },

  getRepos: async () => {
    const res = await fetch('/api/repo/list', {
      method: 'GET',
      credentials: 'include',
    });
    return res.json();
  },
};
