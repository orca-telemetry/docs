---
sidebar_position: 1
title: Python SDK
id: python-sdk
description: Build and register algorithms with Orca in Python
---

The Orca Python SDK allows you to define and register custom Python algorithms
into the Orca framework. With this SDK, you can quickly integrate your analytics
or ML logic into Orca’s distributed DAG execution engine.

---

## Getting Started

Before using the SDK, ensure Orca Core is running. If not, follow the
[Quickstart Guide](/docs/quickstart).

You can test whether Orca is running with the command:

```bash
orca status
```

### 1 - Install the Python SDK

Install the SDK into your Python project:

```bash
pip install orca-python
```

---

### 2 - Define an Algorithm

Create a Python file, e.g. `processor.py`, define a processor, then attach an algorithm to it:

```python
from orca_python import Processor
import time
proc = Processor("ml")

@proc.algorithm("MyAlgo", "1.0.0", "Every30Second", "1.0.0")
def my_algorithm() -> dict:
    time.sleep(5)
    return {"result": 42}
```

### 3 - Start the Processor

Invoke the `Register()` and `Start()` functions on the processor to register it with Orca core:

```python
if __name__ == "__main__":
    proc.Register()
    proc.Start()
```

Now, grab the environment variables exposed by `orca status`:

```bash
orca status
```

```bash
--noCopy
PostgreSQL: running
Connection string: postgresql://orca:orca@localhost:32768/orca?sslmode=disable

Redis: running
Connection string: redis://localhost:32769

Orca: running
Connection string: grpc://localhost:32770

→ Set these environment variables in your Orca SDKs to connect them to Orca:
→     ORCASERVER=grpc://localhost:32770
→     HOST=172.18.0.1
```

The important lines are:

```bash
--noCopy
→ Set these environment variables in your Orca SDKs to connect them to Orca:
→     ORCASERVER=grpc://localhost:32770
→     HOST=172.18.0.1
```

A `PORT` environment variable is also required by the processor:

```bash
--noCopy
PORT=50505
```

Now run the processor:

```bash
ORCASERVER=grpc://localhost:32770 HOST=172.18.0.1 PORT=50505 python processor.py
```

If everything worked. You should see the following logs:

```bash
--noCopy
ORCASERVER=grpc://localhost:32773 HOST=172.18.0.1  PORT=50505 poetry run python ./processor.py
2025-05-18 10:46:23,689 - orca_python.main - INFO - Registering algorithm: MyAlgo_1.0.0 (window: Every30Second_1.0.0)
2025-05-18 10:46:23,689 - orca_python.main - INFO - Preparing to register processor 'ml' with Orca Core
2025-05-18 10:46:23,706 - orca_python.main - INFO - Algorithm registration response recieved: received: true message: "Successfully registered processor"
2025-05-18 10:46:23,706 - orca_python.main - INFO - Starting Orca Processor 'ml' with Python 3.13.1 (main, Feb 15 2025, 16:27:20) [GCC 13.3.0]
2025-05-18 10:46:23,706 - orca_python.main - INFO - Initialising gRPC server with 10 workers
2025-05-18 10:46:23,709 - orca_python.main - INFO - Server listening on address 0.0.0.0:50505
2025-05-18 10:46:23,710 - orca_python.main - INFO - Server started successfully
2025-05-18 10:46:23,710 - orca_python.main - INFO - Server is ready for requests
```

Congrats - your processor is now ready to accept processing requests!

### 4 - Emit a Processing Window

Now that your processor is up and running, you need to trigger it.

This is achieved by emitting a window to Orca Core that algorithms within the processor are triggered by.

If we look in our algorithm registration:

```python
@proc.algorithm("MyAlgo", "1.0.0", "Every30Second", "1.0.0")
```

We see that the algorithm is triggered by a window type of `Every30Second` with version `1.0.0`.

So, we can build a triggering function that triggers a window of this type, every 30 seconds. We'll put this
function in a file called `window.py`:

```python
import time
from orca_python import EmitWindow, Window

def emitWindow():
    now = int(time.time())
    window = Window(time_from=now - 30, time_to=now, name="Every30Second", version="1.0.0", origin="Example")
    EmitWindow(window)
```

And we'll use the `schedule` package to run this function every 30 seconds:

```bash
pip install schedule
```

```python
schedule.every(30).seconds.do(emitWindow)

if __name__=="__main__":
    while True:
        schedule.run_pending()
        time.sleep(1)
```

Now, in a separate terminal, we can run this file to trigger our processor every 30 seconds:

```bash
ORCASERVER=grpc://localhost:32770 HOST=172.18.0.1 PORT=50505 python window.py
```

And after waiting for a bit (30 seconds) we should see that windows are being emitted to Orca Core:

```bash
--noCopy
ORCASERVER=grpc://localhost:32770 HOST=172.18.0.1 PORT=50505 python window.py
2025-05-18 16:31:44,314 - orca_python.main - INFO - Emitting window: Window(time_from=1747582274, time_to=1747582304, name='Every30Second', version='1.0.0', origin='Example')
2025-05-18 16:31:44,339 - orca_python.main - INFO - Window emitted: status: PROCESSING_TRIGGERED

2025-05-18 16:32:14,351 - orca_python.main - INFO - Emitting window: Window(time_from=1747582304, time_to=1747582334, name='Every30Second', version='1.0.0', origin='Example')
2025-05-18 16:32:14,379 - orca_python.main - INFO - Window emitted: status: PROCESSING_TRIGGERED
```

With the processor logs showing that the processing request has been recieved from Orca core and the algorithm is succesfully running:

```bash
--noCopy
2025-05-18 16:31:44,341 - orca_python.main - INFO - Received DAG execution request with 1 algorithms and ExecId: ccb19b964d084da489841b4e6588cbd6
2025-05-18 16:31:44,342 - orca_python.main - INFO - Running algorithm MyAlgo_1.0.0
2025-05-18 16:31:49,344 - orca_python.main - INFO - Completed algorithm: MyAlgo
2025-05-18 16:32:14,383 - orca_python.main - INFO - Received DAG execution request with 1 algorithms and ExecId: c8166cf7310f43e5a09fd70f0542813d
2025-05-18 16:32:14,384 - orca_python.main - INFO - Running algorithm MyAlgo_1.0.0
2025-05-18 16:32:19,385 - orca_python.main - INFO - Completed algorithm: MyAlgo
```

Congratulations 🎉. You've built an end to end analytics scheduler that that will scale seamlessly with your throughput.

## Next Steps

Check out more python examples in our [GitHub repo](https://github.com/Predixus/orca-python/tree/main/examples).

And take a deeper look into the [Orca architecture](/docs/architecture/data-model), including how you can access the results from your algorithms in an
efficient manner - yes, Orca tracks _everything_.

---
