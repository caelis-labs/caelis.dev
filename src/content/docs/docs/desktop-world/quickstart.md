---
title: "Get started"
description: "A CUA-based Computer Use plugin for agent hosts."
project: "desktop-world"
productVersion: "v0.1.2"
sourceRepo: "desktop-world"
sourceRef: "977afec748845c05c294b01318c926db60826378"
sourcePath: "README.md"
---

## 1. Choose the published package

Open [Desktop World Releases](https://github.com/caelis-labs/desktop-world/releases) and choose the v0.1.2 release for your platform. Download `dtw-darwin-arm64` for macOS Apple Silicon (macOS 14+) or `dtw-windows-amd64.exe` for Windows x64, with its matching checksum. Each executable contains the plugin and its CUA worker; no Rust, Python or Node setup is required for installation.

The README may link an earlier tested release. Use the release page and its notes to identify the package you intend to install.

## 2. Connect a supported agent

Your agent's CLI must already be installed. After checking the download, follow the [official installation guide](https://github.com/caelis-labs/desktop-world/blob/v0.1.2/docs/install.md): `dtw install agy` for Antigravity or `dtw install claude` for Claude Code. A compatible plugin host can use `dtw install plugin --to <new-directory>`.

On macOS, grant Accessibility and Screen Recording to the application that launches the agent, then restart it. Windows may require the x64 Visual C++ runtime; its executable is not Authenticode signed.

## 3. Observe before acting

Start a fresh agent session and ask:

> Use Desktop World to inspect my open browser window and describe its controls. Do not click or type.

Then try a small action in a temporary document and ask the agent to verify the visible result. Keep foreground focus and system permission prompts in mind.

## Platform notes

Windows has known display-scaling, modal-dialog and uncertain-focus limitations tracked in [issue #36](https://github.com/caelis-labs/desktop-world/issues/36). Do not blindly repeat an uncertain action. Mixed-DPI displays, elevated apps and arbitrary app coverage are not established by these checks.

Read the [v0.1.2 release notes](https://github.com/caelis-labs/desktop-world/releases/tag/v0.1.2). For Caelis, export the standard Plugin to a permanent directory and follow the [official Caelis installation steps](https://github.com/caelis-labs/desktop-world/blob/v0.1.2/docs/install.md#caelis). Bot manages its own bundled copy through Bot updates.
