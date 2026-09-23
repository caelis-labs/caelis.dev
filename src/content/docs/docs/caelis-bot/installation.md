---
title: "Install Caelis Bot"
description: "Verify the macOS download, then connect your local runtime."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "6d60b22779b9ffa8927f9a306219e5bccb699320"
sourcePath: "docs/install.md"
productVersion: "v0.1.0"
---

## Before you start

Use an Apple Silicon Mac and install Caelis or Codex separately. Configure the runtime and complete any account login before starting a conversation. Runtime compatibility is checked through the protocol handshake; follow any connection guidance shown by the app.

## Download and verify

1. Open [the latest stable Caelis Bot release](https://github.com/caelis-labs/caelis-bot/releases/latest).
2. Choose the compatible stable DMG and its `.sha256` file.
3. Follow the [exact verification and first-launch commands](../reference/install/) from the pinned public installation guide.
4. Drag **Caelis Bot.app** into Applications and launch it after verification.

Open the verified app normally and confirm macOS’s first-open prompt if shown. No quarantine-removal command is needed. Stop if download or system verification fails.

## Connect the runtime

Caelis Bot discovers local Caelis and Codex runtimes. Choose one in **Settings → Runtime**. Neither runtime is bundled.

Click the character to write, or double-click to open the conversation. See [conversation controls](../conversation/).

## Updating

Download and verify the newer compatible release and install it manually. Keep existing app data. Review the version's release notes and installation guide before updating.
