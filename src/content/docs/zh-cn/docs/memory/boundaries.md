---
title: "授权与数据边界"
description: "通过公开契约管理身份和所有记忆变更。"
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/memory/boundaries.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "README.md"
productVersion: "v0.6.1"
---

## 宿主负责

- 产品配置与模型选择。
- 会话持久化和工具结果回放。
- 通过公开 API 建立身份与 capability 上下文。
- 签发运行时 capability 时选择不透明的 LabelSet。

## Memory 负责

- SQLite 数据库与持久回执。
- 授权、LabelSet 校验与分区隔离。
- 检索、治理及所有派生记忆变更。
- Steward 提案校验与应用。

## 集成规则

不要直接打开 `memory.db`、导入 `internal/*`、镜像 Memory 的权威状态，也不要让模型参数选择身份、Space、View、受众、检索策略或生命周期。

纠正、删除与运维操作使用公开管理 API。模型可以提出信息，是否接纳则由宿主授权与 Memory 校验共同决定。

构建可信证据或所有者治理能力时，请结合 API 文档阅读 [Facts 契约](../reference/facts/)。
