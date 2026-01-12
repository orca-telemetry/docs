---
sidebar_position: 2
id: dual-proc-algo-deps
title: Algorithm Dependencies Between Processors
description: Learn how to connect algorithms between two processor runtime instances.
---

## Overview

In this example we build a set of algorithms that depend on each other between
processors. This example leverages the power of Orca to build cross runtime
DAGs. We will use the same use case as in the [Single Processor](/docs/examples/algo-deps)
example where we build a machine learning feature engineering pipeline.

## Use Case: Pump Status Detection

We'll build a processor that analyses vibration data from a sensor attached to a pump to detect whether the pump is on or off. The process involves:

1. **Feature Engineering**: Calculate statistical features from raw vibration data
2. **Prediction**: Use logistic regression on these features to predict pump status

By splitting these into separate algorithms, we can iterate on the regression model independently while keeping the feature engineering stable.

The trigger to the algorithms within the processor will be a window that denotes 1 second of telemetry data. We will assume that data arrives reliably enough to produce 1 second windows where data is present.

## Requirements

Before starting, ensure you have:

- The [Orca CLI](/docs/cli) installed
- `orca-python` installed in your python environment
- The Orca stack running locally (verify with `orca status`)

This guide uses the [Python SDK](/docs/sdks/python).

## Step 1: Set Up Project Structure

Create three files in your project:

```bash
touch main.py
touch data_getter.py
touch window.py
```

## Step 2: Create the Data Getter

First, let's create a helper function to simulate vibration data. In `data_getter.py`:

```python
import datetime as dt
import numpy as np
import pandas as pd


def getVibrationData(
    time_from: dt.datetime, time_to: dt.datetime, asset_id: int
) -> pd.DataFrame:
    """A dummy function to get some sample vibration data"""

    data = pd.DataFrame(
        {
            "time": pd.date_range(start=time_from, end=time_to, periods=100),
            "asset_id": asset_id,
            "x": np.random.random(100),
            "y": np.random.random(100),
            "z": np.random.random(100),
        }
    )
    data.set_index("time", inplace=True)
    return data
```

## Step 3: Define the Processor and Window Type

In `main.py`, start by importing dependencies and defining the processor:

```python
from google.protobuf import json_format
from orca_python import (
    Processor,
    WindowType,
    StructResult,
    MetadataField,
    ExecutionParams,
)
import numpy as np

from data_getter import getVibrationData

# Initialize the processor
proc = Processor("onOffDetector")

# Define metadata field for asset identification
asset_id = MetadataField(name="asset_id", description="The unique ID of the asset.")

# Define the window type
OneSecondOfVibrationData = WindowType(
    name="OneSecondOfVibrationData",
    version="1.0.0",
    description="A one second period of time where there is a packet of vibration data available",
    metadataFields=[asset_id],
)
```

## Step 4: Create the Feature Engineering Algorithm

Add the first algorithm that calculates summary statistics from the vibration data:

```python
@proc.algorithm(
    name="ProduceSummaryStatistics",
    version="1.0.0",
    window_type=OneSecondOfVibrationData,
)
def produce_summary_statistics(params: ExecutionParams) -> StructResult:
    """
    Calculate features on vibration data for x, y, z axes
    """

    asset_id = params.window.metadata.get("asset_id", None)

    # Orca enforces metadata existence on windows - asset_id will
    # always be present
    if asset_id is None:
        raise Exception("Expected `asset_id` - received nothing")

    data = getVibrationData(
        time_from=params.window.time_from,
        time_to=params.window.time_to,
        asset_id=asset_id,
    )

    # Calculate statistics for each axis
    stats = {}
    for axis in ["x", "y", "z"]:
        signal = np.asarray(data[axis].values, dtype=float)

        # Time domain statistics
        stats[f"{axis}_mean"] = float(np.mean(signal))
        stats[f"{axis}_std"] = float(np.std(signal))
        stats[f"{axis}_rms"] = float(np.sqrt(np.mean(signal**2)))
        stats[f"{axis}_peak"] = float(np.max(np.abs(signal)))
        stats[f"{axis}_kurtosis"] = float(
            np.mean((signal - np.mean(signal)) ** 4) / (np.std(signal) ** 4)
        )
        stats[f"{axis}_skewness"] = float(
            np.mean((signal - np.mean(signal)) ** 3) / (np.std(signal) ** 3)
        )

        # Crest factor (peak-to-rms ratio)
        stats[f"{axis}_crest_factor"] = stats[f"{axis}_peak"] / stats[f"{axis}_rms"]

    x_arr = np.asarray(data["x"].values, dtype=float)
    y_arr = np.asarray(data["y"].values, dtype=float)
    z_arr = np.asarray(data["z"].values, dtype=float)

    # Remove DC component (gravity) from each axis
    x_ac = x_arr - np.mean(x_arr)
    y_ac = y_arr - np.mean(y_arr)
    z_ac = z_arr - np.mean(z_arr)

    # Calculate AC-coupled magnitude (pure vibration) - should be close to 0
    magnitude = np.sqrt(x_ac**2 + y_ac**2 + z_ac**2)

    stats["magnitude_mean"] = float(np.mean(magnitude))  # should be v. close to 0
    stats["magnitude_rms"] = float(np.sqrt(np.mean(magnitude**2)))
    stats["magnitude_peak"] = float(np.max(magnitude))

    return StructResult(stats)
```

