---
slug: welcome
title: Welcome
authors: [frederickmannings]
tags: [news]
---

Welcome to Orca - a platform aspiring to become **the** way to process
analytics on realtime data.

Here's the origin story, and where we're going next.
<!-- truncate --> 

Welcome I'm glad you're here.

Orca has been in the works for a couple of years. But only in the past months has it reached
a really interesting stage. I am happy that you have arrived now to see it at this point.

So let me introduce Orca, why it exists and what the goal of the platform is.

## Origin

Orca started through my experience in building platforms for processing analytics on realtime data.
This, in one way or another, has been the core activity of my career. Be it through building
simulation frameworks at [Airbus DS](https://space-solutions.airbus.com/about-us/) on the
[JUICE](https://www.airbus.com/en/products-services/space/space-exploration/juice) project, or
telemetry analytics frameworks at [CMR Surgical](https://cmrsurgical.com/digital-ecosystem) -
I have always been running analytics on data **that just keeps arriving**.

But perhaps the most interesting aspect of these activities is that I have always built or extended
custom frameworks to achieve this. Rarely have I touched platforms like Databricks, Snowflake, the
Apache Stack, Flink, etc. In order to apply the analyses that I was processing, I would do so through
custom frameworks built by my predecessors, or platform that I myself helped build.

I think the reason why I have never dealt with these enterprise solutions is not a matter of scale
or complexity; for context, at CMR Surgical we were dealing with terabytes of telemetry and many
millions of derived datapoints, more than enough to warrant using a enterprise
platform *if* the pattern fit.

In my opinion, the reason why custom solutions were always the go to was because of a conflict between
the nature of the data I was dealing with (timeseries / realtime), the nature of the algorithms
that we needed to apply (event window based with dependencies between them), and the fact that
more extensive retrospective analytics were almost always preferred over streaming analytics.

Given these three requirements, no off the shelf framework fit the bill given the lock-in and
complexity cost. Of course, this was quickly traded for the complexity of managing a custom framework.
However after maintaining and building the same kind of framework over and over, it was clear that for
this set of requirements there is a particular pattern that can be generalised into a robust framework
that eases all of the engineering cost of maintaining a custom solution, so that teams can focus on
the work that realises the value - the analyses.

That is how Orca was born - through the neccessity of a framework that fit these three requirements:
- realtime data processing
- retrospective analyses
- dependencies between analytics

## Orca in Use

Since working in industry I have founded my own tech consultancy: [Predixus](https://predixus.com).
Through Predixus my team and I help companies turn their Data & AI vision into a reality.

And sometimes, timeseries challanges crop up. Timeseries is notoriously difficult to apply
any kind of "AI" to. Inherent stochasticity, chaos, and non-stationarity means that timeseries gets
left behind in the AI discussion because applying the calibre of AI that we have seen
recently with LLMs and such is extremely difficult or simply not possible.

So in these scenarios the pattern that Orca implements gets reinforced - systematic application of
analysis increases the power of the valuable signals within the data. But there is still a real world 
problem at play - algorithms are built that extract the data, how do you implement them at scale
in a reliable that your business can depend on? That is where we have found Orca so useful.
In eliminating the engineering burden to just deploying the metrics that we create, we can focus more
on the analyses and iterating them.

And my strong suspicion is that the rest of industry is in the same boat with timeseries data and
is confronting this challange of data proessing at scale.

Industry knows that timeseries data is significant chunk of the worlds data[^1], and my bet with
Orca is an increasing number of organisations will seek frameworks that fit more naturally into
processing pattern that I have personally experienced, so that they don't have to take on the
engineering burden of building a custom framework.

I am seeing this daily, as we sign new design partnerships with IoT companies that want to use 
Orca to stream line their operations (more information on this coming soon). And I am extremely
excited to make as big of an impact with Orca as possible by open sourcing it with permissive
licensing so companies can adopt and accelerate their internal AI-on-timeseries operations.


[^1]: Hu C, Sun Z, Li C, Zhang Y, Xing C. Survey of Time Series Data Generation in IoT. Sensors (Basel). 2023 Aug 5;23(15):6976. doi: 10.3390/s23156976. PMID: 37571759; PMCID: PMC10422358.
