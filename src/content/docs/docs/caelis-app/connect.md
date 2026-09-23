---
title: "Connect an ACP agent"
description: "Use an executable, explicit arguments, and an absolute workspace path."
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-app/connect.md"
project: "caelis-app"
sourceRepo: "caelis-app"
sourceRef: "e443ccd1a5f595fb31caade2e5af0fc941d7772d"
sourcePath: "README.md"
productVersion: "Development"
---

## Prepare the agent

Install an ACP-compatible stdio agent separately. The desktop client launches the executable directly, without a shell.

In the connection screen provide:

1. The executable path or command.
2. One argument per line.
3. An absolute workspace path.

For a Caelis build exposing its standard ACP server, use `caelis` as the command and `acp` as one argument. The future App Server integration is a different backend.

## Complete a small request

After connection, create a session and send a simple prompt. Confirm streamed text and tool/permission handling for the selected agent. Agent stderr is kept separate from protocol stdout.

## Respect current capability boundaries

The initial client does not advertise ACP filesystem or terminal capabilities. An agent that requires these may not be compatible with the current scope.

See the [public architecture](https://github.com/caelis-labs/caelis-app/blob/e443ccd1a5f595fb31caade2e5af0fc941d7772d/docs/architecture.md) for the client and transport boundaries.
