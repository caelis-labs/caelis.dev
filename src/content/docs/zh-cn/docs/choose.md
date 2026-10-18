---
title: "选择你的起点"
description: "五个独立项目，找到适合你的工具。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/choose.md"
---

| 你的目标 | 从这里开始 |
| --- | --- |
| 在终端中使用模型与编码智能体协作 | [Caelis](/zh-cn/docs/caelis/) |
| 在桌面上使用可以帮忙的小伙伴 | [CaelisBot](/zh-cn/docs/caelis-bot/) |
| 用 Go 构建 ACP Agent 或 Client | [ACP Go SDK](/zh-cn/docs/acp-go-sdk/) |
| 为 Agent Host 集成持久、可治理的记忆 | [Memory](/zh-cn/docs/memory/) |
| 通过基于 CUA 的插件连接桌面应用 | [Desktop World](/zh-cn/docs/desktop-world/) |

## 项目之间的关系

Caelis 提供本地协作工作空间。ACP Go SDK 与 Memory 是独立 Go 模块，可以被其他宿主集成，无需使用 Caelis。

CaelisBot 是独立的桌面伙伴。macOS 与 Windows 包已内置 Caelis，也可连接自己安装的 Codex。它与 Caelis 仓库中的 `caelis bot` 终端命令不同。


Desktop World 基于 CUA 二次开发与封装，为智能体提供桌面观察与操作。目前为预发布版本，使用前请阅读平台说明。

## 开始前准备

需要模型能力的应用会连接模型 Provider 或外部智能体。本地存储不代表离线推理。请先阅读对应项目的安装与连接指南。
