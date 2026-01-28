import React from 'react';
import Layout from '@theme/Layout';
import styles from './pitch.module.css';

export default function Pitch() {
  return (
    <Layout
      title="Pitch Deck"
      description="Orca investor pitch deck"
      noIndex={true}
    >
      <main className={styles.pitchPage}>
        <div className="container">
          <div className="row">
            <div className="col col--10 col--offset-1">

              <section className={styles.hero}>
                <h1 className={styles.title}>Orca</h1>
                <p className={styles.tagline}>Telemetry Analytics Orchestration - Built for IoT and Robotics Teams</p>
              </section>

              <section className={styles.section}>
                <h2>Problem</h2>
                <p>
                  IoT and Robotics Devices produce huge amounts of stream data. Often it's unfeasible to store all of this, 
                  and teams don't want to because it is burdensome. However, a point eventually comes where some insight is
                  needed from the data. E.g. Robotic Arm Joint Health, Temperature drift, etc.
                </p>
              </section>

              <section className={styles.section}>
                <h2>Solution</h2>
                <p>
                  Orca provides lightweight telemetry analytics orchestration framework with sensible presets that allows
                  teams to condense opaque telemetry data to high value metrics. On top of this, Orca supplies out of box the
                  tooling to label telemetry metrics and then build high value datasets, in order to finetune timeseries AI.
                  Think anomaly detection, forecasting etc.
                </p>
              </section>

              <section className={styles.section}>
                <h2>Market</h2>
                <p>
                  The robotics market is growing rapidly, projected to reach <a href="https://finance.yahoo.com/news/robotics-market-projected-reach-us-123000827.html" target="_blank">$199.50B+ by 2035</a>. Securing a small slice of
                  in the telemetry analytics space is already a huge win. And as the engine of this market is tech. generation
                  teams (engineers, developers), building tooling that slots in to their workflow is a recipe for success
                  as the industry grows.
                </p>
              </section>

              <section className={styles.section}>
                <h2>Product</h2>
                <div className={styles.features}>
                  <div className={styles.feature}>
                    <h3>Simple Integration</h3>
                    <p>One-line SDK installation across all major languages (Python, Go, Rust, Ts)</p>
                  </div>
                  <div className={styles.feature}>
                    <h3>Automatic Labeling</h3>
                    <p>Powerful enterprise features such as automatic labelling, creation of high value datasets and fine tuning of modern timeseries AI</p>
                  </div>
                  <div className={styles.feature}>
                    <h3>Developer-First</h3>
                    <p>Built for the tools developers already use</p>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2>Traction</h2>
                <p>
                  Early adopters across startups and mid-size companies.
                  Strong developer engagement and positive feedback on ease of use.
                </p>
              </section>

              <section className={styles.section}>
                <h2>Business Model</h2>
                <p>
                  Usage-based pricing that scales with customer growth. Software is largely hosted
                  in the users environment (as the core is open source), so COGs is minimal.
                  Free tier for development & self-host, paid tiers based on event volume & features.
                </p>
              </section>

              <section className={styles.section}>
                <h2>Team</h2>
                <p>
                  Founded by experienced engineers with backgrounds in timeseries analytics (ex. Airbus DS, CMR Surgical)
                </p>
              </section>

              <section className={styles.section}>
                <h2>Ask</h2>
                <p>
                  Seeking investment to accelerate product development, expand SDK support,
                  and support early design partners. 
                </p>
              </section>

              <section className={styles.footer}>
                <p>contact@orcatelemetry.io</p>
              </section>

            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
