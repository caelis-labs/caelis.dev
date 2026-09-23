---
title: "Authority and data boundaries"
description: "Keep identity and every memory mutation behind public contracts."
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/memory/boundaries.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "README.md"
productVersion: "v0.6.1"
---

## The host owns

- Product configuration and model selection.
- Session persistence and replay of tool results.
- Provisioning the public identity and capability context.
- Selecting an opaque LabelSet when issuing a runtime capability.

## Memory owns

- Its SQLite database and durable receipts.
- Authorization, LabelSet validation, and partition enforcement.
- Retrieval, governance, and every derived-memory mutation.
- Steward proposal validation and application.

## Integration rules

Do not open `memory.db` directly, import `internal/*`, mirror Memory's authoritative state, or let model arguments choose identity, Space, View, audience, retrieval policy, or lifecycle.

Use public management APIs for corrections, deletion, and operational tasks. A model may propose information; host authority and Memory's validation decide whether it is admitted.

Read the [Facts contract](../reference/facts/) alongside the API documentation when building trusted-evidence or owner-governance features.
