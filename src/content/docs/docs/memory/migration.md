---
title: "Upgrade an existing store"
description: "Review versioned migration behavior before changing the module."
sidebar: {"order": 4}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/memory/migration.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "docs/memory-v0.6-migration.md"
productVersion: "v0.6.1"
---

## Before an upgrade

Record the module version and data directory. Back up persistent data through supported operational procedures, and test the upgrade against a representative copy before changing the production host.

## Version 0.6

Version 0.6 introduces an explicit schema 1 → 2 migration. Legacy Receipts and unknown legacy metadata are preserved; the Facts contract does not silently reinterpret earlier Recall evidence as current preferences.

Read the [full migration contract](../reference/migration/) for the supported transition and verification steps.

## Version 0.6.1

The patch repairs existing-store Steward upgrades and governance receipt-processing status. Use the [0.6.1 release notes](../reference/v0-6-1/) to understand what is repaired and how it was verified.

Do not assume a binary downgrade reverses a database migration. Use the project's documented restore procedure and retain the original backup.
