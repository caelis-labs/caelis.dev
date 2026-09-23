---
title: "Install the SDK"
description: "Add the latest released Go module to your application."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/acp-go-sdk/quickstart.md"
project: "acp-go-sdk"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "README.md"
productVersion: "v1.4.0"
---

Use the Go toolchain required by the selected release's `go.mod`.

```sh
go get github.com/caelis-labs/acp-go-sdk@latest
```

Import the root package as `acp`:

```go
import acp "github.com/caelis-labs/acp-go-sdk"
```

The SDK module release, schema version, and negotiated wire protocol are separate version identities. This command resolves the latest module release and records the selected version in your project’s `go.mod`.

## Run a complete example

The example checkout below uses the reviewed documentation revision so the commands remain reproducible. It is separate from the latest module installed into your application above.

```sh
git clone https://github.com/caelis-labs/acp-go-sdk.git
cd acp-go-sdk
git checkout ed838d76cc0bca458732e15a457235c55a4d6642
go build -o .artifacts/minimal-agent ./example/minimal-agent
go run ./example/client -agent ./.artifacts/minimal-agent
```

Expected output includes `Hello from the minimal Go ACP agent.` and the `end_turn` stop reason.

On Windows, build `.artifacts/minimal-agent.exe` and pass that path to `-agent`.
