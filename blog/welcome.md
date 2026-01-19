---
title: "Welcome to dployr"
date: 2025-12-31
author: Emmanuel Madehin
excerpt: "A deployment platform with a globally distributed base and lightweight agents on your VMs—so you can ship apps without the usual PaaS lock-in."
tags: ["announcement", "getting-started"]
image: ""
---

# Welcome to dployr

![dployr architecture](../public/architecture.png)

I’m launching **dployr**: a deployment platform for people who want the convenience of a PaaS, but still want real control over where things run.

## What is dployr?

At a high level, dployr has two parts:

- A control plane (the “base”). Use our hosted, globally distributed base (free), or self-host your own base.
- Lightweight agents on your VMs that make an outbound, mTLS-secured connection to the base

Because the agents dial out to the base, you don’t need to open inbound ports to your VMs. Point them at our hosted base, or at your own base if you prefer.

Dployr supports multiple runtimes out of the box: Node.js, Python, Go, PHP, Ruby, .NET, Java, Docker containers, and static sites.

## Key Features

### Simple Management
Deploy through the web dashboard or the CLI. If you’re working with a team, RBAC is built in so access can be scoped properly.

### Automatic HTTPS
HTTPS is handled for you via Caddy integration, so you’re not stuck hand-rolling certificates for every new service.

### Open Source
dployr is open source (Apache 2.0). If you want to dig into the code, change how something works, or contribute fixes, you can.

## Getting Started

If you want to try it, start with the [quickstart guide](/docs/quickstart).

If you run into issues or want to share feedback, join us on [Discord](https://discord.gg/tY8ZbjvrSZ). You can also follow development on [GitHub](https://github.com/dployr-io/dployr).

---

*Published on December 31, 2025*
