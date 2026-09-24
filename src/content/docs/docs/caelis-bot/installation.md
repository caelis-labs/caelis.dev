---
title: "Install Caelis Bot"
description: "Verify the macOS download, then connect your local runtime."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "e58d90b7c26f1f004d25d05d9b55fed6973482b3"
sourcePath: "docs/install.md"
productVersion: "v0.2.0"
---

## Before you start

Use an Apple Silicon Mac and install Caelis or Codex separately. Configure the runtime and complete any account login before starting a conversation. Runtime compatibility is checked through the protocol handshake; follow any connection guidance shown by the app.

## Download and verify

1. [Download Caelis Bot for macOS (Apple Silicon)](/download/caelis-bot/) from the official Cloudflare R2 mirror.
2. Download the matching [SHA-256 file](/download/caelis-bot/?asset=checksum). The links resolve the latest stable package; [GitHub Releases](https://github.com/caelis-labs/caelis-bot/releases/latest) is also available.
3. Follow the [exact verification and first-launch commands](../reference/install/) from the pinned public installation guide.
4. Drag **Caelis Bot.app** into Applications and launch it after verification.

Open the verified app normally and confirm macOS’s first-open prompt if shown. No quarantine-removal command is needed. Stop if download or system verification fails.

## Connect the runtime

Caelis Bot discovers local Caelis and Codex runtimes. Choose one in **Settings → Runtime**. Neither runtime is bundled.

Click the character to write, or double-click to open the conversation. See [conversation controls](../conversation/).

Choose **English** or **Simplified Chinese** in **Settings → General → Language**. Switching language preserves drafts, pending approvals and connection progress.

## Updating

Stable releases starting with **v0.2.0** check for updates daily. Use **Settings → About → Check for Updates** to check immediately, or turn off automatic checks there. Downloading and installing an update requires your confirmation. Bot waits for ongoing work and pending decisions before restarting, and preserves conversations, Notebook and settings.

**Upgrading from v0.1.0:** manually download, verify and install the new DMG once. Quit Bot and replace only the app; keep its application data. Later releases can use in-app updates. Preview and development builds also use manual installation.

R2 keeps only the latest stable package. For an older release, use [GitHub release history](https://github.com/caelis-labs/caelis-bot/releases). Download the DMG and checksum together; if their filenames differ because a release changed between downloads, download a matching pair again.
