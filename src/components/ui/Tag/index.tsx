import { type ReactNode } from 'react';
import styles from './styles.module.css';

interface TagProps {
  children: ReactNode;
}

export default function Tag({ children }: TagProps) {
  return <span className={styles.tag}>{children}</span>;
}
