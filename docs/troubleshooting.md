# Troubleshooting

Common issues and solutions for dployr.

## Installation Issues

### No bootstrap token

**Problem**: Daemon fails to start with "no bootstrap token" error.

**Solution**: Set the bootstrap token in the configuration file or rerun the installer:

```bash
# Linux/macOS
curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh \
  | bash -s -- --token "<bootstrap_token>"

# Windows
.\install.ps1 -Token $env:DPLOYR_INSTALL_TOKEN
```

### Permission denied

**Problem**: Installation fails with permission errors.

**Solution**: Run the installer with administrator/root privileges:

```bash
# Linux/macOS
sudo curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh | bash

# Windows (Run PowerShell as Administrator)
.\install.ps1
```

## Connection Issues

### WebSocket authentication errors (401/403)

**Problem**: Daemon logs show 401 or 403 errors when connecting to base.

**Solution**: The daemon will automatically clear the access token and reacquire it. If the issue persists:

1. Check that your bootstrap token is valid
2. Verify the base URL is correct
3. Check network connectivity to the base URL

```bash
# Test connectivity
curl -v https://base.dployr.io/health
```

### mTLS certificate errors

**Problem**: Connection fails with certificate validation errors.

**Solution**: Ensure the certificate paths are correct:

```yaml
# /etc/dployr/config.yaml
mtls:
  cert_path: /etc/dployr/certs/client.crt
  key_path: /etc/dployr/certs/client.key
  ca_path: /etc/dployr/certs/ca.crt
```

Verify certificates are valid:

```bash
openssl x509 -in /etc/dployr/certs/client.crt -text -noout
```

## Deployment Issues

### Build command fails

**Problem**: Deployment fails during the build step.

**Solution**: Check the build logs:

```bash
dployr logs <deployment-name>
```

Common causes:
- Missing dependencies
- Incorrect build command
- Insufficient disk space
- Wrong working directory

### Runtime version not found

**Problem**: Deployment fails with "runtime version not found" error.

**Solution**: Ensure vfox is installed and the runtime version is available:

```bash
# Check vfox installation
vfox --version

# List available versions
vfox available nodejs

# Install specific version
vfox install nodejs@20
```

### Port already in use

**Problem**: Service fails to start with "port already in use" error.

**Solution**: Check which process is using the port:

```bash
# Linux/macOS
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

Kill the conflicting process or use a different port.

## Service Issues

### Service won't start

**Problem**: Service fails to start or crashes immediately.

**Solution**: Check service logs:

```bash
dployr logs <service-name> --tail 100
```

Common causes:
- Missing environment variables
- Incorrect run command
- Application errors
- Port conflicts

### Service keeps restarting

**Problem**: Service starts but keeps restarting.

**Solution**: Check health check configuration and application logs:

```bash
# View logs
dployr logs <service-name> --follow

# Check service status
dployr service status <service-name>
```

Adjust health check settings if needed:

```yaml
health_check:
  path: /health
  interval: 30s
  timeout: 10s
  retries: 5
```

## Proxy Issues

### Domain not resolving

**Problem**: Custom domain doesn't resolve to your service.

**Solution**: Verify DNS records:

```bash
# Check DNS
dig example.com
nslookup example.com
```

Ensure DNS points to your server's IP address.

### SSL certificate errors

**Problem**: HTTPS doesn't work or shows certificate errors.

**Solution**: Check Caddy logs:

```bash
# Linux/macOS
sudo journalctl -u caddy -f

# Check Caddy configuration
caddy validate --config /etc/caddy/Caddyfile
```

Ensure:
- Port 80 and 443 are open
- Domain DNS is correctly configured
- Email is set for Let's Encrypt

### 502 Bad Gateway

**Problem**: Proxy returns 502 error.

**Solution**: Verify the service is running:

```bash
dployr service status <service-name>
```

Check if the service is listening on the correct port:

```bash
# Linux/macOS
netstat -tlnp | grep <port>

# Windows
netstat -ano | findstr <port>
```

## Performance Issues

### High memory usage

**Problem**: Daemon or services consuming too much memory.

**Solution**: Set resource limits:

```yaml
resources:
  memory: 512M
```

Monitor memory usage:

```bash
# Linux
free -h
top

# Windows
Get-Process dployrd | Select-Object WorkingSet
```

### Slow deployments

**Problem**: Deployments take too long.

**Solution**: 
- Use build caching
- Optimize build commands
- Check network speed for git clones
- Increase resources

## Database Issues

### Database locked

**Problem**: Operations fail with "database locked" error.

**Solution**: Ensure only one daemon instance is running:

```bash
# Linux/macOS
ps aux | grep dployrd

# Windows
Get-Process dployrd
```

If multiple instances are running, stop them and restart:

```bash
# Linux
sudo systemctl restart dployrd

# macOS
sudo launchctl restart io.dployr.dployrd

# Windows
Restart-Service dployrd
```

### Corrupted database

**Problem**: Database errors or corruption.

**Solution**: Restore from backup:

```bash
# Stop daemon
sudo systemctl stop dployrd

# Restore backup
cp /backup/dployr-backup.db /var/lib/dployr/dployr.db

# Start daemon
sudo systemctl start dployrd
```

## Logging

### Where are logs?

**Daemon logs**:
- **Linux/macOS**: `/var/log/dployrd/app.log`
- **Windows**: `C:\ProgramData\dployr\logs\app.log`

**Service logs**:
```bash
dployr logs <service-name>
```

**System logs**:
```bash
# Linux
sudo journalctl -u dployrd -f

# macOS
log show --predicate 'process == "dployrd"' --last 1h

# Windows
Get-EventLog -LogName Application -Source dployrd -Newest 50
```

## Getting Help

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/dployr-io/dployr/issues)
2. Join the [Discord community](https://discord.gg/VZVMYuXH)
3. Review the [documentation](./quickstart)
4. Enable debug logging:

```yaml
logging:
  level: debug
```

## Next Steps

- [Review configuration](./configuration)
- [Learn about concepts](./concepts)
- [Explore CLI commands](./cli)
