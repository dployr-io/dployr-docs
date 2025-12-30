# CLI Commands

Complete reference for the dployr command-line interface.

## Installation

The CLI is included with the dployrd daemon installation.

## Authentication

```bash
# Authenticate with the control plane
dployr auth login

# Check authentication status
dployr auth status

# Logout
dployr auth logout
```

## Deployment

### Deploy an Application

```bash
dployr deploy \
  --name <name> \
  --source <remote|local|docker> \
  --runtime <runtime> \
  --version <version> \
  --remote <git-url> \
  --branch <branch> \
  --build-cmd "<command>" \
  --run-cmd "<command>" \
  --working-dir "<directory>" \
  --port <port>
```

### List Deployments

```bash
# List all deployments
dployr list

# List deployments for a specific project
dployr list --project <project-name>
```

### Get Deployment Details

```bash
dployr get <deployment-name>
```

### Delete Deployment

```bash
dployr delete <deployment-name>
```

## Service Management

### Start Service

```bash
dployr service start <service-name>
```

### Stop Service

```bash
dployr service stop <service-name>
```

### Restart Service

```bash
dployr service restart <service-name>
```

### Service Status

```bash
dployr service status <service-name>
```

### Service Logs

```bash
# View logs
dployr logs <service-name>

# Follow logs
dployr logs <service-name> --follow

# Tail last N lines
dployr logs <service-name> --tail 100
```

## Proxy Configuration

### Add Route

```bash
dployr proxy add \
  --domain <domain> \
  --service <service-name> \
  --port <port>
```

### List Routes

```bash
dployr proxy list
```

### Remove Route

```bash
dployr proxy remove --domain <domain>
```

## Instance Management

### List Instances

```bash
dployr instances
```

### Instance Details

```bash
dployr instance <instance-id>
```

## Project Management

### Create Project

```bash
dployr project create <project-name>
```

### List Projects

```bash
dployr project list
```

### Delete Project

```bash
dployr project delete <project-name>
```

## Environment Variables

### Set Variable

```bash
dployr env set <service-name> KEY=value
```

### List Variables

```bash
dployr env list <service-name>
```

### Unset Variable

```bash
dployr env unset <service-name> KEY
```

## Global Options

```bash
--config <path>     # Path to config file
--verbose           # Verbose output
--json              # Output in JSON format
--help              # Show help
--version           # Show version
```

## Examples

### Deploy Node.js Application

```bash
dployr deploy \
  --name my-api \
  --source remote \
  --runtime nodejs \
  --version 20 \
  --remote https://github.com/user/repo \
  --branch main \
  --build-cmd "npm install" \
  --run-cmd "npm start" \
  --port 3000
```

### Deploy Python Application

```bash
dployr deploy \
  --name my-app \
  --source remote \
  --runtime python \
  --version 3.11 \
  --remote https://github.com/user/repo \
  --branch main \
  --build-cmd "pip install -r requirements.txt" \
  --run-cmd "python app.py" \
  --port 8000
```

### Deploy Static Site

```bash
dployr deploy \
  --name my-site \
  --source remote \
  --runtime static \
  --remote https://github.com/user/repo \
  --branch main \
  --build-cmd "npm run build" \
  --working-dir "dist"
```

### Deploy Docker Container

```bash
dployr deploy \
  --name my-container \
  --source docker \
  --image nginx:latest \
  --port 80
```

## Next Steps

- [Learn about deployment](/docs/deployment)
- [Configure proxy routing](/docs/configuration)
- [View API reference](/docs/api)
