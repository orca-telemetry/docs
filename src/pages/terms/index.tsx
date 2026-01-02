import React from 'react';
import Layout from '@theme/Layout';

export default function Terms() {
  return (
    <Layout title="Terms of Service">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1 className="title">Terms of Service</h1>
            <p className="subtitle">Effective Date: January 1, 2026</p>
            <hr />
            
            <div className="content">
              <p>By using Orca, you agree to the following terms. Please read them carefully.</p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using Orca, you agree to be bound by these Terms of Service and our Privacy Policy. Orca is provided as an open-source platform, and your use of the site signifies your agreement to these standard terms.
              </p>

              <h2>2. Use of Service</h2>
              <p>
                You agree to use Orca only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform.
              </p>

              <h2>3. Intellectual Property and Ownership</h2>
              <ul>
                <li><strong>Open Source:</strong> Orca is an open-source platform. While the platform itself is subject to its respective open-source licenses, the specific content and branding of this website are owned by Orca.</li>
                <li><strong>Your Content:</strong> You retain 100% ownership of any data you process and the AI outputs generated through your use of the service.</li>
              </ul>

              <h2>4. Data Sovereignty</h2>
              <p>
                We prioritize data sovereignty. Your data streams are encrypted, and we do not store raw data streams or AI outputs on our servers unless explicitly required for a feature you have opted into.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                Orca is provided on an "as-is" and "as-available" basis without any warranties of any kind. To the maximum extent permitted by law, Orca shall not be liable for any damages arising out of your use or inability to use the website.
              </p>

              <h2>6. Changes to Terms</h2>
              <p>
                We may update these terms from time to time to reflect changes in our service or legal requirements. Your continued use of the platform after changes are posted constitutes your acceptance of the updated terms.
              </p>

              <h2>7. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at [insert email address].
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
