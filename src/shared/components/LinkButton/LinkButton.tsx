import Link, { LinkProps } from 'next/link';
import { githubButton, iconWrapper, textStack } from './LinkButton.css';

interface LinkButtonProps extends LinkProps {
  icon?: React.ReactNode;
  href: string;
  children: React.ReactNode;
}

export function LinkButton({ icon, href, children }: LinkButtonProps) {
  return (
    <Link href={href} className={githubButton} aria-label="GitHub 로그인">
      <span className={iconWrapper}>{icon}</span>
      <span className={textStack}>
        <span>{children}</span>
      </span>
    </Link>
  );
}
