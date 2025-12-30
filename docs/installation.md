# Installation

## Quick Install

### Linux/macOS

```bash
curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh | bash
```

For first-time installation with a bootstrap token:

```bash
curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh \
  | bash -s -- --token "<bootstrap_token>"
```

### Windows

Run PowerShell as Administrator:

```powershell
iwr "https://raw.githubusercontent.com/dployr-io/dployr/master/install.ps1" -OutFile install.ps1
.\install.ps1
```

For first-time installation with a bootstrap token:

```powershell
.\install.ps1 -Token $env:DPLOYR_INSTALL_TOKEN
```

## Manual Installation

1. Download the latest release from [GitHub Releases](https://github.com/dployr-io/dployr/releases)
2. Extract the binary to your PATH
3. Configure the daemon (see [Configuration](/docs/configuration))
4. Start the daemon

## Package Managers

### Homebrew (macOS/Linux)

```bash
brew tap dployr-io/dployr
brew install dployr
```

### Scoop (Windows)

```powershell
scoop bucket add dployr https://github.com/dployr-io/scoop-bucket
scoop install dployr
```

## Starting the Daemon

### Linux (systemd)

```bash
sudo systemctl enable dployrd
sudo systemctl start dployrd
sudo systemctl status dployrd
```

### macOS (launchd)

```bash
sudo launchctl load /Library/LaunchDaemons/io.dployr.dployrd.plist
sudo launchctl start io.dployr.dployrd
```

### Windows (NSSM)

The installer automatically configures dployrd as a Windows service using NSSM.

```powershell
# Start service
Start-Service dployrd

# Check status
Get-Service dployrd
```

## Verification

Check the daemon version:

```bash
dployrd --version
```

View logs:
- **Linux/macOS**: `/var/log/dployrd/app.log`
- **Windows**: `C:\ProgramData\dployr\logs\app.log`

## Dependencies

dployr automatically downloads and configures the following dependencies:

| Dependency | Purpose | Platform |
|------------|---------|----------|
| [Caddy](https://caddyserver.com) | Reverse proxy and automatic HTTPS | All |
| [vfox](https://version-fox.dev) | Runtime version management | All |
| [SQLite](https://sqlite.org) | Embedded database | All |
| [systemd](https://systemd.io) | Service manager | Linux |
| [launchd](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html) | Service manager | macOS |
| [NSSM](https://nssm.cc) | Service manager | Windows |

## Troubleshooting

### No bootstrap token

Set it in the configuration file or rerun the installer with `--token`.

### WebSocket authentication errors (401/403)

The daemon will automatically clear the `access_token` and reacquire it. Check logs for details.

### mTLS/certificate issues

Ensure the pinned CA/cert path is correct if you customized certificates.

### Permission errors

Service managers may require admin/root privileges for installation and startup.

## Next Steps

- [Configure dployr](/docs/configuration)
- [Deploy your first app](/docs/quickstart)
- [Learn about concepts](/docs/concepts)
