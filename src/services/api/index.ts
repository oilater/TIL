export const api = {
  logout: async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
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

  writeDiary: async (title: string, content: string) => {
    const res = await fetch('/api/repo/write', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to write diary');
    }

    return data;
  },
};
