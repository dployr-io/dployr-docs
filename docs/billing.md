---
title: Pricing and Billing
description: dployr pricing plans and what is included on each. Hobby is free forever, Indie is $12/month billed annually, Pro is $20/month billed annually.
---

# Pricing and billing

## Plans

### Hobby (Free)

**64MB RAM · 0.1 vCPU · 10GB disk**

For side projects and apps you're just getting started with. Includes one workload that sleeps when idle, all runtimes, the CLI and dashboard, blueprints, GitHub Actions, log streaming, RBAC and audit log, 30 days of log retention, and up to 2 custom domains per service.

### Indie ($12/month billed annually, or $15/month)

**512MB RAM · 0.25 vCPU · 25GB disk — shared always-on instance**

For developers shipping real apps that need to stay up. Everything in Hobby, plus up to 5 workloads on a shared always-on instance, 5 seats, Slack / Discord / webhook notifications, migration support, 12 months of log retention, and up to 10 custom domains per service.

### Pro ($20/month billed annually, or $25/month)

**2GB RAM · 1 vCPU · 50GB disk — dedicated instance**

For production apps and small teams that can't afford downtime. Everything in Indie, plus up to 25 workloads on a dedicated instance, 25 seats, 36 months of log retention, up to 25 custom domains per service, priority support, console access, file explorer, and Watchdog.

## Resource isolation

On shared plans (Hobby and Indie), each cluster runs inside its own cgroup slice with hard memory and CPU ceilings. One cluster cannot starve another — if a workload exhausts its allocation, only that cluster is affected. System processes (dployrd, Vector) run in a protected slice and are never starved by user workloads.

## What's included on all plans

- Managed server provisioned on sign-up
- Deploy via dashboard, CLI, or GitHub Actions
- Live log streaming
- CPU and memory metrics
- Environment variables and secrets
- Custom domains with automatic HTTPS
- Health checks
- Your own `yourservice.dployr.run` subdomain per service

## Upgrading

From the dashboard, go to **Settings > Billing**. You can upgrade at any time and the change takes effect immediately. You're prorated for the remainder of the billing period.

## Annual vs monthly

Annual billing saves you roughly 20%. You pay for 12 months upfront at the discounted rate. Monthly billing is the same features, billed month to month.

## Cancellation

You can cancel at any time from **Settings > Billing**. Your cluster stays active until the end of the current billing period. After that, it downgrades to Hobby and any paid features are disabled. Your services keep running, just without the extras.

## Questions

For billing issues or questions, reach out through the dashboard or at [support@dployr.io](mailto:support@dployr.io).
