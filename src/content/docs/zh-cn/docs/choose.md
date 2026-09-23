---
title: "选择你的起点"
description: "五个独立项目，找到适合你的工具。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/choose.md"
---

| 你的目标 | 从这里开始 |
| --- | --- |
| 在终端中使用模型与编码智能体协作 | [Caelis](/zh-cn/docs/caelis/) |
| 在 Mac 桌面上使用可以帮忙的小伙伴 | [Caelis Bot](/zh-cn/docs/caelis-bot/) |
| 用 Go 构建 ACP Agent 或 Client | [ACP Go SDK](/zh-cn/docs/acp-go-sdk/) |
| 为 Agent Host 集成持久、可治理的记忆 | [Memory](/zh-cn/docs/memory/) |
| 探索以 ACP 为先的桌面工作台 | [Caelis App](/zh-cn/docs/caelis-app/) |

## 项目之间的关系

Caelis 提供本地协作工作空间。ACP Go SDK 与 Memory 是独立 Go 模块，可以被其他宿主集成，无需使用 Caelis。

Caelis Bot 是独立桌面伙伴，当前公开预览使用已安装的本地 Codex 运行时。它与 Caelis 仓库中的 `caelis bot` 终端命令是不同入口。

Caelis App 是基于 ACP 的早期桌面客户端，目前没有公开桌面安装包。

## 开始前准备

需要模型能力的应用会连接模型 Provider 或外部智能体。本地存储不代表离线推理。请先阅读对应项目的安装与连接指南。
