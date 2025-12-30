# Concepts

Understanding the core concepts of dployr.

## Architecture

dployr consists of four main components:

### dployr-base
Globally distributed control plane that provides:
- RESTful API with RBAC
- Scheduling and orchestration
- Data storage and persistence
- Full audit logging

### dployrd
Lightweight daemon that runs on your instances:
- Connects to base over mTLS websocket
- Executes deployment tasks
- Reports status and health metrics
- Manages local services

### dployr-cli
Command-line interface for managing deployments:
- RBAC-aware authentication
- Full API access
- Scriptable operations
- Works from anywhere

### dployr-app
Web dashboard built on the same API:
- Visual project management
- Deployment monitoring
- Environment configuration
- Real-time logs and metrics

## CLI vs Daemon

- **CLI**: Issues commands to the control plane
- **Daemon**: Executes commands and syncs with base
- The CLI and dashboard use the same API
- Anything you do in the UI can be scripted with the CLI

## Synchronization

The daemon maintains a long-lived WebSocket connection with mTLS:
- Daemon generates a client certificate
- Certificate is published to base for authentication
- Connection is persistent and auto-reconnects
- Commands are pushed from base to daemon in real-time

## Authentication & Tokens

### Bootstrap Token
- Long-lived token stored in the database
- Used for initial daemon registration
- Exchanged for short-lived access tokens

### Access Token
- Short-lived token for API authentication
- Automatically refreshed by the daemon
- Cleared and reacquired on authentication errors

## Persistence

### SQLite Database
dployr uses SQLite for local persistence:
- Instance metadata
- Authentication tokens
- Deployment configurations
- Service definitions
- Task execution results

### Logging
Structured JSON logging:
- Stdout for real-time monitoring
- `/var/log/dployrd/app.log` for remote debugging
- Configurable log levels
- Full audit trail

## Deployments

### Source Types
- **Remote**: Git repositories (GitHub, GitLab, etc.)
- **Local**: Local directories
- **Docker**: Container images

### Deployment Process
1. Source code is fetched
2. Build commands are executed
3. Runtime environment is configured
4. Service is started with run command
5. Health checks verify deployment
6. Traffic is routed to the service

## Services

Services are long-running processes managed by dployr:
- Automatic restart on failure
- Health monitoring
- Log aggregation
- Port management
- Environment variables

## Proxy & Routing

### Caddy Integration
- Automatic HTTPS with Let's Encrypt
- Reverse proxy configuration
- Load balancing
- Custom domain support

### Traffic Routing
- Route traffic to services by domain or path
- Automatic SSL/TLS termination
- WebSocket support
- HTTP/2 and HTTP/3

## Runtimes

dployr supports multiple runtimes through vfox:
- **Node.js**: Multiple versions via vfox
- **Python**: Multiple versions via vfox
- **Go**: Multiple versions via vfox
- **PHP**: Multiple versions via vfox
- **Ruby**: Multiple versions via vfox
- **.NET**: Multiple versions via vfox
- **Java**: Multiple versions via vfox
- **Docker**: Container-based deployments
- **Static**: Static file serving

## Security

### mTLS
- Mutual TLS authentication between daemon and base
- Client certificates for daemon authentication
- Encrypted communication

### RBAC
- Role-based access control
- Fine-grained permissions
- Audit logging for all actions

### Isolation
- Process isolation per service
- User-level permissions
- Network isolation options

## Next Steps

- [Deploy an application](./deployment)
- [Explore CLI commands](./cli)
- [View API reference](./api)
