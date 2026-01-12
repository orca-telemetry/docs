import React, { type ReactNode } from 'react';
import { 
  Workflow, 
  Activity, 
  Code2, 
  Zap, 
  GitBranch, 
  ShieldCheck 
} from 'lucide-react';
import styles from './styles.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  // Change type to ReactNode to accept the component
  icon: ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps): ReactNode {
  return (
    <div className={styles.card}>
      {/* Uncommented and applied the icon component */}
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
}

export default function WhyOrca(): ReactNode {
  const features = [
    {
      icon: <Workflow size={32} strokeWidth={1.5} />,
      title: 'Stop Orchestrating Analytics by Hand',
      description: 'Orca orchestrates AI pipelines on top of your existing telemetry streams. Your robotics team writes algorithms while Orca handles scheduling and data freshness.',
    },
    {
      icon: <Activity size={32} strokeWidth={1.5} />,
      title: 'Analytics-First Timeseries Orchestration',
      description: 'Built for high-frequency sensor data already flowing through your infrastructure. Apply custom ML to LiDAR, IMU, and motor telemetry without touching your ingestion layer.',
    },
    {
      icon: <Code2 size={32} strokeWidth={1.5} />,
      title: 'Algorithm Engineer First',
      description: 'Python and Go SDKs connect directly to your existing telemetry infrastructure. Write analysis code and Orca orchestrates execution across your fleet data without infrastructure changes.',
    },
    {
      icon: <Zap size={32} strokeWidth={1.5} />,
      title: 'Capture the 10,000th Robot Action from Your Existing Streams',
      description: 'Event-driven triggers tap into your current telemetry store. When your robot arm enters an unmapped failure position, Orca detects it from your existing telemetry feed and launches diagnostics instantly.',
    },
    {
      icon: <GitBranch size={32} strokeWidth={1.5} />,
      title: 'Training Data Lineage from Ingestion to Model',
      description: 'Full provenance across your existing data stack-from event trigger to training label.',
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: 'Reproducible Robotics Analysis on Existing Data',
      description: 'Versioned interfaces ensure your models train on consistent sensor streams from your current data infrastructure, eliminating data drift.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why Orca?</h2>
        <p className={styles.sectionSubtitle}>Build analytics that follow your intuition</p>
        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
