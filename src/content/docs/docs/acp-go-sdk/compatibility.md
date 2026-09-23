---
title: "Compatibility and upgrades"
description: "Keep module, schema, and wire protocol versions distinct."
sidebar: {"order": 4}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/acp-go-sdk/compatibility.md"
project: "acp-go-sdk"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "README.md"
productVersion: "v1.4.0"
---

## Three versions, three meanings

| Identity | This documentation |
| --- | --- |
| Go module release | v1.4.0 |
| ACP v1 source schema | schema-v1.23.0 |
| Negotiated wire protocol | ACP v1 |

A module upgrade is not the same as negotiating a different protocol. Check optional capabilities during initialization instead of assuming every agent supports every generated method.

## Upgrading to v1.4

Read the [version-specific upgrade guide](../reference/upgrading-to-v1-4/) and review your handlers, generated types, and subprocess lifecycle against the published API.

## Interoperability evidence

The project maintains an interoperability matrix against the official TypeScript and Rust SDKs. That evidence is scoped to the tested revisions and paths; your own application's permission and process policies still need validation.

See [API reference](https://pkg.go.dev/github.com/caelis-labs/acp-go-sdk@v1.4.0) and [Releases](https://github.com/caelis-labs/acp-go-sdk/releases).
