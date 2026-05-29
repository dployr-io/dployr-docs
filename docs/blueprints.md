---
title: "Blueprints: Deploy as Code"
description: Define dployr deployments as code in YAML, JSON, or TOML. Version your deployment config, reuse it across services, and deploy with a single command.
---

# Blueprints: deploy as code

A blueprint is a file that describes a deployment. Instead of filling out the deploy form every time, you write your config once, check it into your repo, and pass it to the CLI or dashboard when you deploy.

Blueprints work in YAML, JSON, or TOML. Use whichever your team already reaches for.

## YAML example

```yaml
name: my-api
description: Node.js API
source: remote
runtime:
  type: nodejs
  version: "20"
build_cmd: npm install
run_cmd: npm start
port: 3000
remote:
  url: https://github.com/your-org/your-repo
  branch: main
env_vars:
  NODE_ENV: production
  LOG_LEVEL: info
secrets:
  - DATABASE_URL
  - STRIPE_SECRET_KEY
```

## JSON example

```json
{
  "name": "my-api",
  "source": "remote",
  "runtime": {
    "type": "nodejs",
    "version": "20"
  },
  "build_cmd": "npm install",
  "run_cmd": "npm start",
  "port": 3000,
  "remote": {
    "url": "https://github.com/your-org/your-repo",
    "branch": "main"
  },
  "env_vars": {
    "NODE_ENV": "production"
  },
  "secrets": {}
}
```

## TOML example

```toml
name = "my-api"
source = "remote"
build_cmd = "npm install"
run_cmd = "npm start"
port = 3000

[runtime]
type = "nodejs"
version = "20"

[remote]
url = "https://github.com/your-org/your-repo"
branch = "main"

[env_vars]
NODE_ENV = "production"
```

## Deploying from a blueprint

```bash
dployr deploy --blueprint blueprint.yaml
```

The dashboard's Blueprint Editor does the same thing. Paste your YAML, JSON, or TOML there and the Quick Deploy form updates automatically.

## Field reference

### Required

**`name`**: a stable identifier for the service. Used to match an existing service on redeploy.

**`source`**: where the app comes from. Use `remote` for a git repo, `docker` for a Docker image.

**`runtime`**: the language runtime.
- `type`: e.g. `nodejs`, `python`, `go`, `php`, `ruby`, `dotnet`, `java`, `static`, `docker`
- `version`: e.g. `20` for Node 20, `3.11` for Python 3.11

**`run_cmd`**: the command to start your service.

**`port`**: the port your app listens on.

### Source-specific

**`remote`**: used when `source` is `remote`.
- `url`: the repository URL
- `branch`: branch to deploy from
- `commit_hash`: optional, pin to a specific commit

**`image`**: used when `source` is `docker`. The Docker image reference, e.g. `your-org/your-image:latest`.

### Optional

**`description`**: a short description of the service. Shown in the dashboard.

**`build_cmd`**: runs after the source is fetched, before starting the service. e.g. `npm install`, `pip install -r requirements.txt`.

**`working_dir`**: the directory (relative to the source root) where `build_cmd` and `run_cmd` run.

**`static_dir`**: for static sites, the directory to serve. Used with `runtime.type: static`.

**`env_vars`**: plain environment variables passed to the process.

**`secrets`**: sensitive values. In YAML/TOML, list the key names and dployr pulls the values from your cluster's secret store. In JSON, use an object with key-value pairs (values are stored encrypted).

**`health_check`**: the HTTP path dployr polls to verify your service is up. e.g. `/health`. dployr marks a service degraded only on a **5xx or no response**. A 4xx is fine, it is treated as response to a bad client request, which signifies a running service.

## Using blueprints in GitHub Actions

Check your blueprint file into the repo and reference it in your workflow:

```yaml
- name: Deploy
  env:
    DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
  run: dployr deploy --blueprint blueprint.yaml
```

See [GitHub Actions](/docs/github-actions) for the full workflow setup.
