---
sidebar_position: 2
id: algo-deps
title: Algorithm Dependencies 
description: Learn how to build a process with algorithms that depend
    on each other, within a single processor.
---

In this example we build a processor that has several algorithms,
where the  result of one algorithm is fed into another. The use case
that we will explore in this example is a ML feature engineering pipeline
where each stage is complex and requires careful testing and versioning.

This use case albeit simple demonstrates a core feature of Orca - algorithm
composability where each stage can be versioned, iterated and tested.

---

Before starting, follow the [quickstart](/docs/quickstart) guide to ensure
that the Orca CLI is installed.

In this guide we will use the [python SDK](/docs/sdks/python).

## Requirements

- The [Orca CLI](/docs/cli) is installed
- `orca-python` is installed in your python environment
- The orca stack running locally. You can check by running `orca status`.

## Step 1 - Create a processor

Within our python project, we're going to create a new file called `orcaProcessor.py`:

```bash
mkdir orcaProcessor.py
```

Within this file we're going to add the following code to initialise the processor:

```python
from orca_python import Processor

proc = Processor(name="algos")
```

## Step 2 - Build algorithms

Now we're going to build out some algorithms. The process that we're going to simulate
is the arrival of some vibration data. This data is coming from a sensor attached to a
pump. Our goal is to detect whether the pump is on or off.


