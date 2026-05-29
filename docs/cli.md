---
title: dployr CLI Reference
description: Deploy and manage dployr services from the terminal. Full CLI reference for auth, deploy, logs, services, env vars, domains, and projects.
---

# dployr CLI

The dployr CLI lets you deploy and manage services from the terminal. It talks to the same Base control plane as the dashboard, so everything you can do in one, you can do in the other.

## Installation

Install the CLI with a single command:

```bash
# Linux/macOS
curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh | bash

# Windows (PowerShell as Administrator)
iwr "https://raw.githubusercontent.com/dployr-io/dployr/master/install.ps1" -OutFile install.ps1
.\install.ps1
```

## Authentication

```bash
# Log in
dployr auth login

# Check you're logged in
dployr auth status

# Log out
dployr auth logout
```

## Deploying

```bash
dployr deploy \
  --name my-api \
  --source remote \
  --runtime nodejs \
  --version 20 \
  --remote https://github.com/your-org/your-repo \
  --branch main \
  --build-cmd "npm install" \
  --run-cmd "npm start" \
  --port 3000
```

Common `--source` values: `remote` (git repo), `docker` (Docker image).

### Examples

**Python app:**
```bash
dployr deploy \
  --name my-api \
  --source remote \
  --runtime python \
  --version 3.11 \
  --remote https://github.com/your-org/your-repo \
  --branch main \
  --build-cmd "pip install -r requirements.txt" \
  --run-cmd "python app.py" \
  --port 8000
```

**Docker container:**
```bash
dployr deploy \
  --name my-app \
  --source docker \
  --image your-org/your-image:latest \
  --port 3000
```

**Static site:**
```bash
dployr deploy \
  --name my-site \
  --source remote \
  --runtime static \
  --remote https://github.com/your-org/your-repo \
  --branch main \
  --build-cmd "npm run build" \
  --working-dir "dist"
```

## Managing deployments

```bash
# List all services
dployr list

# List services in a specific project
dployr list --project my-project

# Get details for a service
dployr get my-api

# Delete a service
dployr delete my-api
```

## Service control

```bash
dployr service start my-api
dployr service stop my-api
dployr service restart my-api
dployr service status my-api
```

## Logs

```bash
# View recent logs
dployr logs my-api

# Follow live
dployr logs my-api --follow

# Last 100 lines
dployr logs my-api --tail 100
```

## Environment variables

```bash
# Set a variable
dployr env set my-api KEY=value

# List variables
dployr env list my-api

# Remove a variable
dployr env unset my-api KEY
```

## Custom domains

```bash
# Add a domain
dployr domain add yourdomain.com --service my-api 

# List domains
dployr domain list

# Remove a domain
dployr domain remove yourdomain.com
```

## Projects

Projects let you group related services together.

```bash
dployr project create my-project
dployr project list
dployr project delete my-project
```

## Instances

```bash
# List instances in your cluster
dployr instances

# Details for a specific instance
dployr instance <instance-id>
```

## Global flags

```bash
--config <path>   # Use a specific config file
--verbose         # Verbose output
--json            # Output as JSON
--help            # Help for any command
--version         # CLI version
```
