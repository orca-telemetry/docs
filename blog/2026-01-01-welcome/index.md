---
slug: welcome
title: "Solving the Engineering Burden"
description: The origin story of Orca - why we built it, the problem it solves for real-time timeseries analytics, and where we're going next with the open-source platform.
authors: [frederickmannings]
tags: [news, open-source]
keywords: [orca platform, real-time analytics, timeseries data challenges, open source analytics, IoT analytics, data engineering, AI timeseries, analytics orchestration]
image: /img/orca-social-card.jpeg
---

Welcome to Orc-a. A platform aspiring to become **the** standard for processing 
analytics on real-time data.


Here is the origin story of why we built it, the problem it solves, and where we are going next.
<!--truncate-->
Orca has been in development for several years, but only in recent months has it reached a 
really interesting stage. I am glad you have arrived at this point in time to see it 
in action.

## The Origin Story

The core activity of my career has been building platforms for real-time analytics. Whether 
designing simulation frameworks at [Airbus DS](https://space-solutions.airbus.com/about-us/) 
for the [JUICE](https://www.airbus.com/en/products-services/space/space-exploration/juice) 
mission, or telemetry frameworks at [CMR Surgical](https://cmrsurgical.com/digital-ecosystem), 
I have always been tasked with running complex analyses on data **that simply never stops arriving.**

Curiously, we rarely reached for enterprise "big data" solutions like Databricks, Snowflake, 
or Flink. This wasn't a matter of scale (for contect, at CMR Surgical we were working with
terabytes of telemetry and millions of derived data points). On retrospect, it I think it was
a matter of fit.

It seems to me that custom solutions were almost always preferred because of a fundamental
conflict between three requirements:
1. **The Nature of the Data:** It was timeseries and arrives in real time.
2. **The Nature of the Logic:** Algorithms were often event-window based with complex inter-dependencies.
3. **Non-Streaming:** More extensive retrospective (historical) analytics were often preffered 
   over streaming analytics.

No off-the-shelf framework could reconcile these three needs without significant lock-in or 
extreme architectural complexity. And so we built custom frameworks, thereby trading the complexity 
of enterprise tools for the complexity of building a framework from scratch. 

After building variations of the same system multiple times, I realised this pattern could 
be generalised into a robust, open-source tool. And so Orca was born, with the goal to
eliminate the engineering overhead of plumbing together analytics and instead just allowing
teams to focus on the work that actually generates value: the analysis.

## Orca in Use

Since my time in industry, I founded [Predixus](https://predixus.com), a consultancy 
helping companies turn Data & AI needs into reality. Timeseries challenges often crop up,
yet they are notoriously difficult to apply modern AI to. 

Inherent stochasticity and non-stationarity mean that timeseries data is often left behind 
in the AI conversation. While LLMs excel at text, applying that same caliber of 'intelligence'
to high-frequency sensor data (for example) was just not possible.

Orca changed this by implementing a systematic approach to signal processing. By extracting 
high-value signals through structured analytics, we were able to make timeseries data ready
to be used to inform or train 'AI' models.

We are already seeing this in practice. We are currently signing new design partnerships 
with IoT companies using Orca to streamline their operations (more information coming on
this soon). By removing the burden ofscaling and reliability, these companies can iterate
on their core metrics and AI models at a pace previously impossible with custom-built stacks.

## The Future of Orca

My goal is for Orca to make the biggest impact possible on companies tackling timeseries
data and wanting realise the promised value of AI. To achieve that, the core of Orca is - and
will remain - open source under a permissive license. 

However, building a sustainable ecosystem requires a clear path for growth. Our model 
follows a philosophy similar to the Freemium model:
* **The Core Framework:** Open and free for the community to build upon.
* **Managed Platform:** We will provide a managed platform for provisioning Orca in
    **your cloud** and scheduling deployments based on a git workflow.
* **Specialised Modules:** We will offer paid "Toolboxes" or modules that implement 
    sophisticated, industry-specific processes and proprietary algorithms. Initial 
    candidates are trending & forecasting toolboxes that implement industry standard models
    but optimised for compute resources (so they can be run at scale) and the Orca framework
* **Support & Services:** For enterprises that need to move fast, we provide expert 
    support and custom algorithm design.

Orca is alive and kicking. We are building this to ensure that businesses dealing with the
difficulty of timeseries data - which constitutes a significant and growing portion of the
world's data[^1] - can finally see the same caliber of ROI and AI advancement as those
working with textual or static data.

I’m excited to have you on this journey. Stay tuned for more updates as we roll out 
our first set of modules and design partnership case studies.

[^1]: Hu C, Sun Z, Li C, Zhang Y, Xing C. Survey of Time Series Data Generation in IoT. Sensors (Basel). 2023 Aug 5;23(15):6976. doi: 10.3390/s23156976.
