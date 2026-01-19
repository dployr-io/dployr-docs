# Quickstart

Get dployr up and running in 5 minutes.

## Installation

### Linux/macOS

```bash
# First time install with bootstrap token
curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh \
  | bash -s -- --token "<bootstrap_token>"

# Or install latest version
curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh | bash

# Start the daemon
dployrd
```

### Windows

Run PowerShell as Administrator:

```powershell
iwr "https://raw.githubusercontent.com/dployr-io/dployr/master/install.ps1" -OutFile install.ps1
.\install.ps1  # add -Token $env:DPLOYR_INSTALL_TOKEN for first time install

dployrd.exe
```

## Verify Installation

Check the version:

```bash
dployrd --version
```

View logs:
- **Linux/macOS**: `/var/log/dployrd/app.log`
- **Windows**: `ProgramData/dployr`

The daemon should start and log a websocket mTLS connection attempt to Base.

## Deploy Your First Application

Deploy a Node.js application:

```bash
dployr deploy \
  --name hello-world \
  --source remote \
  --runtime nodejs \
  --version 20 \
  --remote https://github.com/dployr-io/dployr-examples \
  --branch master \
  --build-cmd "npm install" \
  --run-cmd "npm start" \
  --working-dir "nodejs" \
  --port 3000
```

## Next Steps

- [Learn about core concepts](./concepts)
- [Use Dployr Web](./dployr-web)
- [Explore CLI commands](./cli)
