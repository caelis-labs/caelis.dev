---
title: "Your first connection"
description: "Choose a model provider or connect an external ACP agent."
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis/connections.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

## Connect a model provider

Start Caelis in your workspace and run:

```text
/connect
```

Choose a supported sign-in flow, configure an API-key provider, or connect a local model provider. Follow the displayed connection instructions.

Then open `/model` to choose the main model and its supported reasoning effort. Ask a small question about the workspace before starting a larger task.

## Connect an ACP agent

Install the external agent separately and make its executable available on the Host's PATH. In `/connect`, choose the agent or select **Custom** for another ACP stdio command.

The selected agent owns its own model connection and execution capabilities. Caelis can only use collaboration and permissions that the agent exposes through ACP.

## Add participant roles

Open `/team` and bind roles to a provider model or ACP agent. Save a configuration you want to reuse. See [participants](../participants/) and the [external ACP guide](../reference/external-acp-agents/).

## Connection trouble

Check the executable, arguments, provider configuration, and the selected Host environment. A successful protocol initialization is not the same as an authenticated prompt: verify by completing a small real request.
