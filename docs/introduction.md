---
title: Introduction
description: What dployr is, how it works, and how the docs are organized. Start here before anything else.
---

# Introduction

dployr is a deployment platform that gives you a real server the moment you sign up. You deploy your apps to it using the CLI, the dashboard, or GitHub Actions. No SSH, no configuration, no waiting.

The server runs your workloads. You manage everything from one place: deploys, logs, domains, environment variables, and team access.

## The three things you need to know

**Cluster** is your workspace. Everything in dployr lives inside a cluster: your services, your server, your team, your settings. When you sign up, a cluster is created for you automatically.

**Instance** is the server. It's the machine running your apps. On the Hobby and Indie plans, dployr provisions and manages it for you. On Pro, you can also [connect your own VPS](/docs/byos) from any provider you already use.

**Service** is a running app (also called a workload). An API, a background worker, a static site, a cron job: each one is a service. You can run multiple services on the same instance.

That's the model. Everything in these docs maps back to it.

## Two ways to use dployr

**Managed** (default on all plans): Sign up and your server is ready. You don't touch infrastructure. dployr handles provisioning, HTTPS, reverse proxy, and restarts. Just deploy your code.

**Bring Your Own Server** (Pro): You have a VPS on Hetzner, DigitalOcean, Vultr, or anywhere else. Connect it to dployr and manage it the same way you'd manage a managed instance. This is covered in [Bring Your Own Server](/docs/byos).

## How these docs are organized

- **Getting Started**: sign up, deploy your first service, understand how it all fits together
- **Deploying**: the dashboard, CLI, GitHub Actions, and blueprints
- **Managing Services**: logs, env vars, custom domains, health checks
- **Infrastructure**: instances, and connecting your own server
- **Team & Account**: roles, invites, billing
- **Reference**: API, troubleshooting

If you're new, start with the [Quickstart](/docs/quickstart). If you want to understand how things work before touching anything, [How it works](/docs/concepts) is the right place.
