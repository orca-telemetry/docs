import { type ReactNode } from 'react';
import Section from '../ui/Section';
import Tag from '../ui/Tag';
import SectionHeader from '../ui/SectionHeader';
import FeatureGrid from '../ui/FeatureGrid';

const features = [
  {
    title: 'Tap Into Your Existing Event Streams',
    description:
      "Orca subscribes to your current Kafka topics or MQTT streams, triggering diagnostics the moment your robot's IMU detects anomalous vibration.",
  },
  {
    title: 'Freshness on Your Existing Data',
    description:
      "Your autonomous vehicle's perception model always trains on the latest data from your existing message bus, not stale warehouse extracts.",
  },
  {
    title: 'Backfill from Your Existing Stores',
    description:
      'Missed sensor data? Orca backfills automatically by querying your existing time-series database, isolating failures per robot without affecting fleet-wide operations.',
  },
];

export default function FeatureReliability(): ReactNode {
  return (
    <Section padding="large" borderTop borderBottom>
      <Tag>FEATURES</Tag>
      <SectionHeader
        size="large"
        title="Robot Fleet Reliability, Validated Before Deployment"
        description="Robotics pipelines can't fail during production. Orca's compile-time validation guarantees your telemetry analytics are correct before deployment, with automated backfills that query your existing data stores - no brittle glue scripts required."
      />
      <FeatureGrid items={features} variant="expand" tablet2Col />
    </Section>
  );
}
