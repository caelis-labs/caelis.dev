---
title: "Embedded integration"
description: "Add Memory to a Go host and keep authority in host code."
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/memory/quickstart.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "README.md"
productVersion: "v0.6.1"
---

## Add the module

```sh
go get github.com/caelis-labs/memory@v0.6.1
```

Use the selected release's `go.mod` for toolchain requirements.

## Open the runtime

The following is the lifecycle excerpt from the project README. The host supplies `ctx` and `dataDir`.

```go
runtime, err := appliance.Open(ctx, appliance.Options{DataDir: dataDir})
if err != nil {
    return err
}
defer runtime.Close()
```

Import `github.com/caelis-labs/memory/appliance`. Opening the runtime does not by itself create an authorized model client.

## Bind host context

The host provisions identity, Spaces, Views, Grants, and capabilities through public APIs, then uses `sdk/go/memory` to bind that context to the small tool interface. Model arguments must not choose these authority fields.

Read the [public package API](https://pkg.go.dev/github.com/caelis-labs/memory@v0.6.1) and [authority boundaries](../boundaries/) before exposing tools. Keep the selected source version alongside your integration tests.
