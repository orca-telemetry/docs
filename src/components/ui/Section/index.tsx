import { type ReactNode } from 'react';
import styles from './styles.module.css';

interface SectionProps {
  children: ReactNode;
  padding?: 'default' | 'large' | 'hero';
  maxWidth?: 'sm' | 'md' | 'lg';
  borderTop?: boolean;
  borderBottom?: boolean;
  centered?: boolean;
  className?: string;
  id?: string;
}

export default function Section({
  children,
  padding = 'default',
  maxWidth = 'md',
  borderTop = false,
  borderBottom = false,
  centered = false,
  className,
  id,
}: SectionProps) {
  const paddingClass = {
    default: styles.paddingDefault,
    large: styles.paddingLarge,
    hero: styles.paddingHero,
  }[padding];

  const maxWidthClass = {
    sm: styles.maxWidthSm,
    md: styles.maxWidthMd,
    lg: styles.maxWidthLg,
  }[maxWidth];

  const sectionClasses = [
    styles.section,
    paddingClass,
    borderTop && styles.borderTop,
    borderBottom && styles.borderBottom,
    centered && styles.centered,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses} id={id}>
      <div className={`${styles.container} ${maxWidthClass}`}>{children}</div>
    </section>
  );
}
