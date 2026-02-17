import { type ReactNode } from 'react';
import styles from './styles.module.css';

interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export default function Card({ title, description, icon, className }: CardProps) {
  const classes = [styles.card, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {icon && <div className={styles.iconContainer}>{icon}</div>}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}
