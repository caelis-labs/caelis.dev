---
title: "安装预览版"
description: "校验 macOS 安装包，并连接本地运行时。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "0842c59ac7ab007b67f7d25a51129b87d37bd60e"
sourcePath: "docs/install.md"
productVersion: "v0.1.0-preview.1"
---

## 开始前

准备 Apple Silicon Mac，单独安装本地 Codex 运行时，并先完成它的登录。

## 下载与校验

1. 打开 [Caelis Bot Releases](https://github.com/caelis-labs/caelis-bot/releases)。
2. 选择兼容的预览版 DMG 和对应的 `.sha256` 文件。
3. 按照已锁定公开版本中的[完整校验与首次启动指令](../reference/install/)操作。
4. 校验完成后，将 **Caelis Bot.app** 拖入 Applications 并启动。

预览版使用临时签名，尚未经 Apple 公证。请针对已验证的应用执行指南中的步骤；不要绕过校验和失败，也不要通过自行重新签名掩盖损坏的应用。

## 连接运行时

Caelis Bot 会自动发现本地 Codex 运行时，也可以在 **设置 → Runtime** 中选择。应用不捆绑 Codex 或开发工具。

单击角色开始输入，双击打开对话。参阅[对话操作](../conversation/)。

## 更新

下载并校验更新的兼容版本，手动安装并保留现有应用数据。更新前查看对应版本的发布说明和安装指南。
