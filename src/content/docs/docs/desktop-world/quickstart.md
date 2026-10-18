---
title: "Get started"
description: "A CUA-based Computer Use plugin for agent hosts."
project: "desktop-world"
productVersion: "v0.1.0-rc.9"
sourceRepo: "desktop-world"
sourceRef: "79a097b3b479fbf65926fdd6a58c296d8d1e1e1e"
sourcePath: "README.md"
---

## 1. Choose the published package

Open [Desktop World Releases](https://github.com/caelis-labs/desktop-world/releases) and choose a prerelease for your platform. Download `dtw-darwin-arm64` for macOS Apple Silicon (macOS 14+) or `dtw-windows-amd64.exe` for Windows x64, with its matching checksum. Each executable contains the plugin and its CUA worker; no Rust, Python or Node setup is required for installation.

The README may link an earlier tested prerelease. Use the release page and its notes to identify the package you intend to install.

## 2. Connect a supported agent

Your agent's CLI must already be installed. After checking the download, follow the [official installation guide](https://github.com/caelis-labs/desktop-world/blob/v0.1.0-rc.9/docs/install.md): `dtw install agy` for Antigravity or `dtw install claude` for Claude Code. A compatible plugin host can use `dtw install plugin --to <new-directory>`.

On macOS, grant Accessibility and Screen Recording to the application that launches the agent, then restart it. Windows may require the x64 Visual C++ runtime; its prerelease executable is not Authenticode signed.

## 3. Observe before acting

Start a fresh agent session and ask:

> Use Desktop World to inspect my open browser window and describe its controls. Do not click or type.

Then try a small action in a temporary document and ask the agent to verify the visible result. Keep foreground focus and system permission prompts in mind.

## Platform notes

RC.9's Windows checks cover an isolated fixture and Chrome. Some DPI-unaware windows at 125% scaling have screenshot/geometry mismatches; modal file dialogs can keep the original execution waiting; a focus error can occur even when an action took effect. Do not blindly repeat an uncertain action. Mixed-DPI displays, elevated apps and arbitrary app coverage are not established by these checks.

See [RC.9 release evidence and remaining limitations](https://github.com/caelis-labs/desktop-world/releases/tag/v0.1.0-rc.9) before use. A direct `dtw install caelis` command is not part of this guide; follow the supported plugin installation path of your host.
