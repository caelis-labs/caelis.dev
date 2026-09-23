---
title: "Troubleshooting and preview limits"
description: "Check the runtime, platform, and release requirements."
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/troubleshooting.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "0842c59ac7ab007b67f7d25a51129b87d37bd60e"
sourcePath: "README.md"
productVersion: "v0.1.0-preview.1"
---

## The character appears, but conversations do not start

Check that a local Codex runtime is installed and signed in. Open **Settings → Runtime** and confirm the selected executable. Caelis Bot does not include a model runtime or account.

## macOS blocks the first launch

Preview releases are ad-hoc signed and not notarized. Use the [installation guide](../reference/install/) to verify the download and signature, and follow its scoped first-launch steps. Stop if verification fails.

## Is Intel, Windows, or Linux supported?

The current public preview is for Apple Silicon Macs. This website does not claim native support for other platforms or architectures.

## Is this the same as `caelis bot`?

No. This section covers the separate desktop app. The CLI command belongs to the Caelis project.

## Are character assets open source?

The code is Apache-2.0. Finished character assets use a separate license and their modeling sources are private. See [character assets](../reference/character-assets/) for the public contract.
