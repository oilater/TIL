'use client';

import { useCallback, useEffect, useState } from 'react';
import { ProfileImage } from '@/shared/components/ProfileImage/ProfileImage';
import {
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
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/user/me', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={header}>
      <div className={leftSection}>
        <p className={title}>TIL</p>
      </div>
      <div className={rightSection}>
        {user && (
          <>
            <div className={userInfo}>
              <span className={username}>
                {user.name || user.login}
              </span>
            </div>
            <ProfileImage
              src={user.avatar_url}
              alt={user.login}
              size={32}
            />
          </>
        )}
        <button onClick={handleLogout} className={logoutButton}>
          Logout
        </button>
      </div>
    </header>
  );
}
