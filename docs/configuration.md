# Configuration

Configure the dployr daemon and services.

## Daemon Configuration

The daemon configuration file is located at:
- **Linux/macOS**: `/etc/dployr/config.yaml`
- **Windows**: `C:\ProgramData\dployr\config.yaml`

### Example Configuration

```yaml
# Base URL for the control plane
base_url: https://base.dployr.io

# Bootstrap token for initial authentication
bootstrap_token: your-bootstrap-token-here

# Instance configuration
instance:
  name: my-instance
  tags:
    - production
    - us-east-1
  metadata:
    region: us-east-1
    datacenter: dc1

# Logging configuration
logging:
  level: info
  format: json
  file: /var/log/dployrd/app.log

# Database configuration
database:
  path: /var/lib/dployr/dployr.db

# mTLS configuration
mtls:
  cert_path: /etc/dployr/certs/client.crt
  key_path: /etc/dployr/certs/client.key
  ca_path: /etc/dployr/certs/ca.crt

# Proxy configuration
proxy:
  enabled: true
  caddy_path: /usr/local/bin/caddy
  config_path: /etc/caddy/Caddyfile

# Runtime configuration
runtime:
  vfox_path: /usr/local/bin/vfox
  cache_dir: /var/cache/dployr
```

## Service Configuration

### Environment Variables

Set environment variables for services:

```bash
dployr env set my-app NODE_ENV=production
dployr env set my-app DATABASE_URL=postgresql://...
dployr env set my-app API_KEY=secret
```

### Service Manifest

Create a `dployr.yaml` in your repository:

```yaml
name: my-app
runtime: nodejs
version: 20

build:
  command: npm install && npm run build
  working_dir: .

run:
  command: npm start
  port: 3000

env:
  NODE_ENV: production
  LOG_LEVEL: info

health_check:
  path: /health
  interval: 30s
  timeout: 5s
  retries: 3

resources:
  memory: 512M
  cpu: 1
```

## Proxy Configuration

### Caddyfile

dployr automatically generates Caddy configuration, but you can customize it:

```caddy
# /etc/caddy/Caddyfile

example.com {
  reverse_proxy localhost:3000
  
  tls {
    email admin@example.com
  }
  
  log {
    output file /var/log/caddy/access.log
  }
}

api.example.com {
  reverse_proxy localhost:8080
}
```

### Custom Domains

Add custom domains via CLI:

```bash
dployr proxy add \
  --domain example.com \
  --service my-app \
  --port 3000
```

### SSL/TLS

Caddy automatically provisions SSL certificates from Let's Encrypt. No additional configuration needed.

## Database Configuration

### SQLite

The default database is SQLite:

```yaml
database:
  path: /var/lib/dployr/dployr.db
  max_connections: 10
  timeout: 5s
```

### Backup

Backup the database regularly:

```bash
# Linux/macOS
cp /var/lib/dployr/dployr.db /backup/dployr-$(date +%Y%m%d).db

# Windows
copy C:\ProgramData\dployr\dployr.db C:\backup\dployr-%date%.db
```

## Logging

### Log Levels

Available log levels:
- `debug` - Detailed debugging information
- `info` - General information
- `warn` - Warning messages
- `error` - Error messages

### Log Format

Choose between JSON and text format:

```yaml
logging:
  level: info
  format: json  # or "text"
  file: /var/log/dployrd/app.log
```

### Log Rotation

Configure log rotation (Linux):

```bash
# /etc/logrotate.d/dployrd
/var/log/dployrd/*.log {
  daily
  rotate 7
  compress
  delaycompress
  missingok
  notifempty
  create 0644 dployr dployr
}
```

## Security

### mTLS Certificates

Generate client certificates:

```bash
# Generate private key
openssl genrsa -out client.key 2048

# Generate certificate signing request
openssl req -new -key client.key -out client.csr

# Sign certificate with CA
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key \
  -CAcreateserial -out client.crt -days 365
```

### Firewall Rules

Open required ports:

```bash
# Linux (ufw)
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 8080/tcp  # Custom app port

# Linux (iptables)
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

## Performance Tuning

### Resource Limits

Set resource limits for services:

```yaml
resources:
  memory: 1G
  cpu: 2
  disk: 10G
```

### Connection Pooling

Configure connection pooling:

```yaml
database:
  max_connections: 25
  idle_connections: 5
  connection_lifetime: 1h
```

## Next Steps

- [Deploy an application](/docs/deployment)
- [Explore CLI commands](/docs/cli)
- [Troubleshoot issues](/docs/troubleshooting)
