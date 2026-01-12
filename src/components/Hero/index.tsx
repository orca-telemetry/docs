import React, { type ReactNode } from 'react';
import styles from './styles.module.css';


export default function Hero(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
            Turn Existing Robot Telemetry into Production AI, <span className={styles.highlight}>Fast</span>
        </h1>
        <p className={styles.subtitle}>
            Orca bolts onto your streaming infrastructure to orchestrate sensor-to-model pipelines in <b>Days</b>, not Months
        </p>
        <div className={styles.cta}>
          <a href="/docs/quickstart" className={styles.primaryButton}>
            Get Started
          </a>
          <a href="#features" className={styles.secondaryButton}>
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
