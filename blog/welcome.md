---
layout: blog-post
title: Shipping dployr
date: 2025-12-31
author: Emmanuel Madehin
description: Why dployr exists. A deployment platform that gives you the convenience of managed hosting while keeping the server yours. CLI, dashboard, GitHub Actions, rollbacks.
excerpt: "A deployment platform for people who want the convenience of managed hosting without giving up their own servers."
tags: ["announcement"]
---

I started building dployr because the deployment options I kept reaching for didn't quite fit.

Managed PaaS platforms are convenient until they're not. You're on their infrastructure, their pricing, their schedule. Want custom specs, a specific region, or a runtime they don't support? You're either blocked or paying more for it.

The self-hosted path has its own problems. It's not hard, but it takes time you'd rather spend on the actual product.

dployr sits between the two. There's a control plane we host for free, and lightweight agents that run on your servers. The agents dial out over mTLS, so your servers don't need any inbound ports open. Point them at our hosted control plane, or self-host your own.

The workflow is what you'd expect: CLI, dashboard, GitHub Actions, HTTPS, rollbacks, log streaming. The server stays yours.

Supported runtimes: Node.js, Python, Go, PHP, Ruby, .NET, Java, Docker, and static sites. RBAC is built in. Runs on any VM.

We're early. Start with the [quickstart](/docs/quickstart) if you want to try it. If something breaks or you want to talk through a use case, [Discord](https://discord.gg/tY8ZbjvrSZ) is where we are. The code is on [GitHub](https://github.com/dployr-io/dployr) under Apache 2.0.