This algorithm extracts meaningful features from the raw vibration data, including statistical measures like mean, standard deviation, RMS, peak values, and more advanced metrics like kurtosis and skewness.

## Step 5: Create the Second Processor 

Now we're going to create a second processor where we will house our prediction
algorithm.

The language of this processor can be any of the kind supported by the [SDKs](/docs/category/sdks).
We will use python for this example.


Now add the second algorithm that depends on the first. Note the `depends_on` parameter:

```python
@proc.algorithm(
    name="PredictPumpStatus",
    version="1.0.0",
    window_type=OneSecondOfVibrationData,
    depends_on=[produce_summary_statistics],
)
def predict_pump_status(params: ExecutionParams) -> StructResult:
    """
    Use logistic regression to predict whether the pump is on (1) or off (0)
    based on vibration summary statistics from the previous algorithm
    """

    stats = {}
    if params.dependencies:
        for dep in params.dependencies:
            if hasattr(dep.result, "struct_value"):
                stats = json_format.MessageToDict(dep.result.struct_value)

    if not stats:
        raise Exception("No summary statistics available from dependency")

    # Extract features for logistic regression
    features = [
        stats.get("x_rms", 0.0),
        stats.get("x_peak", 0.0),
        stats.get("x_std", 0.0),
        stats.get("y_rms", 0.0),
        stats.get("y_peak", 0.0),
        stats.get("y_std", 0.0),
        stats.get("z_rms", 0.0),
        stats.get("z_peak", 0.0),
        stats.get("z_std", 0.0),
        stats.get("magnitude_rms", 0.0),
    ]

    # Logistic regression coefficients (arbitrary values for demonstration)
    coefficients = np.array(
        [
            0.8,  # x_rms
            0.3,  # x_peak
            0.5,  # x_std
            0.7,  # y_rms
            0.2,  # y_peak
            0.4,  # y_std
            0.9,  # z_rms
            0.1,  # z_peak
            0.6,  # z_std
            1.2,  # magnitude_rms
        ]
    )

    intercept = -5.0  # arbitrary intercept

    # Calculate logits (log-odds)
    features_array = np.array(features)
    logit = np.dot(coefficients, features_array) + intercept

    # Apply sigmoid function to get probability
    probability = 1 / (1 + np.exp(-logit))

    # Threshold at 0.5 to get binary prediction
    prediction = 1 if probability >= 0.5 else 0

    return StructResult(
        {
            "pump_on": prediction,
            "probability": float(probability),
            "logit": float(logit),
        }
    )
```

This algorithm receives the statistics calculated by the first algorithm and applies a logistic regression model to predict whether the pump is on or off.

## Step 6: Register and Start the Processor

Complete `main.py` by adding the registration logic:

```python
if __name__ == "__main__":
    proc.Register()
    proc.Start()
```

## Step 7: Create the Window Emitter

In `window.py`, create a script that emits processing windows every second:

```python
import time
import datetime as dt

import schedule
from main import asset_id, OneSecondOfVibrationData

from orca_python import Window, EmitWindow


def emitWindow() -> None:
    now = dt.datetime.now()
    window = Window(
        time_from=now - dt.timedelta(seconds=1),
        time_to=now,
        name=OneSecondOfVibrationData.name,
        version=OneSecondOfVibrationData.version,
        origin="Example",
        metadata={asset_id.name: 1},
    )
    EmitWindow(window)


schedule.every(1).seconds.do(emitWindow)

if __name__ == "__main__":
    emitWindow()
    while True:
        schedule.run_pending()
        time.sleep(0.5)
```

## Running the Example

1. Ensure that Orca is running:
    ```bash
    orca start
    ```

2. Start the processor in one terminal:
   ```bash
   python main.py
   ```

3. Start the window emitter in another terminal:
   ```bash
   python window.py
   ```

The processor will now receive windows every second, calculate vibration statistics, and predict the pump status based on those statistics.

## Key Takeaways

This example demonstrates several important Orca concepts:

- **Algorithm Dependencies**: The `depends_on` parameter allows you to create processing pipelines where algorithms build on each other's results
- **Independent Versioning**: Each algorithm can be versioned independently, allowing you to update the prediction model without changing the feature engineering. If you want to phase in the results from a new version of the logistics regression, create  a new algorithm with a bumped version. Both will run in parallel.
- **Type Safety**: Window types and metadata fields provide structure and validation to your processing pipeline
- **Composability**: Complex processing pipelines can be built from simple, testable, versioned components

## Next Steps

- Explore more complex dependency chains with multiple algorithms
- Emit a window from an algorithm which triggers a separate DAG
