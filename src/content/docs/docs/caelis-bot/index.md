---
title: "CaelisBot overview"
description: "A desktop companion for conversations, files and everyday tasks."
sidebar: {"order": 0}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/index.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "README.md"
productVersion: "v0.18.1"
---

CaelisBot puts a small, expressive character on your desktop. Ask for help, share a file, follow background work and review actions that need your decision.

## Choose your desktop

- **macOS:** Apple Silicon, with Caelis included in the app.
- **Linux / WSL:** complete amd64 and arm64 Headless/Web packages, running as a systemd user service and used in a browser. No Linux desktop character.
- **Windows:** x64 installer or portable ZIP, Windows 10 22H2 or later and Microsoft Edge WebView2. Windows 11 was used for native development testing.
- **Connections:** use the included Caelis or your own local Codex installation. Complete the selected model service’s login before chatting.
- **Languages:** English and Simplified Chinese, selectable in Settings.

[Download for macOS](/download/caelis-bot/) · [SHA-256](/download/caelis-bot/?asset=checksum) · [Windows downloads](https://ohmybot.si/#download) · [Linux setup](./linux/) · [v0.18.1 release notes](https://github.com/caelis-labs/caelis-bot/releases/tag/v0.18.1)

Windows packages are not Authenticode signed. See [installation](./installation/) for requirements and first launch, then [conversations, models and tools](./conversation/).

## One companion, several ways to work

Keep editable notes in Notebook, ask for reminders while the app is running, capture and annotate a screen region, and connect supported plugins. Telegram can join the same Bot conversation. These features depend on your chosen models, services and permissions; the app download does not include a model-service subscription.

CaelisBot is available as a desktop application and a Linux Headless/Web edition. It is different from the `caelis bot` terminal command.

Code uses Apache-2.0. Finished character assets use a separate [asset license](./reference/character-assets/).
