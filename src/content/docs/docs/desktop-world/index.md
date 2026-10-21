---
title: "Desktop World"
description: "A CUA-based Computer Use plugin for agent hosts."
project: "desktop-world"
productVersion: "v0.1.2"
sourceRepo: "desktop-world"
sourceRef: "977afec748845c05c294b01318c926db60826378"
sourcePath: "README.md"
---

Desktop World is a **Computer Use plugin built on CUA**, extended and packaged by Caelis Labs. It lets supported agents inspect windows, take screenshots and operate desktop apps, then observe again to confirm the result.

It packages the CUA Driver from [trycua/cua](https://github.com/trycua/cua), retaining upstream credit and licenses. [Third-party notices](https://github.com/caelis-labs/desktop-world/blob/v0.1.2/THIRD_PARTY_NOTICES.md).

## Start here

- [Install and try a read-only task](/docs/desktop-world/quickstart/).
- [Official source](https://github.com/caelis-labs/desktop-world).
- [v0.1.2 release and platform notes](https://github.com/caelis-labs/desktop-world/releases/tag/v0.1.2).

## Current scope

The stable release provides macOS Apple Silicon and Windows x64 executables and slim Plugin packages. macOS requires macOS 14 or later. Windows requires the x64 Visual C++ runtime; its packages are not Authenticode signed. No Linux distribution is offered.

Windows display scaling, modal dialogs and uncertain-focus limits remain tracked in [issue #36](https://github.com/caelis-labs/desktop-world/issues/36). This release does not establish new live Windows GUI acceptance. System permissions and the agent host’s approval rules still apply.

CaelisBot includes a separately pinned Plugin. Bot v0.18.1 uses Desktop World v0.1.2 in its desktop packages; installing standalone Desktop World does not replace Bot’s copy. Linux Headless/Web does not offer Computer Use.
