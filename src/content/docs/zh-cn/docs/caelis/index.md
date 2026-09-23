---
title: "Caelis 概览"
description: "模型与 ACP 智能体的本地协作工作空间。"
sidebar: {"order": 0}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis/index.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

Caelis 将模型与兼容 ACP 的智能体带入同一个本地会话。参与者保留各自的对话、交流发现，也可以在你补充要求后继续工作。

## 三步开始

1. [安装 Caelis](./installation/)。
2. [连接模型或智能体](./connections/)。
3. 打开一个代码仓库，提出具体的目标。

```text
梳理这个仓库，并说明如何运行测试。
```

启动目录就是工作区。会话保存在本机，可以使用 `/resume` 返回之前的对话。

## 组建协作团队

通过 `/team` 配置参与者角色。你可以跟进某个参与者的进展、发送文字或图片，并从主对话协调工作。参阅[参与者协作](./participants/)。

本地存储、命令执行与模型推理是不同的环节：模型请求会发送到所选择的 Provider 或外部智能体。扩大工具权限前，请先了解[审批与沙箱](./safety/)。
