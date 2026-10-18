---
title: "Install Caelis Bot"
description: "Download for macOS or Windows, then connect a model."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "c6579eecb9da57a91090174b9a414750a3e3ef4f"
sourcePath: "docs/install.md"
productVersion: "v0.15.2"
---

## macOS: Apple Silicon

1. [Download the latest macOS DMG](/download/caelis-bot/) and its matching [SHA-256 file](/download/caelis-bot/?asset=checksum).
2. Check the [official latest release](https://github.com/caelis-labs/caelis-bot/releases/latest) against the [macOS download manifest](https://releases.caelis.dev/caelis-bot/latest.json). If versions differ, wait for matching assets rather than installing an older default.
3. Follow the [verification steps](../reference/install/), then drag **Caelis Bot.app** into Applications.
4. Open the app normally and confirm macOS’s first-open prompt if shown. Stable macOS releases are Developer ID signed and Apple notarized. No quarantine-removal command is needed.

Intel Mac packages are not currently offered. If checksum or system verification fails, stop and get a fresh official copy.

## Windows: x64

Open [the latest stable release](https://github.com/caelis-labs/caelis-bot/releases/latest). Choose the file ending in **windows-amd64-stable-Setup.exe** for installation, or **windows-amd64-stable.zip** for a portable copy, together with its matching `.sha256` file. Use the installer to select an installation folder; extract the portable ZIP before running it.

Windows 10 22H2 x64 or later and **Microsoft Edge WebView2 Runtime** are required. Native development testing used Windows 11. These Windows binaries are **not Authenticode signed**: SmartScreen or organization policy may warn or block them. Do not confuse signed update metadata with a signed Windows executable. Read the release notes before installing.

Stable and Preview have separate installations and data. Installing Stable does not migrate Preview data or change its update channel. Windows ARM64 and Linux desktop packages are not available.

## Connect and start chatting

1. Choose **Caelis** or **Codex** in the first-run guide. Caelis is included in the desktop packages; no separate Caelis install is needed. Codex uses your own local installation and account, and the guide shows any missing setup steps.
2. Connect a model service and complete its login. If a usable connection already exists, select a model and continue. The download does not include provider credits or a subscription.
3. Choose optional screenshot and image-pinning tools, enter your assistant’s name and optional introduction, then start chatting once the connection is ready.

You can change the connection and models later in **Settings → Connections & Models**. Login and any required system permissions remain yours to complete. Choose English or Simplified Chinese in General settings.

Click the character to open or hide chat. The macOS menu bar or Windows system tray provides settings and Quit. [Learn the conversation controls](../conversation/).

## Updates and your data

Check **Settings → Updates** for update controls. Installation and restart require confirmation; the app keeps conversations, Notebook and settings in its data directory. When replacing an app manually, quit it and replace only the application, keeping its data.

Very early macOS releases without an updater need one manual upgrade. Development builds do not use the public updater. Older packages are available in [release history](https://github.com/caelis-labs/caelis-bot/releases); use matching packages and checksums rather than mixing releases.
