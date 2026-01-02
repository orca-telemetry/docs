import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({ title, description, icon }: FeatureCardProps): ReactNode {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

export default function WhyOrca(): ReactNode {
  const features = [
    {
      icon: '🔄',
      title: 'No More Juggling Analytics',
      description: 'Orca manages the entire analytics lifecycle freeing you to focus solely on algorithm development and insight generation.',
    },
    {
      icon: '👨‍💻',
      title: 'Developer First',
      description: 'Orca provides lightweight, idiomatic SDKs that connect your code in Python, Go, Javascript or Rust, to the control plane. This keeps your analytics code clean, self-contained, and easy to test.',
    },
    {
      icon: '⚡',
      title: 'Never Miss an Event',
      description: 'Orca is triggered by your business events as they happen. Orca enforces data freshness guarantees, ensuring that your decisions are based on the latest information.',
    },
    {
      icon: '🔍',
      title: 'Full Lineage and Audit Ready',
      description: 'Orca provides end-to-end lineage of your analytics and delivers clear cost attribution across all processes.',
    },
    {
      icon: '✅',
      title: 'Iterate with Confidence',
      description: 'Orca enforces stable, versioned interfaces for all metrics. This makes every change reviewable, reproducible, and safe.',
    },
    {
      icon: '✅',
      title: 'Iterate with Confidence',
      description: 'Orca enforces stable, versioned interfaces for all metrics. This makes every change reviewable, reproducible, and safe.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why Orca?</h2>
        <p className={styles.sectionSubtitle}>Build on Your Intuition</p>
        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
