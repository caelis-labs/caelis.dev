---
title: "Install the preview"
description: "Verify the macOS download, then connect your local runtime."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "0842c59ac7ab007b67f7d25a51129b87d37bd60e"
sourcePath: "docs/install.md"
productVersion: "v0.1.0-preview.1"
---

## Before you start

Use an Apple Silicon Mac and install a local Codex runtime separately. Complete its sign-in before starting a conversation in Caelis Bot.

## Download and verify

1. Open [Caelis Bot Releases](https://github.com/caelis-labs/caelis-bot/releases).
2. Choose the compatible preview DMG and its `.sha256` file.
3. Follow the [exact verification and first-launch commands](../reference/install/) from the pinned public installation guide.
4. Drag **Caelis Bot.app** into Applications and launch it after verification.

The preview is ad-hoc signed and not notarized. Follow the guide for the verified bundle; do not bypass a failed checksum or repair a broken signature by silently re-signing the app.

## Connect the runtime

Caelis Bot discovers the installed Codex runtime automatically. You can choose it in **Settings → Runtime**. Neither Codex nor its development tools are bundled.

Click the character to write, or double-click to open the conversation. See [conversation controls](../conversation/).

## Updating

Download and verify the newer compatible release and install it manually. Keep existing app data. Review the version's release notes and installation guide before updating.
