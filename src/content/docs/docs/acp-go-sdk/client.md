---
title: "Build a client"
description: "Launch an agent and own its process lifecycle."
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/acp-go-sdk/client.md"
project: "acp-go-sdk"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "README.md"
productVersion: "v1.4.0"
---

Use the [complete client example](https://github.com/caelis-labs/acp-go-sdk/blob/ed838d76cc0bca458732e15a457235c55a4d6642/example/client/main.go) as a starting point.

## Implement the client interface

Handle `RequestPermission` and `SessionUpdate`. Filesystem, terminal, and other optional capabilities should only be advertised after their handlers are implemented.

The minimal example declines permission requests and advertises no filesystem or terminal capabilities.

## Start a process

`transport/stdio.StartClient` takes an executable and an argument slice. It launches the executable directly, drains stderr, and connects the typed protocol client.

After starting, call `Initialize` and check the negotiated protocol version before `NewSession` and `Prompt`.

## Close deliberately

Use `Process.Shutdown(ctx)` with a bounded deadline to close protocol input, wait for a graceful exit, then terminate the owned process tree if necessary. `Close` is the immediate-stop operation.

Do not replace lifecycle handling with a delay or assume that a prompt's completion means the child process has exited.
