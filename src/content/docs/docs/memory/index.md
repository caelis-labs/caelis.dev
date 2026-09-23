---
title: "Memory overview"
description: "An independent, embeddable memory system for agent hosts."
sidebar: {"order": 0}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/memory/index.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "README.md"
productVersion: "v0.6.1"
---

Memory is a Go module for durable evidence, scoped retrieval, and explicit governance. Its model-facing surface stays deliberately small:

```text
remember(text)
recall(query)
```

## Embed it in your host

Start with [embedded integration](./quickstart/), then understand [Remember and Recall](./remember-recall/) and [authority boundaries](./boundaries/).

Memory owns its database, authorization, derived-memory changes, and durable receipts. The host owns the product experience, configuration, and model connection.

## Inside Caelis

Caelis already opens Memory as part of its Host. Users do not install a separate Memory process, configure a separate endpoint, or start another service.

The current release is an embedded Go package. Future standalone distribution scaffolding should not be treated as a supported one-command server deployment.
