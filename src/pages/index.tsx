import React, { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Hero from '@site/src/components/Hero';
import WhyOrca from '@site/src/components/WhyOrca';
import FeatureLabeling from '@site/src/components/FeatureLabelling';
import FeatureSDK from '@site/src/components/FeatureSDK';
import FeatureReliability from '@site/src/components/FeatureReliability';
import CallToAction from '@site/src/components/CallToAction';
const description = "Orca AI: Bolt-on analytics for robotics and autonomous systems. Turn existing telemetry streams into production AI models with compile-time reliability."

const title = "Orca - Telemetry Data to AI in Days, not Months"

export default function Home(): ReactNode{
  return (
    <Layout
      title="Data to AI in Days, not Months"
      description
    >
      <Head>
        <meta property="og:title" content="Orca - Telemetry Data to AI in Days, not Months" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orc-a.io/" />
        <meta property="og:image" content="https://orc-a.io/img/orca-social-card.jpeg" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://orc-a.io/img/orca-social-card.jpeg" />
        <link rel="canonical" href="https://orc-a.io/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Orca',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Linux, macOS, Windows',
            description: 'Open-source orchestration framework for running analytics on real-time timeseries data at scale. Supports Python, Go, TypeScript, and Rust.',
            url: 'https://orc-a.io',
            author: {
              '@type': 'Organization',
              name: 'Orca',
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            screenshot: 'https://orc-a.io/img/orca-social-card.jpeg',
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://orc-a.io/',
              },
            ],
          })}
        </script>
      </Head>
      <main>
        <Hero />
        <WhyOrca />
        <FeatureLabeling />
        <FeatureSDK />
        <FeatureReliability />
        <CallToAction />
      </main>
    </Layout>
  );
}
