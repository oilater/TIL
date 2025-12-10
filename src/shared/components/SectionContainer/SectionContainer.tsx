import { container } from './SectionContainer.css';

interface SectionContainerProps {
  children: React.ReactNode;
}

export const SectionContainer = ({
  children,
}: SectionContainerProps) => {
  return <div className={container}>{children}</div>;
};
