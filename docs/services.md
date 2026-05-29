---
title: Managing Services
description: How to manage running services in dployr. Logs, metrics, restart controls, settings, and understanding service state.
---

# Managing services

A service is a running app inside your cluster (also called a workload). Your API, your background worker, your static site: each one is its own service with isolated logs, environment variables, health checks, and settings.

## Service lifecycle

When you deploy, dployr pulls your code (or image), runs your build command, and starts your process. That running process is the service. From that point on you can stop it, restart it, redeploy it, or delete it from the dashboard or the CLI.

A service always belongs to a specific instance. You can see which instance a service is running on from the services list.

## Status and health

Each service shows two things: its **status** and its **health**.

**Status** reflects what the service is doing right now: `running`, `stopped`, `deploying`, `failed`, or `restarting`. This is about the process state.

**Health** reflects whether the service is responding correctly. A service can be `running` but `degraded` if it's not passing its health check. This is managed by [Watchdog](/docs/health-checks), dployr's health monitoring system.

## Logs

Open a service and go to the **Logs** tab. Logs stream live over WebSocket as your app writes them. You can scroll back through history or let it run in real time.

If your service crashed, the crash output will be here. If a build failed, the build output is here too. Logs are the first place to look when something goes wrong.

From the CLI:

```bash
# Recent logs
dployr logs my-api

# Follow live
dployr logs my-api --follow

# Last 100 lines
dployr logs my-api --tail 100
```

## Metrics

The **Metrics** tab shows CPU and memory usage over time. If your service is under load or leaking memory, this is where you'll see it.

## Restarting and stopping

From the dashboard, use the controls on the service detail page to stop, start, or restart a service.

From the CLI:

```bash
dployr service start my-api
dployr service stop my-api
dployr service restart my-api
dployr service status my-api
```

A restart keeps your current deployment. It just stops and starts the process again. To push a new version of your code, run a new deploy.

## Service settings

The **Settings** tab on a service lets you update its configuration: port, build command, run command, description. Changes here take effect on the next deploy and don't restart the running service.

If you need to change environment variables, those are on the same page and can be updated independently. See [Environment Variables & Secrets](/docs/env-vars).

## Redeploying

From the CLI, run the same `dployr deploy` command you used the first time. dployr will pull fresh code, run the build command, and hot-swap the running process. If the build fails, the previous version stays running.

## Deleting a service

```bash
dployr delete my-api
```

This stops the service and removes it from your cluster. It doesn't delete the underlying repo or image, just the dployr-managed service and its configuration.

## Multiple services on one instance

One instance can run as many services as its resources allow. Services share the instance's CPU and memory but are isolated at the process level. You can see all services running on a given instance from the **Instances** page.
