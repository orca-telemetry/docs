---
title: Product Roadmap
description: Our product development timeline and upcoming features
---

# Product Roadmap

Our roadmap outlines planned features and improvements. Timelines are estimates and may change based on feedback and priorities.

:::info
**Last Updated:** January 2026

Have a feature request? [Open an issue here](https://github.com/orc-analytics/core), in the correct repository:
- The core orchestrator: https://github.com/orc-analytics/core
- The CLI: https://github.com/orc-analytics/cli
- Python SDK: https://github.com/orc-analytics/python-sdk
:::

---

## Recently Shipped

### Q1 2026
- **Cross processor dependencies** - Algorithms can now depend on the result of
algorithms in other processors, where the processors are hosted entirely separately
(or even in a different programming language).

  To aid the DX an `init` and `sync` command has been included in the CLI which will
  initialise an Orca project and then create stubbed versions of the algorithms &
  window types already stored within Orca. These stubbed algorithms and window types
  can be used as usual when defining new algorithms.

  The `init` command is used to initialise an Orca directory, with an `orca.json`
  configuration file. This file is referenced by the CLI to ensure that when using the
  `sync` command algorithms and window types defined by this processor are not duplicated
  locally.

### 

---

## In Progress (Q1 2026)

### Core Features
- **Processing Backlog** - Kafka-esque processing reliability
  If processors cannot accept processing requests then the processing trigger
  (either a triggering window, or a DAG part) are stored in a FIFO queue.

  As processors are freed up, they start accepting entries from the queue.

- **Golang SDK** - A Go port of the Python SDK, resulting in:
  - Full Orca support
  - A `-sdk go` option in the CLI `sync` command

- **Caching of resolved DAG**
  
  When Orca starts, it should resolve all the DAG execution pathways and cache it
  for future processing requests. This will reduce the round trip processing time
  as the DAG is only resolved once.
---

## Planned (Q2 2026)

### Core Features

**Separate Stores**

Under this feature, Orca will have the ability to separate out the relational store
where information on the algorithms, window types and how they relate are stored, 
and the stream based data where the results are stored.

This could mean that Orca stores the relational data in a MySQL database, but the
results to the algorithms in a BigQuery instance. Best of both worlds.

**Result Lookback Functions in SDKs**

This feature would introduce a set of utility functions within the SDKs to lookback
and gather results from past algorithms, filtering by window type, algorithm
or window type metadata. This feature would introduce the ability to easily aggregate
algorithm data within new algorithms.


### Platform Features
This feature introduces the Orca platform - a SaaS that provisions and monitors 
Orca deployments on **your** infrastructure. Initially, these are the core features
of this platform:

**Auto-deployment**

The Orca platform will connect your processor repositories and **your** cloud
infrastructure and automatically deploy changes, based on a branching workflow. It
will provision resources to best leverage the Orca framework.

**Reprocessing**

The platform will provide the ability to reprocess algorithms on past segments of 
time / windows. As part of this process it will provision reprocessing dedicated
resources so as to not jeopardise production infrastructure.

**Labelling**

The platform will provide a data labelling interface that makes it seamless to build
high quality labelled data sets on real-time data.

## Future / Under Consideration

These items are being researched but not yet scheduled:

- **Data Caching**:
  Orca is designed to sit next to your data, which *you* access directly. However,
  the distributed algorithm architecture of Orca means that you can quite easily
  access the same chunk of data many times for different algorithms. This inefficient
  and turns your data store into the bottleneck.

  This data cacheing feature would see that algorithms that use the same chunk of data
  have that chunk cached in memory for later use, and then freed once Orca has
  determined that no further algorithms depend on it.

- **Failed Processor Continuation**:
  Processors stream results to Orca as they are executed. If there is a catastrophic
  issue when processing, Orca does have the power to log the stage that the processor
  was at, log that it failed then flag the execution for a retry later on.

  This feature could see an interface that retries the processing, and warns if the
  upstream algorithm versions have not changed.

---

## Our Priorities

1. **Performance** - Every release should perform better than the last
2. **Developer Experience** - Every release should enhance the DX and make it easier to build
and deploy custom analytics

---

## FAQs

**Q: Are these dates guaranteed?**  
A: No, this roadmap represents our current plans but dates may shift based on complexity, feedback, and priorities.

**Q: How do you decide what to build?**  
A: We prioritise based on user feedback, business value, technical dependencies, and strategic goals with our design partners.

**Q: Can I request a feature?**  
A: Absolutely! Submit requests directly in [Github](https://github.com/orc-analytics).

---

:::tip
**Stay Updated**  
Subscribe to our newsletter for real-time updates.
:::
