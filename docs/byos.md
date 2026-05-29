---
title: Bring Your Own Server
description: Connect your own server to dployr on a Pro plan. Install `dployrd`, generate a bootstrap token, and manage it alongside your other instances.
---

# Bring Your Own Server

By default, dployr provisions and manages a server for you. If you're on the Pro plan, you can also connect a server you already own. Your own server shows up in the dashboard and CLI like any other instance, with the same deploy flow, console access, and everything else.

::: info Before you connect
Start with a clean server if you can. Existing software can conflict with what `dployrd` installs. The server needs outbound internet access, and keeping it up is on you. `dployrd` runs your workloads but can't save you from a machine that goes down.
:::

## Step 1: Get a bootstrap token

In the dashboard, go to your cluster's **Instances** page and click **Add Instance**. You'll get a bootstrap token, which is a one-time credential that lets `dployrd` authenticate with your cluster on first run. Copy it before closing the modal.

## Step 2: Install `dployrd`

SSH into your server and run the installer with your token.

```bash
curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh \
  | bash -s -- --token "<your-bootstrap-token>"
```

The installer sets up `dployrd`, registers it as a system service, and connects it to your cluster. After it completes, your server will appear in the **Instances** list in the dashboard.

## Step 3: Verify the connection

In the dashboard, the new instance should show as **Connected** within a minute or two of the installer finishing. You can also check on the server:

```bash
sudo systemctl status dployrd
```

And check the `dployrd` logs:

```bash
tail -f /var/log/dployrd/app.log
```

## What `dployrd` installs

The installer configures the following on your server:

| Component | Purpose |
|---|---|
| `dployrd` | Maintains the WebSocket connection to Base and executes deploy instructions |
| Caddy | Reverse proxy that handles HTTPS and routing |
| Docker | Container runtime used for all runtimes |
| SQLite | Embedded local state store |

## Package managers

If you prefer to manage the installation through a package manager:

```bash
# Homebrew (macOS/Linux)
brew tap dployr-io/dployr
brew install dployr
```

After installing via a package manager, run `dployrd --token <bootstrap-token>` to register the instance with your cluster.

## Managing the daemon

```bash
sudo systemctl enable dployrd
sudo systemctl start dployrd
sudo systemctl restart dployrd
sudo systemctl status dployrd
```

## Security

`dployrd` connects outbound to Base over a mTLS-encrypted WebSocket. Your server never needs to accept inbound connections from the internet. No firewall rules to add, no ports to open. `dployrd` generates its own client certificate on first run and Base verifies it on every connection.

## Removing a BYOS instance

From the **Instances** page in the dashboard, select the instance and choose **Remove**. This disconnects it from your cluster. `dployrd` and its dependencies remain installed on the server, so you'll need to remove those manually if you want to clean up.
