---
title: "Caelis App overview"
description: "An ACP-first desktop workbench in early beta."
sidebar: {"order": 0}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-app/index.md"
project: "caelis-app"
sourceRepo: "caelis-app"
sourceRef: "e443ccd1a5f595fb31caade2e5af0fc941d7772d"
sourcePath: "README.md"
productVersion: "Development"
---

Caelis App is a separate desktop client for coding agents. Its first contract is the open Agent Client Protocol.

## Current scope

The early beta can launch a local stdio ACP agent, negotiate ACP v1, create a workspace-scoped session, and render streaming messages, reasoning, tool calls, and plans. It surfaces permission requests and cancellation.

It does not currently advertise ACP filesystem or terminal capabilities. Multi-session persistence, remote transports, signing, updates, and production packaging are outside the initial scope.

## Try the source

There is no published installer. Follow the [local development guide](./quickstart/), then [connect an ACP agent](./connect/).

The terminal UI remains the primary Caelis product surface. Do not assume a planned Caelis App Server adapter is part of the current public client.
