---
title: "Build an agent"
description: "Implement the baseline methods and stream session updates."
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/acp-go-sdk/agent.md"
project: "acp-go-sdk"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "README.md"
productVersion: "v1.4.0"
---

Start from the [minimal agent example](https://github.com/caelis-labs/acp-go-sdk/blob/ed838d76cc0bca458732e15a457235c55a4d6642/example/minimal-agent/main.go).

## Baseline methods

Implement `Initialize`, `NewSession`, `Prompt`, and `Cancel` on `acp.Agent`. Use typed Session updates to send output to the client.

Optional methods are separate interfaces. Advertise a capability only when its implementation is present; an omitted optional interface returns JSON-RPC method-not-found.

## Connect over stdio

The lifecycle below is an excerpt; `agent` and `ctx` are supplied by your application.

```go
connection, err := stdio.NewAgentConnection(agent, acp.ConnectionOptions{})
if err != nil {
    return err
}
defer connection.Close()
return connection.Wait(ctx)
```

Import `github.com/caelis-labs/acp-go-sdk/transport/stdio`. Keep application logs on stderr; stdout carries protocol messages.

Next, connect a [client](../client/) and complete a real initialize → new session → prompt cycle.
