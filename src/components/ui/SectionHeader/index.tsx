import { type ReactNode } from 'react';
import styles from './styles.module.css';

interface SectionHeaderProps {
  title: ReactNode;
  description?: string;
  centered?: boolean;
  size?: 'default' | 'large';
}

export default function SectionHeader({
  title,
  description,
  centered = false,
  size = 'default',
}: SectionHeaderProps) {
  const titleClasses = [
    styles.title,
    size === 'large' ? styles.sizeLarge : styles.sizeDefault,
  ].join(' ');

  const descriptionClasses = [
    styles.description,
    centered && styles.descriptionCentered,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <h2 className={titleClasses}>{title}</h2>
      {description && <p className={descriptionClasses}>{description}</p>}
    </>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return <span className={styles.highlight}>{children}</span>;
}
