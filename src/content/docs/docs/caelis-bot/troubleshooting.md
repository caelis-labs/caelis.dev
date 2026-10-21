---
title: "Troubleshooting and support"
description: "Check connections, downloads, screenshots and supported platforms."
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/troubleshooting.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "README.md"
productVersion: "v0.18.1"
---

## The character appears, but chat does not start

Open **Settings → Connections & Models** and finish the selected connection’s login and model selection. Caelis is included; Codex needs your local installation. An installed app is not the same as an authenticated model connection. Try a small question after setup.

## macOS blocks first launch

Use the [installation guide](../reference/install/) to verify the official package. Confirm the normal first-open prompt if shown. If checksum, signature or Gatekeeper verification fails, download a fresh official copy; do not disable system checks.

## Windows shows a warning

Current Windows packages are not Authenticode signed, so SmartScreen and organizational policies may warn or block installation. Use only the official release, match its checksum and review its release notes. Check that Microsoft Edge WebView2 is installed. [Windows requirements](../installation/#windows-x64).

## Ask Bot is unavailable in the screenshot toolbar

The selected model must advertise image support. Choose a compatible model in Connections & Models. Screenshot, copy, annotation and pinning can still be used independently. If capture itself is unavailable, check Extras and the app’s system permissions.

## Which platforms are supported?

Apple Silicon macOS and Windows x64 packages are published. Windows requires Windows 10 22H2 or later and WebView2; native testing used Windows 11. Intel Mac, Windows ARM64 and Linux desktop packages are not offered. Linux amd64/arm64 Headless/Web packages are also available as a browser interface to a resident service. This is distinct from an SSH work destination selected in the desktop app.

## The Linux service or Web page is unavailable

Check `systemctl --user status caelisbot.service`, then `journalctl --user -u caelisbot.service`. Confirm the systemd user manager, Python 3, OpenSSL and bubblewrap are available; WSL must enable systemd. A VM’s localhost is not the host’s localhost: follow the [Linux guide](../linux/) for a loopback-only SSH forward. Do not bypass the sandbox requirements.

## Where are my data and account?

Notebook and application data stay on the machine running Bot. Your chosen model or connected service may receive prompts and attachments. The package does not include an account, subscription or credits. Keep application data when reinstalling. Windows Preview and Stable data remain separate.

## Report a problem

Use the app’s recovery guidance or open an [issue](https://github.com/caelis-labs/caelis-bot/issues) with your platform, release and steps to reproduce. Review any diagnostic report before sharing it; remove personal conversations, account details, private paths and keys. [Character licensing](../reference/character-assets/) is separate from the Apache-2.0 code license.
