import React from 'react';
import Section from '../ui/Section';
import Tag from '../ui/Tag';
import SectionHeader from '../ui/SectionHeader';
import styles from './styles.module.css';

const languages = [
  {
    name: 'Python',
    icon: '/img/python.svg',
    description: 'For advanced ML',
    install: 'pip install orca-python',
    href: '/docs/sdks/python',
    popular: true,
  },
  {
    name: 'Go',
    icon: '/img/go.svg',
    description: 'For I/O bound tasks',
    install: '<coming soon>',
    href: '/docs/sdks/go',
    popular: false,
  },
  {
    name: 'JS/TS',
    icon: '/img/ts.svg',
    description: 'For metrics built in JS',
    install: '<coming soon>',
    href: '/docs/sdks/typescript',
    popular: false,
  },
  {
    name: 'Rust',
    icon: '/img/rust.svg',
    description: 'For high throughput metrics',
    install: '<coming soon>',
    href: '/docs/sdks/rust',
    popular: false,
  },
];

export default function FeatureSDK() {
  return (
    <Section borderTop>
      <Tag>FEATURES</Tag>
      <SectionHeader
        title="Build Algorithms in your Preferred Language"
        description="Orca supports algorithm dependencies across programming languages so you can use the right tool for the job. Keep ML algorithms in Python and high-throughput metrics in Go!, keeping your stack efficient and lean - all without touching your ingestion layer."
      />
      <div className={styles.languages}>
        {languages.map((lang) => (
          <a key={lang.name} href={lang.href} className={styles.languageCard}>
            {lang.popular && <span className={styles.badge}>Popular</span>}
            <div className={styles.iconWrapper}>
              <img height="50" src={lang.icon} />
            </div>
            <h3 className={styles.languageTitle}>{lang.name}</h3>
            <p className={styles.languageDescription}>{lang.description}</p>
            <code className={styles.installCommand}>{lang.install}</code>
          </a>
        ))}
      </div>
    </Section>
  );
}
