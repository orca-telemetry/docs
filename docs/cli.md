---
sidebar_position: 2
title: CLI 
description: Install, run the Orca CLI and learn more about the Orca CLI
---

The Orca CLI is a command-line tool for managing the Orca analytics platform
during local development. It handles provisioning, lifecycle management, and
configuration of the Orca stack.

---

## Installation

### Prerequisites

Before installing the Orca CLI, ensure you have Docker installed:

```bash
docker --version
```

If Docker is not installed, follow the [official Docker installation guide](https://docs.docker.com/engine/install/).

### Install via Script

The recommended installation method is using the installation script:

```bash
curl -fsSL https://raw.githubusercontent.com/orc-analytics/cli/main/install-cli.sh | bash
```

This script works on Linux, macOS, and Windows via WSL.

### Manual Installation

Alternatively, you can download the CLI manually from the [GitHub releases page](https://github.com/orc-analytics/cli/releases):

1. Navigate to the latest release
2. Download the appropriate `tar.gz` file for your platform from the Assets section
3. Extract the archive:
   ```bash
   tar -xzf CLI_<VERSION>_*.tar.gz
   ```
4. Move the binary to a location in your PATH:
   ```bash
   sudo mv orca /usr/local/bin/
   ```

### Verify Installation

Confirm the CLI is installed correctly:

```bash
orca --version
```

### Upgrading

To upgrade to the latest version, simply run the installation script again:

```bash
curl -fsSL https://raw.githubusercontent.com/orc-analytics/cli/main/install-cli.sh | bash
```

---

## Commands

### `orca start`

Start the Orca stack by launching the necessary Docker containers.

```bash
orca start
```

This command provisions the local Orca environment, including the core Orca service and
a PostgreSQL database for the data stored by orca (triggering windows, algorithm results, etc.)

**Example:**
```bash
orca start
```

---

### `orca stop`

Stop all running Orca containers without removing them.

```bash
orca stop
```

**Example:**
```bash
orca stop
```

---

### `orca status`

Display the current status of all Orca components.

```bash
orca status
```

Use this command to verify that the Orca stack is running correctly.

**Example:**
```bash
orca status
```

---

### `orca destroy`

Delete all Orca resources, including containers, volumes, and networks.

```bash
orca destroy
```

:::danger

This command is destructive and will remove all local Orca data. Use it
when you need a clean slate or to troubleshoot issues.

:::

**Example:**
```bash
orca destroy
orca start  # Start fresh
```

---

### `orca init`

Initialise an `orca.json` configuration file in the current directory.

```bash
orca init [options]
```

**Options:**

- `-name string`: Specify the project name (defaults to the current directory name)

**Example:**
```bash
orca init -name myproject
```

This creates an `orca.json` file with the following structure:

```json
{
    "projectName": "myproject",
    "orcaConnectionString": "localhost:33670",
    "processorPort": 5377,
    "processorConnectionString": "host.docker.internal:5377"
}
```

---

### `orca sync`

Sync the Orca registry data to a local directory. This is useful for generating type
stubs for your SDK.

```bash
orca sync [options]
```

**Options:**

- `-caCert string`: Path to custom CA certificate file (PEM format) for TLS verification
- `-config string`: Path to `orca.json` configuration file (default: `"orca.json"`)
- `-connStr string`: Orca connection string (defaults to local Orca instance)
- `-out string`: Output directory for Orca registry data (default: `"./"`）
- `-projectName string`: Specify a project to exclude stubs from (defaults to value from `orca.json`, or empty if not found)
- `-sdk string`: The SDK to generate type stubs for - `python|go|typescript|zig|rust` (defaults to inferring from the environment)
- `-secure`: Connect to Orca with System Default Root CA credentials via TLS (only use with custom connection strings that support TLS)

**Examples:**

```bash
# Sync to current directory with auto-detected SDK
orca sync

# Sync to specific directory for Python
orca sync -out ./data -sdk python

# Sync from a custom Orca instance with TLS
orca sync -connStr remote.orca.example.com:33670 -secure -out ./sync
```

---

### `orca help`

Display help information about the CLI and its commands.

```bash
orca help
```

To get help for a specific command:

```bash
orca <command> help
# or
orca <command> -h
```

**Example:**
```bash
orca sync -h
```

---

## Configuration

### orca.json

The `orca.json` file contains configuration details that processors use to connect
to the Orca stack. It is also used by the sync command to **not** generate stubs for
algorithms and windows for processors defined within this project. This file is
created by running `orca init`.

**Structure:**

```json
{
    "projectName": "myproject",
    "orcaConnectionString": "localhost:33670",
    "processorPort": 5377,
    "processorConnectionString": "host.docker.internal:5377"
}
```

**Fields:**

- `projectName`: A unique identifier for your project
- `orcaConnectionString`: The address where Orca core is running (used by processors to register and communicate)
- `processorPort`: The port on which your processor listens for execution requests
- `processorConnectionString`: The address Orca uses to connect back to your processor (typically uses `host.docker.internal` to access the host machine from Docker)

---

## Troubleshooting

### Firewall Issues

**Problem:** Orca (running inside Docker) cannot connect to your processor on the host machine.

**Cause:** If you have `ufw` or another firewall enabled with a default policy that blocks incoming connections, Orca may not be able to reach your processor.

**Solution:** Allow traffic on the processor port defined in your `orca.json`:

```bash
sudo ufw allow 5377/tcp
```

If the processor port in your `orca.json` changes, adjust the command accordingly.

:::note

Completely disabling the firewall is not recommended. Instead, add specific rules
for the ports you need.

:::

---

### Checking Docker Logs

If you encounter issues with the Orca stack, examine the Docker logs:

```bash
docker logs -f orca-instance
```

This will show real-time logs from the Orca core service and can help identify
connection issues, registration problems, or other errors.

---

### Stack Won't Start

If the Orca stack fails to start or exhibits unexpected behavior:

1. Destroy the existing stack:
   ```bash
   orca destroy
   ```

2. Start fresh:
   ```bash
   orca start
   ```

3. Verify the status:
   ```bash
   orca status
   ```

:::danger

This will delete all data stored in your local orca registry. Use with caution.

:::
---

### Version Compatibility

**Pre-v1.0.0:** There may be compatibility issues between the CLI, Orca core and
SDK versions. The latest version of all three will always be compatible. Try and
always use the latest version.

**Post-v1.0.0:** Strict version compatibility requirements will be enforced between the CLI and Orca core. Ensure your CLI version matches the supported core version.

To check your CLI version:

```bash
orca --version
```

To upgrade:

```bash
curl -fsSL https://raw.githubusercontent.com/orc-analytics/cli/main/install-cli.sh | bash
```

---

## Common Workflows

### Initial Setup

```bash
# Install the CLI
curl -fsSL https://raw.githubusercontent.com/orc-analytics/cli/main/install-cli.sh | bash

# Start the Orca stack
orca start

# Verify it's running
orca status

# Initialize a project
mkdir myproject && cd myproject
orca init -name myproject
```

### Daily Development

```bash
# Start Orca if not already running
orca start

# Check status
orca status

# Your development work here...

# Stop Orca when done
orca stop
```

### Resetting Your Environment

```bash
# Completely remove Orca resources
orca destroy

# Start fresh
orca start
```

### Syncing Registry Data

```bash
# Sync registry data and generate Python stubs
orca sync -sdk python -out ./orca_data

# Sync from a remote Orca instance
orca sync -connStr production.orca.com:33670 -secure -out ./prod_sync
```

---

## Additional Resources

- [Quickstart Guide](/docs/quickstart)
- [SDK Documentation](/docs/category/sdks)
- [GitHub Repository](https://github.com/orc-analytics/cli)

For issues or feature requests, please visit the [GitHub issues page](https://github.com/orc-analytics/cli/issues).
