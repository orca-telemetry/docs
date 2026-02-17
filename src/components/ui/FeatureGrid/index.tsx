import styles from './styles.module.css';

interface FeatureGridItem {
  title: string;
  description: string;
}

interface FeatureGridProps {
  items: FeatureGridItem[];
  variant?: 'expand' | 'static';
  tablet2Col?: boolean;
}

export default function FeatureGrid({
  items,
  variant = 'expand',
  tablet2Col = false,
}: FeatureGridProps) {
  const gridClasses = [
    styles.grid,
    variant === 'expand' ? styles.variantExpand : styles.variantStatic,
    tablet2Col && styles.gridTablet2Col,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClasses}>
      {items.map((item, idx) => (
        <div key={idx} className={styles.item}>
          <h3 className={styles.itemTitle}>{item.title}</h3>
          <p className={styles.itemDescription}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
