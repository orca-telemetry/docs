---
sidebar_position: 1
title: Python
id: python
description: Build and register algorithms with Orca in Python
---

The Orca Python SDK provides a framework for building, registering, and executing algorithms that integrate with the Orca gRPC service. Algorithms can have dependencies managed by Orca-core and are triggered by time-windowed events.

---


## Overview

Orca enables you to:
- Define algorithms as Python functions with declarative metadata
- Specify dependencies between algorithms
- Register algorithms with the Orca Core service
- Execute algorithms in response to time-windowed triggers
- Emit windows to trigger algorithm execution

## Installation

```bash
pip install orca-python
```

```python
from orca_python import Processor, WindowType, MetadataField, Window
from orca_python import ValueResult, ArrayResult, StructResult, NoneResult
from orca_python import ExecutionParams, EmitWindow
```

## Core Concepts

### Processor

The `Processor` class is the main entry point for the SDK. It manages algorithm registration, execution, and communication with Orca Core.

```python
processor = Processor(name="MyProcessor", max_workers=10)
```

**Parameters:**
- `name` (str): Unique identifier for this processor
- `max_workers` (int, optional): Maximum number of worker threads for concurrent execution. Default: 10

**Methods:**
- `algorithm()`: Decorator for registering algorithm functions
- `Register()`: Registers all algorithms with Orca Core
- `Start()`: Starts the gRPC server to handle execution requests

### WindowType

Defines the type of time window that triggers algorithm execution.

```python
window_type = WindowType(
    name="HourlyWindow",
    version="1.0.0",
    description="Processes data on an hourly basis",
    metadataFields=[
        MetadataField(name="region", description="Geographic region"),
        MetadataField(name="sensor_id", description="Sensor identifier")
    ]
)
```

**Parameters:**
- `name` (str): Window type name in PascalCase
- `version` (str): Semantic version (e.g., "1.0.0")
- `description` (str): Description of the window type
- `metadataFields` (List[MetadataField], optional): Additional metadata fields

### MetadataField

Defines metadata that can be attached to windows.

```python
field = MetadataField(
    name="region",
    description="Geographic region for data processing"
)
```

### Window

Represents a time window instance that triggers algorithm execution.

```python
window = Window(
    time_from=datetime(2024, 1, 1, 0, 0),
    time_to=datetime(2024, 1, 1, 1, 0),
    name="HourlyWindow",
    version="1.0.0",
    origin="sensor-123",
    metadata={"region": "us-west", "sensor_id": "abc-456"}
)
```

**Attributes:**
- `time_from` (datetime): Start of the time window
- `time_to` (datetime): End of the time window
- `name` (str): Window type name
- `version` (str): Window type version
- `origin` (str): Source identifier
- `metadata` (Dict[str, Any], optional): Additional metadata

## Result Types

Algorithms must return one of four result types:

### ValueResult

For single numeric or boolean values.

```python
from orca_python import ValueResult

def my_algorithm(params: ExecutionParams) -> ValueResult:
    return ValueResult(42.0)
```

### ArrayResult

For arrays of numeric or boolean values.

```python
from orca_python import ArrayResult

def my_algorithm(params: ExecutionParams) -> ArrayResult:
    return ArrayResult([1, 2, 3, 4, 5])
```

### StructResult

For dictionary-based structured results.

```python
from orca_python import StructResult

def my_algorithm(params: ExecutionParams) -> StructResult:
    return StructResult({
        "min": -1.1,
        "median": 4.2,
        "max": 5.0
    })
```

### NoneResult

For algorithms that produce no output (side effects only).

```python
from orca_python import NoneResult

def my_algorithm(params: ExecutionParams) -> NoneResult:
    # Perform side effects
    return NoneResult()
```

## Defining Algorithms

Use the `@processor.algorithm()` decorator to register functions as algorithms.

```python
@processor.algorithm(
    name="CalculateAverage",
    version="1.0.0",
    window_type=hourly_window,
    description="Calculates the average of sensor readings",
    depends_on=[]
)
def calculate_average(params: ExecutionParams) -> ValueResult:
    """Computes the average value from sensor data."""
    # Access the triggering window
    window = params.window
    
    # Your algorithm logic here
    result = compute_average(window)
    
    return ValueResult(result)
```

**Decorator Parameters:**
- `name` (str): Algorithm name in PascalCase
- `version` (str): Semantic version (e.g., "1.0.0")
- `window_type` (WindowType): The window type that triggers this algorithm
- `description` (str, optional): Description of the algorithm. Uses docstring if not provided
- `depends_on` (List[Callable], optional): List of algorithm functions this depends on

**Function Parameters:**
- `params` (ExecutionParams): Execution context containing window and dependency results

### ExecutionParams

The `ExecutionParams` object provides context for algorithm execution.

```python
@dataclass
class ExecutionParams:
    window: Window  # The triggering window
    dependencies: Optional[Iterable[AlgorithmResult]]  # Results from dependencies
```

**Attributes:**
- `window`: The time window that triggered this execution
- `dependencies`: Results from dependency algorithms (if any)

## Algorithm Dependencies

