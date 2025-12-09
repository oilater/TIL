import { LinkButton } from '@/shared/components/LinkButton';
import { GitHubIcon } from '@/shared/icons/GitHubIcon';
import { content, page, title } from './LoginPage.css';

export default function LoginPage() {
  return (
    <main className={page}>
      <div className={content}>
        <h1 className={title}>git push TIL</h1>
        <LinkButton icon={<GitHubIcon />} href="/auth">
          Github로 시작하기
        </LinkButton>
      </div>
    </main>
  );
}
