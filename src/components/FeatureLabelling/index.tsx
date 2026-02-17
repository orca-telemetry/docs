import { type ReactNode } from 'react';
import Section from '../ui/Section';
import Tag from '../ui/Tag';
import SectionHeader, { Highlight } from '../ui/SectionHeader';
import FeatureGrid from '../ui/FeatureGrid';

const features = [
  {
    title: 'In-Situ Annotation of Live Telemetry',
    description:
      'Label robot sensor streams directly from your existing telemetry store. An arm position or motor anomaly becomes a training label without complex ETL pipelines.',
  },
  {
    title: 'High-Quality Labels from Your Current Streams',
    description:
      'Reproducible pipelines mean your autonomous system\'s training data comes directly from operational telemetry already flowing through your infrastructure.',
  },
  {
    title: 'Close the Loop from Stream to Model',
    description:
      'When an anomalous telemetry signal is emitted, Orca captures the telemetry from your existing topic, runs the analysis, generates labels, and triggers retraining - no data movement required.',
  },
];

export default function FeatureLabeling(): ReactNode {
  return (
    <Section borderTop id="features">
      <Tag>FEATURES</Tag>
      <SectionHeader
        title={
          <>
            Label your Existing Telemetry, Train Models{' '}
            <Highlight>Instantly</Highlight>
          </>
        }
        description="The core orchestrator connects to your event pub-sub streams and triggers analyses when data arrives. This enables robotics engineers to annotate real-world failures from live sensor data and immediately generate training datasets - no data lake migration required."
      />
      <FeatureGrid items={features} variant="static" />
    </Section>
  );
}
