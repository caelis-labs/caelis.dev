---
title: "Choose your starting point"
description: "Five independent projects. Find the one that fits your work."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/choose.md"
---

| Your goal | Start here |
| --- | --- |
| Work with models and coding agents in a terminal | [Caelis](/docs/caelis/) |
| Keep an agent-powered companion on your desktop | [CaelisBot](/docs/caelis-bot/) |
| Build an ACP agent or client in Go | [ACP Go SDK](/docs/acp-go-sdk/) |
| Give your agent host durable, governed memory | [Memory](/docs/memory/) |
| Connect your agent to desktop apps with a CUA-based plugin | [Desktop World](/docs/desktop-world/) |

## How the projects fit together

Caelis provides a local collaboration workspace. ACP Go SDK and Memory are independent Go modules that other hosts can use without adopting Caelis.

CaelisBot is a separate desktop companion. The macOS and Windows packages include Caelis, or you can connect your own local Codex installation. It is different from the `caelis bot` terminal command in the Caelis repository.


Desktop World packages and extends CUA for desktop inspection and actions. It is a prerelease; read the platform notes before use.

## What you need

Applications connect to a model provider or an external agent to do model-powered work. Local data storage does not mean that inference happens offline. Read the connection and installation guide for the project you choose.
