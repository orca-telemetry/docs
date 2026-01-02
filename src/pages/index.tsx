import React, { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import WhyOrca from '@site/src/components/WhyOrca';
import FeatureLabeling from '@site/src/components/FeatureLabelling';
import FeatureSDK from '@site/src/components/FeatureSDK';
import FeatureReliability from '@site/src/components/FeatureReliability';
import CallToAction from '@site/src/components/CallToAction';

export default function Home(): ReactNode{
  return (
    <Layout
      title="Data to AI in Days, not Months"
      description="Build Analytics on Realtime Data, Fast, with Orca. Orca manages the entire analytics lifecycle from analysis scheduling to insight generation."
    >
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
