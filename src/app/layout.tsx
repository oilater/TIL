import type { Metadata } from 'next';
import './globals.css';
import { LayoutHeader } from '@/shared/components/Header/LayoutHeader';

export const metadata: Metadata = {
  title: 'TIL',
  description: 'TIL',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <LayoutHeader />
        {children}
      </body>
    </html>
  );
}
