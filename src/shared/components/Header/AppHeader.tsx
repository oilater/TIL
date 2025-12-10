'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { ProfileImage } from '@/shared/components/ProfileImage/ProfileImage';
import {
  header,
  leftSection,
  logoutButton,
  rightSection,
  title,
  userInfo,
  username,
  wrapper,
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

  return (
    <header className={header}>
      <div className={wrapper}>
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
          <button
            onClick={() => api.logout()}
            className={logoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
