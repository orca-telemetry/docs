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
          <span className={styles.titleLine}>Turn Existing</span>
          <span className={styles.wordContainer}>
            <span 
              className={styles.scrollingWord}
              key={currentIndex}
            >
              {words[currentIndex]}
            </span>
          </span>
          <span className={styles.titleLine}>into Production AI, Fast</span>
        </h1>
        <p className={styles.subtitle}>
          Orca bolts onto your streaming infrastructure to orchestrate sensor-to-model pipelines in Days, not Months
        </p>
        <div className={styles.cta}>
          <a href="#get-started" className={styles.primaryButton}>
            Get Started
          </a>
          <a href="#learn-more" className={styles.secondaryButton}>
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
