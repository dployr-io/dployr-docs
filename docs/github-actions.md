---
title: Deploy with GitHub Actions
description: Deploy to dployr automatically on every git push using GitHub Actions and the dployr CLI. Set up DPLOYR_TOKEN and add the workflow to your repository.
---

# Deploy with GitHub Actions

You can deploy to dployr automatically on every push by running the dployr CLI in a GitHub Actions workflow. No separate action needed. Just authenticate with a token and run `dployr deployments create`.

## Get your deploy token

Create an API token scoped to deployments. You can do this from the dashboard or the CLI.

**Dashboard**: go to **Settings > API Tokens**, create a token with the `deployments:write` scope, and copy it.

**CLI**:
```bash
dployr tokens create --name "github-actions" --scope deployments:write
```

In your GitHub repository, go to **Settings > Secrets and variables > Actions** and create a new secret called `DPLOYR_TOKEN`. Paste your token as the value.

## Basic workflow

Add this to `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install dployr CLI
        run: curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh | bash

      - name: Deploy
        env:
          DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
        run: |
          dployr deployments create \
            --name my-api \
            --source remote \
            --runtime nodejs \
            --runtime-version 20 \
            --remote https://github.com/${{ github.repository }} \
            --branch ${{ github.ref_name }} \
            --commit ${{ github.sha }} \
            --build-cmd "npm install" \
            --run-cmd "npm start" \
            --port 3000
```

The `--commit` flag pins the deployment to the exact commit that triggered the workflow. It shows up in the dashboard and makes rollbacks easier to reason about.

## Deploy only when tests pass

```yaml
name: Test and Deploy

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install dployr CLI
        run: curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh | bash

      - name: Deploy
        env:
          DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
        run: |
          dployr deployments create \
            --name my-api \
            --source remote \
            --runtime nodejs \
            --runtime-version 20 \
            --remote https://github.com/${{ github.repository }} \
            --branch ${{ github.ref_name }} \
            --commit ${{ github.sha }} \
            --build-cmd "npm install" \
            --run-cmd "npm start" \
            --port 3000
```

## Deploy to multiple services

```yaml
- name: Deploy API
  env:
    DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
  run: |
    dployr deployments create \
      --name api \
      --source remote \
      --runtime nodejs \
      --runtime-version 20 \
      --remote https://github.com/${{ github.repository }} \
      --branch ${{ github.ref_name }} \
      --commit ${{ github.sha }} \
      --run-cmd "node api/server.js" \
      --port 3000

- name: Deploy Worker
  env:
    DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
  run: |
    dployr deployments create \
      --name worker \
      --source remote \
      --runtime nodejs \
      --runtime-version 20 \
      --remote https://github.com/${{ github.repository }} \
      --branch ${{ github.ref_name }} \
      --commit ${{ github.sha }} \
      --type worker \
      --run-cmd "node worker/index.js"
```

## Force a fresh build

By default dployr reuses a cached image when the source, runtime, and build config have not changed. Pass `--force-rebuild` to skip the cache and build from scratch:

```yaml
- name: Deploy
  env:
    DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
  run: |
    dployr deployments create \
      --name my-api \
      --source remote \
      --runtime nodejs \
      --runtime-version 20 \
      --remote https://github.com/${{ github.repository }} \
      --branch ${{ github.ref_name }} \
      --commit ${{ github.sha }} \
      --run-cmd "npm start" \
      --port 3000 \
      --force-rebuild
```

## Follow build logs

`deployments create` queues the build and returns immediately. To stream build output from within a workflow step, follow it with `dployr logs`:

```yaml
- name: Deploy and follow build
  env:
    DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
  run: |
    dployr deployments create \
      --name my-api \
      --source remote \
      --runtime nodejs \
      --runtime-version 20 \
      --remote https://github.com/${{ github.repository }} \
      --branch ${{ github.ref_name }} \
      --commit ${{ github.sha }} \
      --run-cmd "npm start" \
      --port 3000
    dployr logs my-api --build --follow
```
