---
sidebar_position: 1
title: Algorithm Dependencies
description: Learn how to build a processor with algorithms that depend on each other. This example covers feature engineering and machine learning prediction using Orca's composability.
keywords: [algorithm dependencies, orca examples, feature engineering, machine learning pipeline, vibration analysis, pump monitoring, composable algorithms, DAG processing, algorithm versioning]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this example, we build a processor containing multiple algorithms where the output of one serves as the input for another. This demonstrates **algorithm composability** - a core Orca feature that allows you to version, iterate, and test stages of a pipeline independently.

The code for this example can be found [here](https://github.com/orca-telemetry/examples/tree/main/python/algo-dependencies).

---

## 1. Use Case: Pump Status Detection

We will build a processor that analyses vibration data from a sensor to detect whether a pump is "On" or "Off." The pipeline consists of two stages:

1.  **Feature Engineering**: Calculates statistical features (RMS, Peak, etc.) from raw vibration data.
2.  **Prediction**: Uses a logistic regression model on those features to predict status.

By splitting these, you can update your ML model version without touching the stable feature engineering code.

## 2. Setup Your Environment

First, ensure the Orca stack is running:

```bash
orca start
```

Create a new directory for this project and initialise the Orca configuration:

```bash
mkdir algo-dependencies && cd algo-dependencies
orca init
```

### Create a Virtual Environment

Install the required dependencies (`orca-python`, `pandas`, `numpy`, and `schedule`) using your preferred manager:

<Tabs groupId="package-manager">
<TabItem value="pip" label="pip" default>

```bash
python -m venv .venv 
source ./.venv/bin/activate
python -m pip install orca-python pandas numpy schedule

```

</TabItem>
<TabItem value="poetry" label="Poetry">

```bash
poetry init
poetry add orca-python pandas numpy schedule

```

</TabItem>
<TabItem value="uv" label="uv">

```bash
uv venv
source .venv/bin/activate
uv pip install orca-python pandas numpy schedule

```

</TabItem>
</Tabs>

## 3. Create the Data Getter

We need a way to simulate vibration telemetry. Create `data_getter.py` and add the following:

```python
import datetime as dt
import numpy as np
import pandas as pd

def getVibrationData(time_from: dt.datetime, time_to: dt.datetime, asset_id: int) -> pd.DataFrame:
    """Simulates 100 samples of 3-axis vibration data"""
    data = pd.DataFrame({
        "time": pd.date_range(start=time_from, end=time_to, periods=100),
        "asset_id": asset_id,
        "x": np.random.random(100),
        "y": np.random.random(100),
        "z": np.random.random(100),
    })
    data.set_index("time", inplace=True)
    return data
```

## 4. Define the Processor and Algorithms

Create `main.py`. This file defines the **DAG (Directed Acyclic Graph)** by linking algorithms together via the `depends_on` parameter.

```python
from google.protobuf import json_format
import numpy as np
from orca_python import (
    Processor, WindowType, StructResult, 
    MetadataField, ExecutionParams
)
from data_getter import getVibrationData

proc = Processor("onOffDetector")
asset_id = MetadataField(name="asset_id", description="The unique ID of the asset.")

OneSecondOfVibrationData = WindowType(
    name="OneSecondOfVibrationData",
    version="1.0.0",
    description="A one second period of vibration telemetry",
    metadataFields=[asset_id],
)

# --- Algorithm 1: Feature Engineering ---
@proc.algorithm(
    name="ProduceSummaryStatistics",
    version="1.0.0",
    window_type=OneSecondOfVibrationData,
)
def produce_summary_statistics(params: ExecutionParams) -> StructResult:
    asset_id_val = params.window.metadata.get("asset_id")
    data = getVibrationData(params.window.time_from, params.window.time_to, asset_id_val)

    stats = {}
    for axis in ["x", "y", "z"]:
        signal = np.asarray(data[axis].values, dtype=float)
        stats[f"{axis}_rms"] = float(np.sqrt(np.mean(signal**2)))
        stats[f"{axis}_std"] = float(np.std(signal))

    return StructResult(stats)

# --- Algorithm 2: ML Prediction (Depends on Algorithm 1) ---
@proc.algorithm(
    name="PredictPumpStatus",
    version="1.0.0",
    window_type=OneSecondOfVibrationData,
    depends_on=[produce_summary_statistics],
)
def predict_pump_status(params: ExecutionParams) -> StructResult:
    # Access results from dependencies
    stats = {}
    if params.dependencies:
        for dep in params.dependencies:
            if hasattr(dep.result, "struct_value"):
                stats = json_format.MessageToDict(dep.result.struct_value)

    # Simple Logistic Regression logic
    features = np.array([stats.get("x_rms", 0.0), stats.get("y_rms", 0.0)])
    weights = np.array([0.8, 0.7])
    logit = np.dot(weights, features) - 1.0 # -1.0 is intercept
    probability = 1 / (1 + np.exp(-logit))
    
    return StructResult({
        "pump_on": 1 if probability >= 0.5 else 0,
        "probability": float(probability)
    })

if __name__ == "__main__":
    proc.Register()
    proc.Start()
```

## 5. Create the Window Emitter

Create `window.py` to trigger the processor every second.

```python
import time
import datetime as dt
import schedule
from orca_python import Window, EmitWindow

def emitWindow() -> None:
    now = dt.datetime.now()
    window = Window(
        time_from=now - dt.timedelta(seconds=1),
        time_to=now,
        name="OneSecondOfVibrationData",
        version="1.0.0",
        origin="Simulation",
        metadata={"asset_id": 1},
    )
    EmitWindow(window)

schedule.every(1).seconds.do(emitWindow)

if __name__ == "__main__":
    emitWindow()
    while True:
        schedule.run_pending()
        time.sleep(0.1)

```

## 6. Run and Verify

Open two terminals.

**Terminal 1: Start the Processor**

```bash
python main.py
```

**Terminal 2: Start the Emitter**

```bash
python window.py
```

### Expected Logs

In the **Processor** logs, you will see Orca coordinating the DAG. Because `PredictPumpStatus` depends on `ProduceSummaryStatistics`, Orca ensures they run in the correct order:

```text
INFO - Received DAG execution request with 2 algorithms
INFO - Running algorithm ProduceSummaryStatistics_1.0.0
INFO - Completed algorithm: ProduceSummaryStatistics
INFO - Running algorithm PredictPumpStatus_1.0.0
INFO - Completed algorithm: PredictPumpStatus
```

---

## Key Takeaways

* **DAG Orchestration**: Orca automatically handles the execution order based on the `depends_on` list.
* **Data Passing**: Results from parent algorithms are passed to children via `params.dependencies`.
* **Granular Iteration**: You can deploy `PredictPumpStatus` version `1.1.0` while keeping the same `ProduceSummaryStatistics` logic.

This is a simple example that demonstrates dependencies between algorithms. In reality, dependencies
can be much more complex. Orca supports all DAG structures, including a single algorithm depending
on multiple others.
