import type { Metadata } from 'next';
import './globals.css';
import { LayoutHeader } from './components/LayoutHeader';

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
