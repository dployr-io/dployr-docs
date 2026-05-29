---
title: Deploy with GitHub Actions
description: Deploy to dployr automatically on every git push using GitHub Actions and the dployr CLI. Set up DPLOYR_TOKEN and add the workflow to your repository.
---

# Deploy with GitHub Actions

You can deploy to dployr automatically on every push by running the dployr CLI in a GitHub Actions workflow. No separate action needed. Just authenticate with a token and run `dployr deploy`.

## Get your deploy token

In the dashboard, go to **Settings** and find your API token. Copy it. You'll add it to GitHub as a secret.

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
          dployr deploy \
            --name my-api \
            --source remote \
            --runtime nodejs \
            --version 20 \
            --remote https://github.com/${{ github.repository }} \
            --branch ${{ github.ref_name }} \
            --build-cmd "npm install" \
            --run-cmd "npm start" \
            --port 3000
```

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
          dployr deploy \
            --name my-api \
            --source remote \
            --runtime nodejs \
            --version 20 \
            --remote https://github.com/${{ github.repository }} \
            --branch ${{ github.ref_name }} \
            --build-cmd "npm install" \
            --run-cmd "npm start" \
            --port 3000
```

## Using a blueprint

If you have a blueprint file checked into your repo, you can pass it directly:

```yaml
- name: Deploy
  env:
    DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
  run: dployr deploy --blueprint blueprint.yaml
```

See [Blueprints](/docs/blueprints) for the full config format.

## Deploy to multiple services

```yaml
- name: Deploy API
  env:
    DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
  run: dployr deploy --name api --blueprint api.blueprint.yaml

- name: Deploy Worker
  env:
    DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
  run: dployr deploy --name worker --blueprint worker.blueprint.yaml
```
