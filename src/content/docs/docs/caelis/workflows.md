---
title: "Tools and automation"
description: "Extend a workspace and run a single prompt."
sidebar: {"order": 6}
project: "caelis"
sourceRepo: "caelis"
sourceRef: "fa598b00db7d6635086d3388f4d4c9c335642cfd"
sourcePath: "README.md"
productVersion: "v0.72.2"
---

## Bring your tools

Caelis supports MCP servers, skills and plugins alongside file and command tools. Add only tools appropriate for the workspace, and review project configuration before trusting it. External ACP agents may expose different tools and permissions.

## Run a single prompt

From your project directory, after connecting a model:

```sh
caelis -p "Summarize this repository."
caelis -p "Review the changes." -format json
caelis -p "Run the tests." -format jsonl
```

Text is useful for a quick result, JSON for one structured response, and JSONL for streamed events. These commands can use tools; ordinary permissions and approvals still apply. A request to run tests is not proof that they passed: inspect the actual result.

## Connect an ACP client

```sh
caelis acp
```

Use this command in a client that supports ACP stdio. The client’s configuration determines how it starts the process and selects the working directory.

## Keep useful context

Built-in Remember and Recall work with local session context and require no extra installation. Optional Memory Steward configuration is available through `/team`. Model requests still follow your provider choice.

The `caelis bot` terminal entry is separate from the [Caelis Bot desktop app](/docs/caelis-bot/). Start with the desktop app for a character, screenshot tools and everyday conversation.
