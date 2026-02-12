import React, { useState, useEffect } from 'react';
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
    <div className={styles.hero}>
      <div className={styles.container}>
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
          <a href="/docs/quickstart" className={styles.primaryButton}>
            Get Started
          </a>
          <a href="/docs/architecture/overview" className={styles.secondaryButton}>
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
