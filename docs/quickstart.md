---
sidebar_position: 1
title: Quickstart Guide
description: Get started developing with Orca. 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will walk you through setting up Orca locally so
you can start building and running custom algorithms on realtime data.

---

## 1. Check Docker is Installed

Before installing the Orca CLI, verify that Docker is installed since
the CLI uses it to spin up supporting services:

```bash
docker --version
```

If you don't have Docker installed, follow [these instructions](https://docs.docker.com/engine/install/).

## 2. Install the Orca CLI

Run the following install script:

```bash
curl -fsSL https://raw.githubusercontent.com/orc-analytics/cli/main/install-cli.sh | bash
```

The Orca CLI is used to provision Orca when developing locally and manage
the Orca lifecycle. All major platforms are supported, though this install
script will only work on Linux, MacOS, and Windows via WSL.

Verify the installation:

```bash
orca --version
```

## 3. Start the Orca Stack

With the CLI installed, launch the Orca stack:

```bash
orca start
```

This command installs the necessary Docker containers to get Orca running locally.

Verify the Orca systems are running:

```bash
orca status
```

If Orca is not running, try destroying the stack and restarting it:

```bash
orca destroy
orca start
```

## 4. Initialise a Processor 

Once the Orca stack is running, you're ready to register your first algorithm.
Orca supports multiple programming languages including Python, Go, TypeScript/JavaScript,
and Rust. You can find the full SDK documentation at [here](/docs/category/sdks).

