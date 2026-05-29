---
title: Custom Domains
description: Point your own domain at a dployr service. Add a domain via the proxy, configure your DNS records, and get HTTPS automatically.
---

# Custom Domains

Every service gets a `yourservice.dployr.run` subdomain with HTTPS out of the box. When you're ready to use your own domain, you can point it at any service in your cluster.

## How it works

dployr's proxy sits in front of your services and routes incoming requests based on the hostname. When you add a custom domain, you point your DNS at the proxy, and the proxy forwards traffic to your service. TLS is handled automatically with no Certbot and no certificate files to manage.

## Adding a domain

### From the CLI

```bash
dployr domain add yourdomain.com --service my-api
```

### From the dashboard

Go to the service detail page and find the **Domains** section in settings. Enter your domain and save.

## DNS configuration

After adding the domain in dployr, update your DNS with your domain registrar.

For a root domain (`yourdomain.com`), add an **A record** pointing to your instance's IP address. Find the IP on the **Instances** page in your dashboard.

For a subdomain (`api.yourdomain.com`), add a **CNAME record** pointing to your cluster's proxy hostname, which you'll find in the dashboard after adding the domain.

DNS changes can take anywhere from a few minutes to 48 hours to propagate, depending on your registrar and TTL settings. Most propagate within an hour.

## HTTPS

TLS certificates are provisioned automatically after your DNS is pointing correctly. The first request to your domain after DNS propagation triggers certificate issuance. This usually takes under a minute.

Your `dployr.run` subdomain continues to work after you add a custom domain. Both will serve your service.

## Multiple domains on one service

A service can have more than one domain. Just run `dployr domain add` again with the same service name and a different domain, or add additional domains from the dashboard.

## Removing a domain

```bash
dployr domain remove --domain yourdomain.com
```

This removes the routing rule. Your DNS records will still exist, so you'll need to clean those up with your registrar separately.

## Listing domains

```bash
dployr domain list
```

Shows all custom domains configured in your cluster, along with the service each one routes to.
