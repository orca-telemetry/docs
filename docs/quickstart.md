---
sidebar_position: 1
title: Quickstart Guide
description: Develop with Orca locally
---

Welcome to Orca - the orchestration framework for running analytics on
realtime data, at scale.

This guide will walk you through setting up Orca locally so you can start
building and running custom algorithms on telemetry streams own algorithms in minutes.

---

## 1 - Install the Orca CLI

The Orca CLI helps you manage the life cycle of Orca services locally. Orca is built
on top of open source resources, and containerisation is used to manage them when
developing locally.

So, before installing the CLI, **make sure Docker is installed** on your machine.

```bash
docker --version
```

### For Linux / macOS / Windows via [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

Run:

```bash
curl -fsSL https://raw.githubusercontent.com/orc-analytics/orca/main/install-cli.sh | bash
```

---

## 2 - Start the Orca Stack

With the CLI installed, launch the Orca-Core stack:

```bash
orca start
```

Verify the system is running and retrieve connection details:

```bash
orca status
```

You should see something like this:

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

If Orca is not running, start the stack with the command `orca start`.

## 3 - Start Developing

Once the orca stack is running, you're ready to register your first algorithm
using one of the SDKs:

- [Python](/docs/sdks/python)

For this example we will use python, but the pattern is similar language to
language.

### Defining a Window

The triggering element to all Orca analytics are `Windows`. Windows define
a period of time where an event of a particular type has occurred.

## Building a Trigger

Analytics built within the Orca framework need to be *triggered*. They are triggered
by `Windows` via the `EmitWindow` function.
