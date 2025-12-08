'use client';

import { usePathname } from 'next/navigation';
import { AppHeader } from './AppHeader';

export function LayoutHeader() {
  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  return <AppHeader />;
}
