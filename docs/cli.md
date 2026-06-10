---
title: dployr CLI
description: Install the dployr CLI and manage services, deployments, logs, instances, and clusters from your terminal.
---

# dployr CLI

The CLI talks to the same control plane as the dashboard. Anything you can do there, you can do here.

## Installation

**macOS**
```bash
brew install dployr-io/dployr/dployr
```

**Windows**
```powershell
scoop bucket add dployr https://github.com/dployr-io/scoop-dployr
scoop install dployr
```

**Linux / macOS (script)**
```bash
curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh | bash
```

**Windows (script)**
```powershell
iwr https://raw.githubusercontent.com/dployr-io/dployr/master/install.ps1 | iex
```

## Authentication

```bash
dployr auth login --email you@example.com
```

dployr sends a one-time code to that address. Paste it in and you're logged in. Your session is saved to `~/.dployr/config.json`.

```bash
# Check who you're logged in as
dployr auth status

# Log out
dployr auth logout
```

### Using an API token

For CI/CD and scripts, use a token instead of an interactive login. Create one under **Settings > Security > New token**, or from the CLI:

```bash
dployr auth tokens create --name "github-actions" --scope oidc:bind
```

If you have TOTP enabled, the CLI will ask for your authenticator code before creating or revoking a token.

Set the token as an environment variable:

```bash
export DPLOYR_TOKEN=dpat_x7k2mq9p.aB3nP...
```

See [Security](/docs/security) for scopes and token management.

## Context

All commands scope to an active cluster. Set it once and it sticks.

```bash
# Show the active cluster
dployr context show

# List all clusters you have access to
dployr context list

# Switch clusters
dployr context use my-cluster
```

You can also pass `--cluster <name>` on any command to target a different cluster without changing the saved context.

## Services

```bash
# List services
dployr services list

# Get details for a service
dployr services get my-api

# Start a stopped service
dployr services start my-api

# Stop a running service
dployr services stop my-api

# Delete a service
dployr services delete my-api

# Skip the confirmation prompt
dployr services delete my-api --force
```

`services list` also accepts `ls`. `services delete` accepts `rm` and `remove`.

## Deployments

A deployment is a build and run configuration. Creating one builds your code and starts the service.

```bash
# List recent deployments
dployr deployments list

# Get deployment details
dployr deployments get my-api

# Delete a deployment
dployr deployments delete my-api
```

### Creating a deployment

From a git repository:

```bash
dployr deployments create \
  --name my-api \
  --source remote \
  --runtime nodejs \
  --runtime-version 20 \
  --remote https://github.com/your-org/your-repo \
  --branch main \
  --build-cmd "npm install" \
  --run-cmd "npm start" \
  --port 3000
```

From a Docker image:

```bash
dployr deployments create \
  --name my-api \
  --source image \
  --runtime nodejs \
  --image registry.example.com/your-org/your-image:latest \
  --port 3000
```

Pass environment variables with `--env`. It's repeatable:

```bash
dployr deployments create \
  --name my-api \
  --source remote \
  --runtime python \
  --runtime-version 3.11 \
  --remote https://github.com/your-org/your-repo \
  --branch main \
  --run-cmd "python app.py" \
  --port 8000 \
  --env DATABASE_URL=postgres://... \
  --env REDIS_URL=redis://...
```

After creating a deployment, follow the build output with:

```bash
dployr logs my-api --build
```

Full flag list for `deployments create`:

| Flag | Description |
|---|---|
| `--name` | Deployment name (required) |
| `--source` | `remote` for a git repo, `image` for a Docker image (required) |
| `--runtime` | `golang`, `nodejs`, `python`, `php`, `ruby`, `dotnet`, `java` (required) |
| `--runtime-version` | Runtime version, e.g. `20`, `3.11`, `1.22` |
| `--type` | Service type: `web`, `worker`, `static`, `job` |
| `--remote` | Git remote URL (required when `--source=remote`) |
| `--branch` | Branch to deploy from |
| `--commit` | Deploy a specific commit hash |
| `--image` | Docker image (required when `--source=image`) |
| `--build-cmd` | Build command |
| `--run-cmd` | Start command |
| `--port` | Port your app listens on |
| `--working-dir` | Working directory inside the container |
| `--static-dir` | Directory to serve as static files |
| `--health-check` | HTTP path for health checks, e.g. `/health` |
| `--domain` | Custom domain to attach |
| `--env KEY=VALUE` | Environment variable, repeatable |
| `--secret KEY=VALUE` | Secret, repeatable, encrypted |
| `--force-rebuild` | Force a fresh build even if a cached image exists |
| `--description` | Description |

## Logs

```bash
# Recent logs
dployr logs my-api

# Stream live
dployr logs my-api --follow

# Build phase only
dployr logs my-api --build

# Last 50 lines
dployr logs my-api --lines 50

# Logs from the past two hours
dployr logs my-api --since 2h

# Logs since a specific time
dployr logs my-api --since 2025-06-01T12:00:00Z
```

Logs come from two phases: **build** (the build node cloning your repo and building the image) and **runtime** (your container's stdout and stderr on the instance). Both are shown together by default.

## Instances

```bash
# List instances
dployr instances list

# Filter by role
dployr instances list --role instance
dployr instances list --role build

# Get instance details
dployr instances get <tag>

# Check if an instance is reachable
dployr instances ping <tag>

# Delete an instance
dployr instances delete <tag>
```

### System operations

Low-level operations for when you need to reach into an instance directly. These require admin access.

```bash
# Trigger dployr installation on the instance
dployr instances system install <tag>

# Reboot the machine
dployr instances system reboot <tag>

# Restart the dployrd daemon without rebooting
dployr instances system restart <tag>
```

## Clusters

```bash
# List your clusters
dployr clusters list

# Get cluster details
dployr clusters get my-cluster
```

### Team members

```bash
# List members
dployr clusters users list

# Invite someone (default role: developer)
dployr clusters users add alice@example.com

# Invite with a specific role
dployr clusters users add alice@example.com --role admin

# Remove a member by their user ID
dployr clusters users remove <user-id>
```

Roles: `owner`, `admin`, `developer`, `viewer`.

### Invites

```bash
# See pending invites
dployr clusters invites list

# Accept an invite
dployr clusters invites accept my-cluster

# Decline an invite
dployr clusters invites decline my-cluster
```

## Output format

Commands print a table by default. Pass `-o json` to get JSON output instead:

```bash
dployr services list -o json
dployr deployments get my-api -o json
```

## Global flags

| Flag | Description |
|---|---|
| `-o, --output` | Output format: `table` (default) or `json` |
| `-c, --cluster` | Target cluster for this command |
| `--api-url` | Override the API base URL (or set `DPLOYR_API_URL`) |
| `--help` | Help for any command |
