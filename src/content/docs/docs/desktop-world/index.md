---
title: "Desktop World"
description: "A CUA-based Computer Use plugin for agent hosts."
project: "desktop-world"
productVersion: "v0.1.0-rc.9"
sourceRepo: "desktop-world"
sourceRef: "79a097b3b479fbf65926fdd6a58c296d8d1e1e1e"
sourcePath: "README.md"
---

Desktop World is a **Computer Use plugin built on CUA**, extended and packaged by Caelis Labs. It gives supported agents a way to inspect windows, take screenshots, click, type and use supported native actions. Observe the app again to confirm the result.

It packages the CUA Driver from [trycua/cua](https://github.com/trycua/cua), retaining upstream credit and licenses. It is not a new desktop automation engine built from scratch. See the [published third-party notices](https://github.com/caelis-labs/desktop-world/blob/v0.1.0-rc.9/THIRD_PARTY_NOTICES.md).

## Start here

- [Install and try a read-only task](/docs/desktop-world/quickstart/).
- [Official source](https://github.com/caelis-labs/desktop-world).
- [Published prereleases and platform notes](https://github.com/caelis-labs/desktop-world/releases).

## Current scope

The current distribution is a **prerelease**, with macOS Apple Silicon and Windows x64 executables. macOS includes app-level window observation; the corresponding extension is not available on Windows. Linux is not advertised as a supported distribution.

RC.9 includes actual Windows fixture and isolated Chrome checks, but full Windows GUI acceptance has not passed. Display scaling, modal dialogs and focus validation have known limits. Read the release notes before using pixel actions. System permissions and the agent host's approval rules still apply.
