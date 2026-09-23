---
title: "安装 Caelis Bot"
description: "校验 macOS 安装包，并连接本地运行时。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "6d60b22779b9ffa8927f9a306219e5bccb699320"
sourcePath: "docs/install.md"
productVersion: "v0.1.0"
---

## 开始前

准备 Apple Silicon Mac，独立安装并配置 Caelis 或 Codex，完成所需的账户登录。运行时兼容性通过协议握手检查，连接时按应用提示操作。

## 下载与校验

1. 打开 [Caelis Bot 最新稳定版](https://github.com/caelis-labs/caelis-bot/releases/latest)。
2. 选择兼容的稳定版 DMG 和对应的 `.sha256` 文件。
3. 按照已锁定公开版本中的[完整校验与首次启动指令](../reference/install/)操作。
4. 校验完成后，将 **Caelis Bot.app** 拖入 Applications 并启动。

正常打开已核验的应用，如出现 macOS 首次打开提示，确认即可，无需移除隔离标记。下载或系统验证失败时应停止。

## 连接运行时

Caelis Bot 会自动发现本地 Caelis 和 Codex，也可以在 **设置 → 运行时** 中选择。应用不捆绑运行时。

单击角色开始输入，双击打开对话。参阅[对话操作](../conversation/)。

## 更新

下载并校验更新的兼容版本，手动安装并保留现有应用数据。更新前查看对应版本的发布说明和安装指南。
