---
title: "审批与沙箱"
description: "了解工具请求与本地执行如何受到控制。"
sidebar: {"order": 5}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis/safety.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

## 工具审批模式

Caelis 默认进入 `auto-review` 模式。Guardian 根据会话上下文与审批策略审核工具请求；无法给出有效判断时，会保持拒绝执行的状态。

如果希望自己逐项审批：

```text
/mode manual
```

批准前，查看请求的操作、相关路径与用途。

## 操作系统沙箱

本地命令按照所配置的沙箱策略运行。Caelis 在支持的平台使用对应的操作系统隔离机制，实际文件访问范围及其他限制取决于所选策略。

外部智能体保留自己的执行能力。Caelis 处理对方通过 ACP 暴露的权限请求；连接外部智能体，不意味着其所有行为都等同于 Caelis 原生运行时。

## 本地不等于离线

会话与 Caelis 管理的凭证保存在本地。模型请求会发送给你选择的 Provider 或外部智能体。为工作区选择连接时，应区分这两件事。
