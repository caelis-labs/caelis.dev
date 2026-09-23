---
title: "Memory 概览"
description: "独立、可嵌入 Agent Host 的记忆系统。"
sidebar: {"order": 0}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/memory/index.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "README.md"
productVersion: "v0.6.1"
---

Memory 是面向持久证据、有范围检索和明确治理的 Go 模块。它面向模型的接口保持简洁：

```text
remember(text)
recall(query)
```

## 嵌入自己的宿主

先阅读[嵌入式集成](./quickstart/)，再了解 [Remember 与 Recall](./remember-recall/) 以及[授权边界](./boundaries/)。

Memory 负责数据库、授权、派生记忆变更和持久回执。宿主负责产品体验、配置与模型连接。

## 在 Caelis 中使用

Caelis 的 Host 已经负责打开 Memory。用户无需安装额外的 Memory 进程、配置独立端点或启动另一个服务。

当前发布形态是嵌入式 Go 包。为未来独立分发保留的代码框架，不应被视为已支持的一键服务部署。
