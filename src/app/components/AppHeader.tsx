'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  avatar,
  header,
  leftSection,
  logoutButton,
  repoInfo,
  rightSection,
  title,
  userInfo,
  username,
} from './AppHeader.css';

type User = {
  login: string;
  name: string;
  avatar_url: string;
};

export function AppHeader() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/user/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <header className={header}>
        <div className={leftSection}>
          <h1 className={title}>TIL</h1>
        </div>
        <div className={rightSection}>Loading...</div>
      </header>
    );
  }

  return (
    <header className={header}>
      <div className={leftSection}>
        <h1 className={title}>TIL</h1>
        <span className={repoInfo}>Repository: Not set</span>
      </div>
      <div className={rightSection}>
        {user && (
          <div className={userInfo}>
            <Image
              src={user.avatar_url}
              alt={user.login}
              className={avatar}
              width={32}
              height={32}
            />
            <span className={username}>{user.name || user.login}</span>
          </div>
        )}
        <button onClick={handleLogout} className={logoutButton}>
          Logout
        </button>
      </div>
    </header>
  );
}
