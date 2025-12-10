import type { Metadata } from 'next';
import './globals.css';
import { LayoutHeader } from '@/shared/components/Header/LayoutHeader';
import { SectionContainer } from '@/shared/components/SectionContainer/SectionContainer';
import { QueryProvider } from './(provider)/QueryProvider';

export const metadata: Metadata = {
  title: 'TIL',
  description: '퇴근 후 5분만 투자해 오늘 한 일을 기록해보세요!',
  authors: {
    name: '김성현',
    url: 'https://www.linkedin.com/in/seonghyeonkim',
  },
  keywords: [
    'TIL',
    'today i learned',
    'today i did',
    'til application',
    'til app',
  ],
  icons: {
    icon: '/favicon.ico',
  },
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
        <QueryProvider>
          <SectionContainer>{children}</SectionContainer>
        </QueryProvider>
      </body>
    </html>
  );
}
