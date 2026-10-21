---
title: "Caelis overview"
description: "A local collaboration workspace for models and ACP agents."
sidebar: {"order": 0}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis/index.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "744b6f421c9b19ac905c654c0e6afae1126bd297"
sourcePath: "README.md"
productVersion: "v0.73.1"
---

Caelis brings models and ACP-compatible agents into one local Session. Participants keep their own conversations, exchange findings, and continue working as you steer the task.

## Start in three steps

1. [Install Caelis](./installation/).
2. [Connect a model or agent](./connections/).
3. Open a repository and ask for a concrete outcome.

```text
Map this repository and explain how to run its tests.
```

Your launch directory is the workspace. Sessions live locally; use `/resume` to return to earlier conversations.

## Bring a team together

Use `/team` to configure participant roles. You can follow a participant, send text or images, and coordinate work from the main conversation. See [participants](./participants/).

Local storage and execution are separate from inference: model requests go to your selected provider or external agent. Review [approvals and sandboxing](./safety/) before broadening tool access.

## Extend the workspace

Use MCP servers, skills and plugins to bring in tools. Project MCP configuration requires workspace trust. Built-in memory needs no separate installation; you choose whether to configure optional model-assisted processing.

Caelis can also run a single prompt or serve an ACP client. See [tools and automation](./workflows/) for a first example.
