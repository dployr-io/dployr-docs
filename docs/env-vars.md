---
title: Environment Variables & Secrets
description: Set environment variables and secrets for your dployr services. Manage config per service, inject at runtime, and keep sensitive values encrypted.
---

# Environment Variables & Secrets

Two ways to pass config to your services: environment variables for plain config, secrets for sensitive values like API keys and database passwords.

## Environment variables

Environment variables are plain key-value pairs injected into your service process at runtime. Use them for non-sensitive config: feature flags, service URLs, log levels, region settings.

### Setting variables

From the CLI:

```bash
# Set a variable
dployr env set my-api KEY=value

# Set multiple at once
dployr env set my-api NODE_ENV=production PORT=3000

# List all variables for a service
dployr env list my-api

# Remove a variable
dployr env unset my-api KEY
```

From the dashboard, go to the service's **Settings** tab and find the environment variables section. You can add, edit, and remove variables there. Changes apply on the next deploy.

### In blueprints

```yaml
env:
  NODE_ENV: production
  LOG_LEVEL: info
  API_URL: https://api.example.com
```

## Secrets

Secrets are for sensitive values: API keys, database passwords, tokens, private keys. They're stored encrypted at rest and never exposed in logs, the dashboard UI, or API responses. You can set them but you can't read them back after the fact. You can only overwrite or delete them. For a full picture of how dployr handles security, see [How it works](/docs/concepts#security).

Secrets are injected the same way as environment variables. Your app reads them from `process.env` (or equivalent). The difference is in how dployr stores and handles them.

### Setting secrets from the dashboard

When deploying, click **Configure Secrets** before submitting. You can also manage them from the service's **Settings** tab at any time.

### Setting secrets from the CLI

```bash
# Set a secret (value is not echoed back)
dployr env set my-api DATABASE_URL=postgres://...

# List secret keys (values are hidden)
dployr env list my-api

# Remove a secret
dployr env unset my-api DATABASE_URL
```

The CLI treats variables and secrets through the same commands. dployr identifies secrets by the keys you flag as sensitive in the dashboard, or by convention if you're using the blueprint format.

### In blueprints

```yaml
secrets:
  - DATABASE_URL
  - STRIPE_SECRET_KEY
  - JWT_SECRET
```

When listed under `secrets`, those keys are pulled from your cluster's secret store at deploy time. You set the values separately and they're never written into the blueprint file itself.

## Order of precedence

If the same key exists as both an environment variable and a secret, the secret wins. In practice you shouldn't have the same key in both places.

## Per-service scope

Variables and secrets are scoped to individual services. Two services can have the same key with different values and they won't interfere with each other.

## Sharing variables across services

There's no cluster-wide variable store right now. If multiple services need the same value, set it on each one. Blueprint files make this easier to manage when you have several services with overlapping config.
