---
title: "Instances: App Servers in dployr"
description: Understand instances in dployr, the servers that run your services. Manage, monitor, and access your instance from the dashboard or CLI.
---

# Instances

An instance is a server. It's the machine running your apps. On the Hobby and Indie plans, dployr provisions and manages it for you. On Pro, you can also [connect your own VPS](/docs/byos) from any provider you already use.

::: info
Only Linux instances are supported at this time.
:::

## What runs on an instance

Your services run on your instance. One instance can run as many services as its resources can support. The **Instances** page in the dashboard shows every instance in your cluster along with the services deployed to it and current resource usage.

## Instance detail

Click an instance to see:

- Which services are running on it and their status
- CPU and memory usage over time
- The instance's public IP address (used for DNS when adding custom domains)
- The `dployrd` version and connection status

## Pro features

From the instance detail page you can access the **Console**, **File explorer**, and **Process viewer**. See [Dashboard](/docs/dashboard) for what each one does.

## Managing instances from the CLI

```bash
# List all instances in your cluster
dployr instances

# Details for a specific instance
dployr instance <instance-id>
```

## Managed instances

On Hobby and Indie plans, dployr provisions your instance and handles the server setup, OS updates, and `dployrd` installation. You don't interact with the underlying machine unless you want to via the console.

Your instance is created when you first sign up. If you need a different server size or region, contact support.

## Bring Your Own Server

Pro subscribers can connect their own servers. See [Bring Your Own Server](/docs/byos) for the setup walkthrough.
