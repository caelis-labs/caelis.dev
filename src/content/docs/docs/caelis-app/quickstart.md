---
title: "Run the desktop client locally"
description: "Prepare the development toolchain and start the early beta."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-app/quickstart.md"
project: "caelis-app"
sourceRepo: "caelis-app"
sourceRef: "e443ccd1a5f595fb31caade2e5af0fc941d7772d"
sourcePath: "README.md"
productVersion: "Development"
---

## Requirements

The pinned public README specifies Go 1.25, Node.js 22 or newer, pnpm 11, and Wails CLI `v3.0.0-beta.6`. This guide targets the recorded development revision, not a published desktop release.

```sh
git clone https://github.com/caelis-labs/caelis-app.git
cd caelis-app
git checkout e443ccd1a5f595fb31caade2e5af0fc941d7772d
go install github.com/wailsapp/wails/v3/cmd/wails3@v3.0.0-beta.6
cd frontend
pnpm install
cd ..
wails3 task dev PACKAGE_MANAGER=pnpm
```

Native desktop builds also need the relevant platform development tools. Review Wails setup requirements for your platform if native compilation fails.

## Verify the client

```sh
make check
```

This runs the project's checks; it is not evidence of a signed, packaged release on every platform.

Next, [connect a local ACP agent](../connect/).
