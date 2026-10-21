---
title: "Linux / WSL: install and open the Web app"
description: "Install the signed Headless/Web release as a systemd user service."
sidebar: {"order": 2}
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "docs/install.linux.md"
productVersion: "v0.18.1"
---

CaelisBot **v0.18.1** is available as a complete Linux **amd64 / arm64** package. It runs without a desktop window and includes Caelis Core **0.73.1** and the Web interface. Use chat, files, settings and accepted background work from your browser. This is not a Linux desktop-character edition; Computer Use and Web terminals are unavailable.

## Before you install

Use an ordinary Linux account with a running **systemd user manager**, **Python 3**, **OpenSSL with Ed25519 support**, and **bubblewrap with working unprivileged user namespaces**. Install missing dependencies through your distribution’s package manager. The published package needs no Go or Node.js.

WSL must have systemd enabled. Follow [Microsoft’s systemd guide](https://learn.microsoft.com/en-us/windows/wsl/systemd), restart WSL, and confirm `systemctl --user show-environment` works. Systemd services do not keep a closed WSL instance running. Physical WSL acceptance has not been established by the release checks.

## Install and open

Run the official installer on the Linux machine:

```sh
curl -fsSL https://releases.caelis.dev/caelis-bot/install.sh | sh
```

You can [save and inspect the script](https://releases.caelis.dev/caelis-bot/install.sh) first. It selects the architecture, verifies the signed index and downloaded files, then enables and starts `caelisbot.service` for your user. It does not use sudo, change firewall rules or enable linger.

Open `http://127.0.0.1:9317` on that machine. Closing the browser leaves accepted work running while the service and machine remain running.

1. Choose **Caelis** to connect a model service or reuse an authenticated model. Caelis CLI is included.
2. To use **Codex**, choose **Install Codex**, then **Sign in with ChatGPT**. Complete the displayed device-code sign-in on the official verification page. Codex and a model subscription are not bundled.
3. Model addresses, paths, files and accounts refer to the **machine running the service**, including when your browser is elsewhere.

Caelis experimental features follow Core’s current configuration, initially disabled by default. Only your explicit changes are saved; opening settings does not enable them.

## Manual downloads

| Architecture | Complete package | Checksum inventory |
| --- | --- | --- |
| amd64 / x86_64 | [tar.gz](https://ohmybot.si/download/linux/amd64/) | [SHA-256](https://ohmybot.si/download/linux/amd64/?asset=checksum) |
| arm64 / aarch64 | [tar.gz](https://ohmybot.si/download/linux/arm64/) | [SHA-256](https://ohmybot.si/download/linux/arm64/?asset=checksum) |

These links resolve each architecture’s latest stable R2 index. [The v0.18.1 GitHub release](https://github.com/caelis-labs/caelis-bot/releases/tag/v0.18.1) preserves the exact versioned assets. Keep the complete bundle together. A checksum checks transferred bytes; the official installer also verifies the signed inventory. Manual installations and their updates remain your responsibility. No AppImage, deb, rpm or official Docker image is published.

## Service and upgrades

```sh
systemctl --user status caelisbot.service
systemctl --user stop caelisbot.service
systemctl --user start caelisbot.service
journalctl --user -u caelisbot.service
```

Use **Settings → Updates**, or explicitly upgrade the managed installation:

```sh
curl -fsSL https://releases.caelis.dev/caelis-bot/install.sh | sh -s -- --upgrade
```

The managed update waits for a safe idle handoff and preserves the profile, login, Notebook and history. Busy work can leave it scheduled; follow Settings and rerun `--upgrade` after installation if launcher repair remains. Rerunning the installer without `--upgrade` keeps existing code and data and starts the owned user service.

Code lives under `$XDG_DATA_HOME/caelisbot-install`; private data lives separately under `$XDG_DATA_HOME/caelisbot` (default base `~/.local/share`). Keep the data directory when replacing the application. Do not remove it as an ordinary upgrade step.

## A VM or another computer

A guest’s localhost is not the host’s localhost. Keep the service on loopback and, when needed, forward it to your own machine:

```sh
ssh -N -L 127.0.0.1:9317:127.0.0.1:9317 user@guest
```

Replace `user@guest` with your SSH account and host. Do not expose this trusted local forward publicly. Private-network or reverse-proxy access requires explicit allowed origins and pairing; follow the [official network guide](https://github.com/caelis-labs/caelis-bot/blob/v0.18.1/docs/headless-web.md). The installer does not configure remote access automatically.

[Official Linux installation guide](https://github.com/caelis-labs/caelis-bot/blob/v0.18.1/docs/install.linux.md) · [Troubleshooting](../troubleshooting/)
