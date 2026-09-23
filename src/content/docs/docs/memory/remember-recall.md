---
title: "Remember and Recall"
description: "A small model interface with host-controlled scope."
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/memory/remember-recall.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "README.md"
productVersion: "v0.6.1"
---

## Remember

`remember(text)` records information through the host-bound client. Memory owns the durable receipt and its processing state. The model provides the text, not the identity, audience, or retrieval policy.

## Recall

`recall(query)` retrieves authorized evidence within the bound scope. Authorization is applied before search results are returned.

Without a bound Steward model, static receipt and lexical Recall does not make model calls. This is useful when a host wants durable evidence without a background model-processing dependency.

## Evidence and current facts

A recalled receipt is evidence, not automatically a current user preference. Version 0.6 introduces explicit current-fact lifecycle APIs and trusted evidence processing; existing evidence is not silently converted into current facts.

See the [Facts reference](../reference/facts/) for the public contract and [migration guidance](../migration/) when upgrading an existing store.