Algorithms can depend on other algorithms. Dependencies are automatically resolved and executed before the dependent algorithm.

```python
# Base algorithm
@processor.algorithm(
    name="FetchData",
    version="1.0.0",
    window_type=hourly_window
)
def fetch_data(params: ExecutionParams) -> ArrayResult:
    data = fetch_from_source(params.window)
    return ArrayResult(data)

# Dependent algorithm
@processor.algorithm(
    name="ProcessData",
    version="1.0.0",
    window_type=hourly_window,
    depends_on=[fetch_data]
)
def process_data(params: ExecutionParams) -> StructResult:
    # Access dependency results
    if params.dependencies:
        for dep in params.dependencies:
            # Extract values based on result type
            if hasattr(dep.result, 'float_values'):
                data = list(dep.result.float_values.values)
            elif hasattr(dep.result, 'single_value'):
                data = dep.result.single_value
            elif hasattr(dep.result, 'struct_value'):
                data = json_format.MessageToDict(dep.result.struct_value)
    
    processed = analyze(data)
    return StructResult(processed)
```

## Emitting Windows

Emit windows to trigger algorithm execution across the Orca system.

```python
from orca_python import EmitWindow
import datetime as dt

window = Window(
    time_from=dt.datetime(2024, 1, 1, 0, 0),
    time_to=dt.datetime(2024, 1, 1, 1, 0),
    name="HourlyWindow",
    version="1.0.0",
    origin="data-pipeline",
    metadata={"region": "us-east"}
)

EmitWindow(window)
```

## Complete Example

```python
from orca_python import (
    Processor, WindowType, MetadataField, ExecutionParams,
    ValueResult, ArrayResult, StructResult, EmitWindow, Window
)
import datetime as dt

# Initialize processor
processor = Processor(name="DataProcessor", max_workers=10)

# Define window type
hourly_window = WindowType(
    name="HourlyWindow",
    version="1.0.0",
    description="Hourly data processing window",
    metadataFields=[
        MetadataField(name="sensor_id", description="Sensor identifier")
    ]
)

# Define base algorithm
@processor.algorithm(
    name="CollectMetrics",
    version="1.0.0",
    window_type=hourly_window,
    description="Collects raw metrics from sensors"
)
def collect_metrics(params: ExecutionParams) -> ArrayResult:
    sensor_id = params.window.metadata.get("sensor_id")
    metrics = fetch_sensor_data(sensor_id, params.window.time_from, params.window.time_to)
    return ArrayResult(metrics)

# Define dependent algorithm
@processor.algorithm(
    name="AnalyzeMetrics",
    version="1.0.0",
    window_type=hourly_window,
    depends_on=[collect_metrics],
    description="Analyzes collected metrics"
)
def analyze_metrics(params: ExecutionParams) -> StructResult:
    # Extract dependency data
    metrics = []
    if params.dependencies:
        for dep in params.dependencies:
            if hasattr(dep.result, 'float_values'):
                metrics = list(dep.result.float_values.values)
    
    analysis = {
        "mean": sum(metrics) / len(metrics),
        "min": min(metrics),
        "max": max(metrics)
    }
    return StructResult(analysis)

# Register with Orca Core
processor.Register()

# Start the processor
processor.Start()

# In another part of your system, emit windows to trigger execution
window = Window(
    time_from=dt.datetime.now() - dt.timedelta(hours=1),
    time_to=dt.datetime.now(),
    name="HourlyWindow",
    version="1.0.0",
    origin="scheduler",
    metadata={"sensor_id": "sensor-001"}
)
EmitWindow(window)
```

## Validation Rules

### Algorithm Names
- Must be in PascalCase
- Pattern: `^[A-Z][a-zA-Z0-9]*$`

### Window Names
- Must be in PascalCase
- Pattern: `^[A-Z][a-zA-Z0-9]*$`

### Versions
- Must follow semantic versioning
- Pattern: `^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$`
- Example: "1.0.0", "2.1.3"

## Error Handling

The SDK includes several exception types:

- `InvalidAlgorithmArgument`: Raised for invalid algorithm configuration
- `InvalidWindowArgument`: Raised for invalid window configuration
- `InvalidDependency`: Raised when a dependency is not properly registered
- `InvalidAlgorithmReturnType`: Raised when algorithm return type doesn't match annotation
- `InvalidMetadataFieldArgument`: Raised for invalid metadata field configuration
- `BrokenRemoteAlgorithmStubs`: Raised when remote algorithm stubs are corrupted

## Environment Configuration

The SDK uses environment variables for configuration:

- `ORCA_CORE`: Address of Orca Core service
- `PROCESSOR_PORT`: Port for the processor gRPC server
- `PROCESSOR_HOST`: Host address for the processor
- `PROCESSOR_EXTERNAL_PORT`: External port for processor registration
- `PROJECT_NAME`: Optional project name for multi-project deployments

## Logging

The SDK uses Python's standard logging module. Configure logging level as needed:

```python
import logging
logging.basicConfig(level=logging.INFO)
```

Log levels used:
- `INFO`: Algorithm execution, registration events
- `DEBUG`: Detailed execution flow, dependency resolution
- `ERROR`: Execution failures, registration errors
