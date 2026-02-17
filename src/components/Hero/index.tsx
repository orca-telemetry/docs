import React, { useState, useEffect } from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import styles from './styles.module.css';

export default function Hero() {
  const words = ['Robot Telemetry', 'IoT Signals', 'MedTech Streams'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section padding="hero" centered className={styles.hero}>
      <h1 className={styles.title}>
        <span className={styles.titleLine}>The Health Layer for your</span>
        <span className={styles.wordContainer}>
          <span
            className={styles.scrollingWord}
            key={currentIndex}
          >
            {words[currentIndex]}
          </span>
        </span>
      </h1>
      <p className={styles.subtitle}>
        Build the fastest Telemetry Pipeline in the World
      </p>
      <div className={styles.cta}>
        <Button variant="primary" href="/docs/quickstart">
          Get Started
        </Button>
        <Button variant="secondary" href="/docs/architecture/overview">
          Learn More
        </Button>
      </div>
    </Section>
  );
}
