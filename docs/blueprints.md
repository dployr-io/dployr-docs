# Blueprints

Blueprints let you define deployments in a reusable, reviewable way. You can apply the same blueprint across multiple VMs to keep the runtime and the steps consistent.

Blueprints can be written as JSON, YAML, or TOML.

## Example (JSON)

```json
{
  "name": "old-county-times",
  "description": "Simple newspaper application",
  "source": "remote",
  "runtime": {
    "type": "nodejs",
    "version": "20"
  },
  "run_cmd": "npm start",
  "build_cmd": "npm install",
  "port": 3001,
  "working_dir": "nodejs",
  "static_dir": "",
  "image": "",
  "env_vars": {
    "PORT": 3001
  },
  "secrets": {},
  "remote": {
    "url": "https://github.com/dployr-io/dployr-examples",
    "branch": "master",
    "commit_hash": ""
  }
}
```

## Example (YAML)

```yaml
name: old-county-times
description: Simple newspaper application
source: remote
runtime:
  type: nodejs
  version: "20"
run_cmd: npm start
build_cmd: npm install
port: 3001
working_dir: nodejs
static_dir: ""
image: ""
env_vars:
  PORT: 3001
secrets: {}
remote:
  url: https://github.com/dployr-io/dployr-examples
  branch: master
  commit_hash: ""
```

## Example (TOML)

```toml
name = "old-county-times"
description = "Simple newspaper application"
source = "remote"
port = 3001
working_dir = "nodejs"
static_dir = ""
image = ""
run_cmd = "npm start"
build_cmd = "npm install"

[runtime]
type = "nodejs"
version = "20"

[env_vars]
PORT = 3001

[secrets]

[remote]
url = "https://github.com/dployr-io/dployr-examples"
branch = "master"
commit_hash = ""
```

## Fields explained

### Required

- **`name`**
  A stable identifier for the deployment.
- **`source`**
  Where the application comes from. Common values are `remote`, `docker`. This controls which source-specific block is used.
- **`runtime`**
  Which runtime to use on the VM.
  - **`type`**: for example `nodejs`
  - **`version`**: the runtime version to install/use (for example `20`)
- **`run_cmd`**
  Command to start the service process on the VM.
- **`port`**
  Service port dployr should expect the app to listen on.

### Source-specific

- **`remote`**
  Used when `source` is `remote`.
  - **`url`**: repository URL
  - **`branch`**: branch to deploy from
  - **`commit_hash`**: optional pin to a specific commit

### Optional

- **`description`**
  Human-readable description.
- **`build_cmd`**
  Command to run on the VM to build/prepare the app after fetching the source.
- **`working_dir`**
  Directory (relative to the source root) to run `build_cmd` and `run_cmd` from.
- **`env_vars`**
  Plain environment variables passed to the process.
- **`secrets`**
  Secret values, just like **`env_vars`** but never streamed to clients.
- **`static_dir`**
  Directory for static content (leave empty when not applicable).
- **`image`**
  Docker image reference when using Docker-based deployments (leave empty when not applicable).

## Next Steps

- [Learn about core concepts](./concepts)
- [Use Dployr Web](./dployr-web)
- [Use the CLI](./cli)
