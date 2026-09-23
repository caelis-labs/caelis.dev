---
title: "升级已有数据库"
description: "更新模块前，先了解对应版本的数据迁移行为。"
sidebar: {"order": 4}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/memory/migration.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "docs/memory-v0.6-migration.md"
productVersion: "v0.6.1"
---

## 升级前

记录模块版本与数据目录，按照支持的运维方式备份持久数据。先使用有代表性的副本验证升级，再更换正式宿主中的模块。

## 0.6 版本

0.6 引入显式的 schema 1 → 2 迁移。历史 Receipt 和未知的历史元数据会保留；Facts 契约不会将旧 Recall 证据静默解释为当前偏好。

支持的迁移路径与验证步骤见[完整迁移契约](../reference/migration/)。

## 0.6.1 版本

该补丁修复已有数据库的 Steward 升级与治理回执处理状态。修复范围及验证依据见 [0.6.1 发布说明](../reference/v0-6-1/)。

不要假定降级二进制就会逆转数据库迁移。应使用项目记录的恢复流程，并保留原始备份。
