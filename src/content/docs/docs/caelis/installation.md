---
title: "Install and update"
description: "Install Caelis on macOS, Linux, or Windows."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis/installation.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

## macOS and Linux

```sh
curl -fsSL https://caelis.dev/install.sh | sh
```

The installer resolves the latest release, checks its checksum, and installs to `~/.local/bin` by default. Follow its PATH instructions if the command is not found.

## Windows PowerShell

```powershell
irm https://caelis.dev/install.ps1 | iex
```

## npm

```sh
npm install -g @caelis/caelis
```

## Open a workspace

```sh
cd /path/to/your/project
caelis
```

Replace the example path with your project. Continue with [your first connection](../connections/).

## Updates and pinned versions

Run the same installer again to update. The website shell and PowerShell installers always resolve the latest release; they do not select historical versions. Use [GitHub Releases](https://github.com/caelis-labs/caelis/releases) for a specific version and its checksums.

Official release binaries cover macOS, Linux, and Windows on x64 and ARM64. If you build from source, use the Go version declared in the chosen revision's `go.mod`.
