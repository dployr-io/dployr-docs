---
title: Health Checks & Watchdog
description: Configure HTTP health checks for your dployr services and get notified on Slack, Discord, email, or webhook when something goes wrong.
---

# Health Checks & Watchdog

Point dployr at a health check endpoint and Watchdog takes it from there. It polls your service, marks it degraded if it stops responding, and notifies you on whatever channels you have set up.

## Health checks

A health check is an HTTP request dployr makes to your service on a regular interval. Any non-`5xx` response is treated as healthy, including `4xx`. A `5xx` or no response marks the service degraded.

### Configuring a health check

Set the path in your blueprint:

```yaml
health_check: /health
```

Or from the service's **Settings** tab in the dashboard. That's it. Watchdog handles the polling.

The endpoint just needs to respond without a `5xx`. A dedicated `/health` route that returns `200` is the cleanest approach, but for better signal check the things your app actually depends on: database connectivity, cache availability, external services.

## Watchdog

The watchdog is dployr's alerting layer. It runs on top of health checks and detects two things:

- Services that fail health checks (degraded)
- Services that stop responding entirely without crashing (hangs and deadlocks)

The second case is what makes it useful beyond basic process monitoring. A service can be `running` at the OS level but completely stuck. The watchdog catches this.

### Notification channels

Configure where you want to be notified from the dashboard under **Settings > Integrations**.

**Slack**: paste your Slack webhook URL. Alerts fire into the channel you configured on the webhook.

**Discord**: paste your Discord webhook URL. Same setup as Slack.

**Email**: enter one or more email addresses. Alerts go out on first failure and on recovery.

**Webhook**: any URL. dployr will POST a JSON payload when a service goes degraded and again when it recovers:

```json
{
  "event": "service.degraded",
  "service": "my-api",
  "cluster": "my-cluster",
  "timestamp": "2025-01-01T12:00:00Z",
  "message": "Health check failed"
}
```

You can point this at PagerDuty, Opsgenie, your own alerting pipeline, or anything that accepts a POST.

### Recovery alerts

When a service recovers, dployr sends a follow-up notification on the same channels. You'll know when something went wrong and when it came back without having to check the dashboard.

## Viewing health status

From the services list, each service shows its current health state next to its running status. From the service detail page, the **Overview** tab shows a health timeline so you can see when issues occurred and how long they lasted.
