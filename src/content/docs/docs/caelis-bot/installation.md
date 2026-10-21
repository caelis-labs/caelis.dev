---
title: "Install CaelisBot"
description: "Choose macOS or Windows desktop, or Linux Headless/Web, then connect a model."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "docs/install.md"
productVersion: "v0.18.1"
---

Current stable release: [v0.18.1](https://github.com/caelis-labs/caelis-bot/releases/tag/v0.18.1). Includes Caelis Core 0.73.1; desktop packages use Desktop World 0.1.2.

[macOS](#macos-apple-silicon) · [Windows](#windows-x64) · [Linux / WSL Headless + Web](../linux/)

## macOS: Apple Silicon

1. [Download the latest macOS DMG](/download/caelis-bot/) and its matching [SHA-256 file](/download/caelis-bot/?asset=checksum).
2. Check the [official latest release](https://github.com/caelis-labs/caelis-bot/releases/latest) against the [macOS download manifest](https://releases.caelis.dev/caelis-bot/latest.json). If versions differ, wait for matching assets rather than installing an older default.
3. Follow the [verification steps](../reference/install/), then drag **Caelis Bot.app** into Applications.
4. Open the app normally and confirm macOS’s first-open prompt if shown. Stable macOS releases are Developer ID signed and Apple notarized. No quarantine-removal command is needed.

Intel Mac packages are not currently offered. If checksum or system verification fails, stop and get a fresh official copy.

## Windows: x64

Use the [Windows installer](https://ohmybot.si/download/windows/setup/) or [portable ZIP](https://ohmybot.si/download/windows/zip/). The [official release](https://github.com/caelis-labs/caelis-bot/releases/latest) provides matching checksums. Choose the file ending in **windows-amd64-stable-Setup.exe** for installation, or **windows-amd64-stable.zip** for a portable copy, together with its matching `.sha256` file. Use the installer to select an installation folder; extract the portable ZIP before running it.

Windows 10 22H2 x64 or later and **Microsoft Edge WebView2 Runtime** are required. Native development testing used Windows 11. These Windows binaries are **not Authenticode signed**: SmartScreen or organization policy may warn or block them. Do not confuse signed update metadata with a signed Windows executable. Read the release notes before installing.

Stable and Preview have separate installations and data. Installing Stable does not migrate Preview data or change its update channel. Windows ARM64 and Linux desktop packages are not available.

## Linux / WSL: Headless + Web

Complete **amd64 / arm64 tar.gz** releases include Caelis CLI and the Web interface. The official installer runs Bot as a systemd user service; open `http://127.0.0.1:9317` in your browser afterwards.

```sh
curl -fsSL https://releases.caelis.dev/caelis-bot/install.sh | sh
```

Requires systemd user services, Python 3, OpenSSL and bubblewrap; WSL must have systemd enabled. See [Linux installation, downloads and upgrades](../linux/). This edition has no Linux desktop character, Computer Use or Web terminal.

## Connect and start chatting

1. Choose **Caelis** or **Codex** in the first-run guide. Caelis is included in desktop and Linux packages; no separate Caelis install is needed. Codex uses your own local installation and account, and the guide shows any missing setup steps.
2. Connect a model service and complete its login. If a usable connection already exists, select a model and continue. The download does not include provider credits or a subscription.
3. On desktop, choose optional screenshot and image-pinning tools, enter your assistant’s name and optional introduction, then start chatting once the connection is ready.

You can change the connection and models later in **Settings → Connections & Models**. Login and any required system permissions remain yours to complete. Choose English or Simplified Chinese in General settings.

On desktop, click the character to open or hide chat. The macOS menu bar or Windows system tray provides settings and Quit. [Learn the conversation controls](../conversation/).

Caelis experimental features follow the current Core configuration and start disabled by default. Only an explicit user change saves a setting; login or viewing settings does not enable them.

## Updates and your data

Check **Settings → Updates** for update controls. Installation and restart require confirmation; the app keeps conversations, Notebook and settings in its data directory. When replacing an app manually, quit it and replace only the application, keeping its data.

Very early macOS releases without an updater need one manual upgrade. Development builds do not use the public updater. Older packages are available in [release history](https://github.com/caelis-labs/caelis-bot/releases); use matching packages and checksums rather than mixing releases.
