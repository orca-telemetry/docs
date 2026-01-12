import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function CallToAction(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Join robotics and IoT teams building AI on their telemetry infrastructure
        </h2>
        <p className={styles.subtitle}>
          Bolt Orca onto your stack and start building autonomous intelligence today
        </p>
        <a href="/docs/quickstart" className={styles.ctaButton}>
          Integrate with your datastore
        </a>
      </div>
    </section>
  );
}
