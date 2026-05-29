---
title: Quickstart
description: Create a dployr account and deploy your first app in under 5 minutes. No SSH, no server setup, no configuration required.
---

# Quickstart

Your server is ready the moment you sign up. This guide takes you from zero to a running service in a few minutes.

## 1. Create your account

Go to [app.dployr.io](https://app.dployr.io) and sign up. When you first log in, you'll be asked to set a name for yourself and your workspace. That's it. Your cluster is created and your server is provisioned in the background.

## 2. Deploy your first service

From the dashboard, click **Deploy Service**. A form opens with two tabs: **Quick Deploy** for a form-based setup, and **Blueprint Editor** if you prefer to write config directly. Both do the same thing, so use whichever feels natural.

Fill in the fields:

| Field | What to put |
|---|---|
| **Source** | Remote repository (GitHub URL) or Docker image |
| **Branch** | The branch to deploy from |
| **Runtime** | The language your app uses (Node.js, Python, Go, PHP, etc.) |
| **Version** | Runtime version, e.g. `20` for Node 20 |
| **Build command** | How to build your app, e.g. `npm install` |
| **Run command** | How to start it, e.g. `npm start` |
| **Port** | The port your app listens on |
| **Name** | A name for this service |

If your app needs environment variables, click **Configure Environment Variables** before deploying. If you have secrets (API keys, tokens), use **Configure Secrets**. They're stored separately and never exposed.

When you're ready, click **Deploy**.

## 3. Watch it go live

dployr pulls your code, runs your build command, and starts the service. You'll see it appear in the services list with a status of **Running**. Every service gets a `yourservice.dployr.run` subdomain with HTTPS automatically, with no certificate setup needed.

Click the service to open its detail page. The **Logs** tab shows live output as your app runs. If something went wrong during the build, it'll be there.

## What's next

- [Add a custom domain](/docs/custom-domains): point your own domain at the service
- [Set up GitHub Actions](/docs/github-actions): deploy automatically on every push
- [Learn about the CLI](/docs/cli): deploy and manage services from the terminal
- [Understand the model](/docs/concepts): how clusters, instances, and services fit together
