# Dployr Web

The Web UI is available at [app.dployr.io](https://app.dployr.io/) (source: [dployr](https://github.com/dployr-io/dployr)). It talks to **Base**, which routes actions to the right VM through `dployrd`.

## Deploy

Deployments can be configured with a form builder, or defined programmatically as blueprints.

If you want the blueprint format and examples, see [Blueprints](/docs/blueprints).

![Deploy](../public/deploy.gif)

## Console

An interactive shell in the browser. It uses the VM’s `dployrd` connection, so you can open a session without initiating an SSH connection to the VM.

![Console](../public/console.gif)

## Logs

Logs are streamed over WebSocket.

![Logs](../public/logs.gif)

## Graph

A resource graph showing services, apps, and live connections.

![Graph](../public/graph.gif)

## Events

Every important action is recorded as an event. In a team, this pairs with RBAC so you can answer “who did what, and when”.

![Events](../public/events.png)

## Process viewer

View running processes and system stats from your VM.

![Process viewer](../public/process.gif)

## File explorer

Browse files on your VM with an interactive file explorer.

![File explorer](../public/files.gif)

## Next Steps

- [Learn about core concepts](./concepts)
- [Write a blueprint](./blueprints)
- [Use the CLI](./cli)
