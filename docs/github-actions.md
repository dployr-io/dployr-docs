---
title: Deploy with GitHub Actions
description: Deploy to dployr automatically on every git push using GitHub Actions.
---

# Deploy with GitHub Actions

Deploy to dployr automatically on every push using the official GitHub Action or the dployr CLI directly.

## Get your deploy token

Create a personal access token from the CLI:

```bash
dployr auth tokens create --name "github-actions" --scope oidc:bind
```

Or from the dashboard: **Settings > API Tokens > New Token**.

In your GitHub repository go to **Settings > Secrets and variables > Actions** and add a secret named `DPLOYR_TOKEN`.

The token owner must have **Developer role or higher** on the target cluster.

## Using the GitHub Action

The simplest way to deploy. No CLI setup required.

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

      - uses: dployr-io/dployr-actions/deploy@v1
        with:
          token: ${{ secrets.DPLOYR_TOKEN }}
          name: my-api
          source: remote
          runtime: nodejs
          runtime-version: '20'
          remote: https://github.com/${{ github.repository }}
          branch: ${{ github.ref_name }}
          commit: ${{ github.sha }}
          build-cmd: npm install
          run-cmd: npm start
          port: '3000'
```

See the [dployr-actions repository](https://github.com/dployr-io/dployr-actions) for all available inputs.

## Using the CLI directly

If you need more control, install the CLI and run commands directly.

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
        run: curl -sSL https://raw.githubusercontent.com/dployr-io/dployr/master/install.sh | bash -s -- --cli-only

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

The `--commit` flag pins the deployment to the exact commit that triggered the workflow, making rollbacks easier to reason about.

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

      - uses: dployr-io/dployr-actions/deploy@v1
        with:
          token: ${{ secrets.DPLOYR_TOKEN }}
          name: my-api
          source: remote
          runtime: nodejs
          runtime-version: '20'
          remote: https://github.com/${{ github.repository }}
          branch: ${{ github.ref_name }}
          commit: ${{ github.sha }}
          build-cmd: npm install
          run-cmd: npm start
          port: '3000'
```

## Deploy multiple services

```yaml
- uses: dployr-io/dployr-actions/deploy@v1
  with:
    token: ${{ secrets.DPLOYR_TOKEN }}
    name: api
    source: remote
    runtime: nodejs
    remote: https://github.com/${{ github.repository }}
    branch: ${{ github.ref_name }}
    commit: ${{ github.sha }}
    run-cmd: node api/server.js
    port: '3000'

- uses: dployr-io/dployr-actions/deploy@v1
  with:
    token: ${{ secrets.DPLOYR_TOKEN }}
    name: worker
    source: remote
    runtime: nodejs
    type: worker
    remote: https://github.com/${{ github.repository }}
    branch: ${{ github.ref_name }}
    commit: ${{ github.sha }}
    run-cmd: node worker/index.js
```

## Force a fresh build

By default dployr reuses a cached image when the source, runtime, and build config have not changed. Pass `force-rebuild: 'true'` to skip the cache:

```yaml
- uses: dployr-io/dployr-actions/deploy@v1
  with:
    token: ${{ secrets.DPLOYR_TOKEN }}
    name: my-api
    source: remote
    runtime: nodejs
    remote: https://github.com/${{ github.repository }}
    branch: ${{ github.ref_name }}
    commit: ${{ github.sha }}
    run-cmd: npm start
    port: '3000'
    force-rebuild: 'true'
```
