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
                <h2>1. Background</h2>
                <p>
                  Orca understands that your privacy is important. We respect the privacy of everyone who visits our site and only collect and use personal data as described in this policy.
                </p>

                <h2>2. Information About Us</h2>
                <p>
                  Our Site is owned and operated by Predixus, a limited company.
                </p>
                <ul>
                  <li><strong>Main Address: </strong>Ideaspace, 3 Laundress Ln, Cambridge CB2 1SD, UK</li>
                  <li><strong>Email:</strong> contact@orc-a.io</li>
                </ul>

                <h2>3. What Is Personal Data?</h2>
                <p>
                  Personal data is any information about you that enables you to be identified, covering obvious details like your name as well as online identifiers.
                </p>

                <h2>4. Your Rights</h2>
                <p>Under Data Protection Legislation, you have the following rights:</p>
                <ul>
                  <li>The right to be informed about our collection and use of data.</li>
                  <li>The right to access the personal data we hold about you.</li>
                  <li>The right to have your data rectified if it is inaccurate.</li>
                  <li>The right to be forgotten (deletion of your data).</li>
                  <li>The right to restrict or object to the processing of your data.</li>
                  <li>The right to data portability.</li>
                </ul>

                <h2>5. Data Collection and Lawful Basis</h2>
                <p>
                  We do not use cookies or tracking analytics. We automatically collect certain technical data like your IP address and browser type for the proper operation of the site, which is our legitimate interest. 
                </p>
                <p>
                  If you contact us via email, we collect your name and email address to respond to you, based on your consent.
                </p>

                <h2>6. Storage and Security</h2>
                <p>
                  We store your personal data securely within the UK or the EEA. We only keep data for as long as necessary, and email correspondence is typically deleted once the subject matter is resolved.
                </p>

                <h2>7. Subject Access Requests</h2>
                <p>
                  You may request a copy of the personal data we hold about you by contacting us in writing. We will respond within one month.
                </p>

                <h2>8. Changes to this Policy</h2>
                <p>
                  We may update this policy from time to time to stay compliant with the law. Changes will be posted here immediately.
                </p>
                
                <p><em>This policy was created using a template from Simply-Docs.</em></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
