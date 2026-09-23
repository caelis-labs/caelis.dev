---
title: "Choose your starting point"
description: "Five independent projects. Find the one that fits your work."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/choose.md"
---

| Your goal | Start here |
| --- | --- |
| Work with models and coding agents in a terminal | [Caelis](/docs/caelis/) |
| Keep an agent-powered companion on your Mac | [Caelis Bot](/docs/caelis-bot/) |
| Build an ACP agent or client in Go | [ACP Go SDK](/docs/acp-go-sdk/) |
| Give your agent host durable, governed memory | [Memory](/docs/memory/) |
| Explore an ACP-first desktop workbench | [Caelis App](/docs/caelis-app/) |

## How the projects fit together

Caelis provides a local collaboration workspace. ACP Go SDK and Memory are independent Go modules that other hosts can use without adopting Caelis.

Caelis Bot is a separate desktop companion. Its current public preview uses a locally installed Codex runtime. It is different from the `caelis bot` terminal command in the Caelis repository.

Caelis App is an early desktop client built around ACP. It does not yet offer a public desktop installer.

## What you need

Applications connect to a model provider or an external agent to do model-powered work. Local data storage does not mean that inference happens offline. Read the connection and installation guide for the project you choose.
