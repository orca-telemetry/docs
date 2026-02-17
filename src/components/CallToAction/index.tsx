import { type ReactNode } from 'react';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import styles from './styles.module.css';

export default function CallToAction(): ReactNode {
  return (
    <Section centered borderBottom className={styles.section} maxWidth="sm">
      <SectionHeader
        size="large"
        centered
        title="Join robotics and IoT teams building AI on their telemetry infrastructure"
        description="Bolt Orca onto your stack and start building autonomous intelligence today"
      />
      <Button variant="cta" href="/docs/quickstart">
        Integrate with your datastore
      </Button>
    </Section>
  );
}
