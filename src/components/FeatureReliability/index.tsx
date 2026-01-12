import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export default function FeatureReliability(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.tag}>FEATURES</span>
        <h2 className={styles.title}>Robot Fleet Reliability, Validated Before Deployment</h2>
        <p className={styles.description}>
          Robotics pipelines can't fail during production. Orca's compile-time validation guarantees your telemetry analytics are correct before deployment, with automated backfills that query your existing data stores - no brittle glue scripts required.
        </p>
        
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Tap Into Your Existing Event Streams</h3>
            <p className={styles.featureDesc}>
              Orca subscribes to your current Kafka topics or MQTT streams, triggering diagnostics the moment your robot's IMU detects anomalous vibration.
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Freshness on Your Existing Data</h3>
            <p className={styles.featureDesc}>
              Your autonomous vehicle's perception model always trains on the latest data from your existing message bus, not stale warehouse extracts.
            </p>
          </div>
          
          <div className={styles.featureItem}>
            <h3 className={styles.featureTitle}>Backfill from Your Existing Stores</h3>
            <p className={styles.featureDesc}>
              Missed sensor data? Orca backfills automatically by querying your existing time-series database, isolating failures per robot without affecting fleet-wide operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
