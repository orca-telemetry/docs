import React from 'react';
import Layout from '@theme/Layout';
import styles from './legal.module.css';

export default function Privacy() {
  return (
    <Layout title="Privacy Policy">
      <main className={styles.legalPage}>
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h1 className={styles.title}>Privacy Policy</h1>
              <p className={styles.subtitle}>Last Updated: Jan 2026</p>
              <hr className={styles.divider} />
              
              <div className={styles.content}>
                <h2>1. Data Usage</h2>
                <p>
                  At Orca, we prioritize data sovereignty. Your data streams are 
                  encrypted end-to-end...
                </p>
                
                <ul>
                  <li>We do not store your raw data streams.</li>
                  <li>Metadata is anonymized after 30 days.</li>
                  <li>You retain 100% ownership of your AI outputs.</li>
                </ul>

                <h2>2. Compliance</h2>
                <p>We adhere to global standards including GDPR and CCPA...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
