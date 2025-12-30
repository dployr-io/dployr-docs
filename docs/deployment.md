# Deployment

Guide to deploying applications with dployr.

## Deployment Sources

### Remote Git Repository

Deploy from a Git repository:

```bash
dployr deploy \
  --name my-app \
  --source remote \
  --runtime nodejs \
  --version 20 \
  --remote https://github.com/user/repo \
  --branch main \
  --build-cmd "npm install" \
  --run-cmd "npm start" \
  --port 3000
```

### Local Directory

Deploy from a local directory:

```bash
dployr deploy \
  --name my-app \
  --source local \
  --runtime nodejs \
  --version 20 \
  --path /path/to/app \
  --build-cmd "npm install" \
  --run-cmd "npm start" \
  --port 3000
```

### Docker Image

Deploy a Docker container:

```bash
dployr deploy \
  --name my-container \
  --source docker \
  --image nginx:latest \
  --port 80
```

## Deployment Lifecycle

1. **Source Fetch**: Code is cloned or pulled from the source
2. **Build**: Build commands are executed
3. **Runtime Setup**: Runtime environment is configured via vfox
4. **Service Start**: Application is started with run command
5. **Health Check**: Service health is verified
6. **Routing**: Traffic is routed to the service

## Build Commands

Build commands are executed before starting the service:

```bash
# Node.js
--build-cmd "npm install && npm run build"

# Python
--build-cmd "pip install -r requirements.txt"

# Go
--build-cmd "go build -o app"

# Static site
--build-cmd "npm run build"
```

## Run Commands

Run commands start your application:

```bash
# Node.js
--run-cmd "npm start"

# Python
--run-cmd "python app.py"

# Go
--run-cmd "./app"

# Custom
--run-cmd "./start.sh"
```

## Working Directory

Specify the working directory for your application:

```bash
--working-dir "src"           # Relative to repository root
--working-dir "dist"          # For built static sites
--working-dir "backend/api"   # For monorepos
```

## Environment Variables

Set environment variables for your deployment:

```bash
# During deployment
dployr deploy \
  --name my-app \
  --env NODE_ENV=production \
  --env API_KEY=secret

# After deployment
dployr env set my-app NODE_ENV=production
dployr env set my-app API_KEY=secret
```

## Port Configuration

Specify the port your application listens on:

```bash
--port 3000    # Single port
--port 8080    # Custom port
```

## Health Checks

dployr automatically performs health checks:
- HTTP health check on the specified port
- Process status monitoring
- Automatic restart on failure

## Rollback

Rollback to a previous deployment:

```bash
dployr rollback <deployment-name>
```

## Zero-Downtime Deployment

dployr supports zero-downtime deployments:
1. New version is deployed alongside the old version
2. Health checks verify the new version
3. Traffic is gradually shifted to the new version
4. Old version is terminated after successful migration

## Deployment Strategies

### Blue-Green Deployment

Deploy to a new environment and switch traffic:

```bash
# Deploy to green environment
dployr deploy --name my-app-green ...

# Switch traffic
dployr proxy update --service my-app-green

# Remove blue environment
dployr delete my-app-blue
```

### Canary Deployment

Gradually roll out to a subset of users:

```bash
# Deploy canary version
dployr deploy --name my-app-canary ...

# Route 10% of traffic to canary
dployr proxy canary --service my-app-canary --weight 10

# Increase traffic gradually
dployr proxy canary --service my-app-canary --weight 50
dployr proxy canary --service my-app-canary --weight 100
```

## Monitoring

Monitor your deployments:

```bash
# View logs
dployr logs <deployment-name>

# Follow logs in real-time
dployr logs <deployment-name> --follow

# Check service status
dployr service status <deployment-name>

# View metrics
dployr metrics <deployment-name>
```

## Next Steps

- [Configure proxy routing](/docs/configuration)
- [Explore supported runtimes](/docs/runtimes)
- [Learn about CLI commands](/docs/cli)
