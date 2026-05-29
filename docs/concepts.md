---
title: How it works
description: How dployr works under the hood. Clusters, instances, services, the Base control plane, dployrd, and mTLS WebSocket architecture explained.
---

# How it works

You don't need to read this to use dployr. But if you're the kind of person who wants to understand what's happening before they trust a tool with their production apps, this is the page for that.

## The model

Everything in dployr is organized into three layers.

**Cluster** is your workspace. It owns everything: your services, your server, your team members, your settings. When you sign up, one is created for you. You can have multiple clusters, which is useful if you're managing separate projects or environments.

**Instance** is the server. It's the machine running your apps. On the Hobby and Indie plans, dployr provisions and manages it for you. On Pro, you can also [connect your own VPS](/docs/byos) from any provider you already use. One instance can run multiple services.

**Service** is a running app (also called a workload). Your API, your background worker, your static site: each is a service. Services are deployed to an instance and managed independently, with their own logs, environment variables, health checks, domains, and settings.

## The control plane

**Base** is dployr's control plane. It's what the dashboard and CLI talk to. It handles authentication, routing requests to the right instance, storing state, and scheduling work. Base is proxied through Cloudflare, so requests benefit from Cloudflare's network regardless of where your server is.


## `dployrd`

**`dployrd`** is a lightweight daemon that runs on your instance. It's the only piece of software you'd install yourself if you're on the [Bring Your Own Server](/docs/byos) path. On managed instances, dployr handles this for you.

`dployrd` does a few things:
- Maintains a persistent, outbound WebSocket connection to Base (mTLS encrypted)
- Receives deploy instructions from Base and executes them locally
- Streams logs and status back to Base in real time

## How a deployment flows

When you push a deployment from the dashboard, CLI, or GitHub Actions:

1. The request hits Base
2. Base routes it to the right instance through the WebSocket connection
3. `dployrd` on the instance pulls your code, runs your build command, and starts the service
4. Logs and status stream back through the same connection

Your server never needs to accept inbound connections from the internet. `dployrd` dials out, so your firewall stays closed.

## The browser console and file explorer

The same WebSocket connection that handles deployments is what makes the browser console and file explorer work. When you open a terminal session in the dashboard, it's tunneled from your browser through Base to `dployrd` on your instance. No SSH, no open ports.

## Security

**Transport.** All traffic between `dployrd` and Base is encrypted with mTLS. Both sides present certificates and both sides verify them. `dployrd` generates its own client certificate on first run and Base verifies it on every connection. Your server never accepts inbound connections, so there are no open ports to expose.

**Secrets.** Environment variable secrets are encrypted at rest. Once set, the values are never returned through the API or shown anywhere in the dashboard. You can overwrite or delete a secret, but you can't read it back. This means even if someone gains access to your dashboard account, your raw secret values stay protected.

**Access control.** Every team member operates under a role (Owner, Admin, Member, or Guest) that limits what they can do. See [Teams & RBAC](/docs/teams) for the full breakdown.

**Audit trail.** Every action taken in your cluster is recorded in the events log: deployments, restarts, environment variable changes, team invites, logins. In a team environment you always have a clear record of who did what and when.

## Runtimes

dployr officially supports Node.js, Python, Go, PHP, Ruby, .NET, Java, and Static. For anything outside that list (Rust, Haskell, Redis, a custom binary, whatever), use the Docker runtime and bring your own image. If it runs in a container, dployr can deploy it.
