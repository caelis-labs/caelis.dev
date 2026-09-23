---
title: "升级到 v1.4.0"
description: "ACP Go SDK v1.4.0 的版本化参考文档。"
project: "acp-go-sdk"
productVersion: "v1.4.0"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "docs/upgrading-to-v1.4.0.md"
generated: true
editUrl: false
sidebar: {"order":20}
---

> 本页为已锁定版本的英文上游参考，尚未翻译。中文入门指南可从左侧导航进入。

These notes describe the protocol changes in v1.4.0. The README installation
example tracks the version recorded by the latest Release PR.

## Protocol alignment

* Updated the stable schema pin to `schema-v1.23.0`, adding optional
  programmatic tool-call names to tool calls, updates, and permission requests.
  Added `WithStartName` and `WithUpdateName` helpers. The wire protocol remains v1.
* Updated the isolated experimental v2 schema to `schema-v2.0.0-alpha.5`.
  Prompt responses now require the inserted user message's `messageId`;
  the corresponding user-message update may precede or follow the response.
  Tool-call name patches preserve absent, null (clear), and string states.
* Updated the official Rust SDK interop pin to `v2.2.0`; TypeScript remains
  pinned to the latest official `v1.4.0` release.

## Compatibility

* Stable v1 interfaces and wire protocol negotiation are unchanged. Tool-call
  `name` is optional; omitted or null names in updates leave the existing name
  unchanged. Consumers with their own wire-to-domain mappings must forward the
  new field to use it.
* Experimental v2 agents must return `PromptResponse.MessageId` and echo the
  user message with the same identifier. Clients now reject prompt responses
  that omit `messageId` or set it to null. Processing completion still arrives
  through session state updates.
