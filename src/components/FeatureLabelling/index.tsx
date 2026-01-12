import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function FeatureLabeling(): ReactNode {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <span className={styles.tag}>FEATURES</span>
        <h2 className={styles.title}>Label your Existing Telemetry, Train Models <span className={styles.highlight}>Instantly</span></h2>
        <p className={styles.description}>
          The core orchestrator connects to your event pub-sub streams and triggers analyses when data arrives. This enables robotics engineers to annotate real-world failures from live sensor data and immediately generate training datasets - no data lake migration required.
        </p>
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>In-Situ Annotation of Live Telemetry</h3>
            <p className={styles.featureDesc}>
              Label robot sensor streams directly from your existing telemetry store. An arm position or motor anomaly becomes a training label without complex ETL pipelines.
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>High-Quality Labels from Your Current Streams</h3>
            <p className={styles.featureDesc}>
              Reproducible pipelines mean your autonomous system's training data comes directly from operational telemetry already flowing through your infrastructure.
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Close the Loop from Stream to Model</h3>
            <p className={styles.featureDesc}>
              When an anomalous telemetry signal is emitted, Orca captures the telemetry from your existing topic, runs the analysis, generates labels, and triggers retraining - no data movement required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