:::info
Currently on the Python SDK is in a workable state. Stay up to date with SDK releases 
by signing up to our [newsletter](#newsletter).
:::

For this example, we'll use Python, but the pattern is similar across languages.

Start by creating a new directory:

```bash
mkdir myOrcaProcessor && cd myOrcaProcessor
```

Within this directory, initialise the Orca configuration:

```bash
orca init
```

This creates an `orca.json` configuration file containing the connection details that the processor needs to connect to Orca.

Now initialise a Python project and install the Orca SDK:

<Tabs groupId="package-manager">
  <TabItem value="pip" label="pip" default>
```bash
python -m venv .venv 
source ./.venv/bin/activate
python -m pip install orca-python
touch main.py
```
  </TabItem>
  <TabItem value="poetry" label="Poetry">
```bash
poetry init
poetry add orca-python@latest
touch main.py
```
  </TabItem>
  <TabItem value="uv" label="uv">
```bash
uv venv
source .venv/bin/activate
uv pip install orca-python
touch main.py
```
  </TabItem>
</Tabs>

## 5. Define and Register a Processor

Open `main.py` and define your processor. A processor contains one or more algorithms
that execute in response to time-based windows:

```python
from orca_python import (
    Processor,
    WindowType,
    StructResult,
    MetadataField,
    ExecutionParams,
)

# Create a processor with a descriptive name
proc = Processor("ml")

# Define metadata that will be passed with each window
asset_id = MetadataField(name="asset_id", description="The unique ID of the asset.")

# Define a window type that triggers every 30 seconds
Every30Second = WindowType(
    name="Every30Second",
    version="1.0.0",
    description="Triggers every 30 seconds",
    metadataFields=[asset_id],
)


# Define the algorithm that runs when the window triggers
@proc.algorithm(name="LinearRegression", version="1.0.0", window_type=Every30Second)
def linear_regression(params: ExecutionParams) -> StructResult:
    """
    A simple function that gets some data, performs a linear
    regression on it, and returns the fit parameters
    """
    # Retrieve the asset ID from the triggering window
    asset_id = params.window.metadata.get("asset_id", None)
    _ = asset_id

    # In a real implementation, you would fetch and process data:
    #   asset_data_for_window = my_data_func(
    #       params.window.time_from,
    #       params.window.time_to,
    #       asset_id
    #   )
    #   fit_data = perform_fit(asset_data_for_window)

    # For this example, we return stubbed values
    return StructResult({"m": 10, "c": -1})

if __name__ == "__main__":
    proc.Register()
    proc.Start()
```

The `proc.Register()` call contacts Orca and provides details about this processor. The `proc.Start()` function then starts serving the processor, making it ready to execute algorithms when windows are emitted.

Run the processor:

<Tabs groupId="run-processor">
  <TabItem value="pip" label="pip" default>
```bash
python main.py
```
  </TabItem>
  <TabItem value="poetry" label="Poetry">
```bash
poetry run python main.py
```
  </TabItem>
  <TabItem value="uv" label="uv">
```bash
uv run main.py
```
  </TabItem>
</Tabs>

Leave this running in your terminal.

## 6. Emit a Window

Now that your processor is running, you need to emit windows to trigger the algorithm execution. In a separate terminal (in the same directory), create a window emitter file:

```bash
touch window.py
```

Install the `schedule` package to emit windows on a regular cadence:

<Tabs groupId="install-schedule">
  <TabItem value="pip" label="pip" default>
```bash
python -m pip install schedule
```
  </TabItem>
  <TabItem value="poetry" label="Poetry">
```bash
poetry add schedule@latest
```
  </TabItem>
  <TabItem value="uv" label="uv">
```bash
uv add schedule
```
  </TabItem>
</Tabs>

Open `window.py` and add the following code to construct and emit `Every30Second` windows:

```python
import time
import datetime as dt

import schedule

from orca_python import Window, EmitWindow

def emitWindow() -> None:
    now = dt.datetime.now()
    window = Window(
        time_from=now - dt.timedelta(seconds=30),
        time_to=now,
        name="Every30Second",
        version="1.0.0",
        origin="Example",
        metadata={"asset_id": 1},  # A dummy ID for now
    )
    EmitWindow(window)

schedule.every(30).seconds.do(emitWindow)

if __name__ == "__main__":
    emitWindow()
    while True:
        schedule.run_pending()
        time.sleep(1)
```

Run the window emitter:

<Tabs groupId="run-window-emitter">
  <TabItem value="pip" label="pip" default>
```bash
python window.py
```
  </TabItem>
  <TabItem value="poetry" label="Poetry">
```bash
poetry run python window.py
```
  </TabItem>
  <TabItem value="uv" label="uv">
```bash
uv run window.py
```
  </TabItem>
</Tabs>

## 7. Verify It's Working

You should now see logs in both terminals showing the system in action.

**Window Emitter Logs:**

```bash
$ poetry run python window.py
2026-01-03 22:43:04,099 - orca_python.main - INFO - Emitting window: Window(time_from=datetime.datetime(2026, 1, 3, 22, 42, 34, 99232), time_to=datetime.datetime(2026, 1, 3, 22, 43, 4, 99232), name='Every30Second', version='1.0.0', origin='Example', metadata={'asset_id': 1})
2026-01-03 22:43:04,121 - orca_python.main - INFO - Window emitted: status: PROCESSING_TRIGGERED

2026-01-03 22:43:34,130 - orca_python.main - INFO - Emitting window: Window(time_from=datetime.datetime(2026, 1, 3, 22, 43, 4, 130135), time_to=datetime.datetime(2026, 1, 3, 22, 43, 34, 130135), name='Every30Second', version='1.0.0', origin='Example', metadata={'asset_id': 1})
2026-01-03 22:43:34,150 - orca_python.main - INFO - Window emitted: status: PROCESSING_TRIGGERED
```

**Processor Logs:**

```bash
2026-01-03 22:42:57,515 - orca_python.main - INFO - Starting Orca Processor 'ml' with Python 3.13.1 (main, Feb 15 2025, 16:27:20) [GCC 13.3.0]
2026-01-03 22:42:57,515 - orca_python.main - INFO - Initialising gRPC server with 10 workers
2026-01-03 22:42:57,520 - orca_python.main - INFO - Server listening on address 0.0.0.0:5377
2026-01-03 22:42:57,521 - orca_python.main - INFO - Server started successfully
2026-01-03 22:42:57,521 - orca_python.main - INFO - Server is ready for requests
2026-01-03 22:43:04,133 - orca_python.main - INFO - Received DAG execution request with 1 algorithms and ExecId: 1770c55a7f444055b5c94815219ec472
2026-01-03 22:43:04,133 - orca_python.main - INFO - Running algorithm LinearRegression_1.0.0
2026-01-03 22:43:04,134 - orca_python.main - INFO - Completed algorithm: LinearRegression
2026-01-03 22:43:34,164 - orca_python.main - INFO - Received DAG execution request with 1 algorithms and ExecId: 173d4796523e4276bec0815cd0840459
2026-01-03 22:43:34,164 - orca_python.main - INFO - Running algorithm LinearRegression_1.0.0
2026-01-03 22:43:34,164 - orca_python.main - INFO - Completed algorithm: LinearRegression
```

Congratulations! You've just built a production-ready analytics scheduling engine 🥳

## Next Steps

This simple example demonstrates Orca's baseline capability to schedule analytics based on time-based triggers. However, Orca can do much more. 

For more advanced scenarios, check out our [examples](/docs/category/examples) on algorithm dependency management, running multiple processors in the same workspace, and building cross-platform processors with dependencies between them.
