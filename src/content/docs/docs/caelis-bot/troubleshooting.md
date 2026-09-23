---
title: "Troubleshooting and support"
description: "Check the runtime, platform, and release requirements."
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/troubleshooting.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "6d60b22779b9ffa8927f9a306219e5bccb699320"
sourcePath: "README.md"
productVersion: "v0.1.0"
---

## The character appears, but conversations do not start

Check that your selected Caelis or Codex runtime is installed and configured. Open **Settings → Runtime** and confirm the selected executable. Caelis Bot does not include a model runtime or account.

## macOS blocks the first launch

Use the latest stable release and the [installation guide](../reference/install/) to verify the download. Confirm the normal first-open prompt when shown. If macOS rejects the app, stop and download a fresh official copy; do not disable security checks.

## Is Intel, Windows, or Linux supported?

The current release is for Apple Silicon Macs. This website does not claim native support for other platforms or architectures.

## Does it include a runtime?

No. This is a separate desktop app that connects to a local Caelis or Codex runtime. Install and configure the runtime independently.

## Are character assets open source?

The code is Apache-2.0. Finished character assets use a separate license and their modeling sources are private. See [character assets](../reference/character-assets/) for the public contract.
