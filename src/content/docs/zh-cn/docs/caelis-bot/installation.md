---
title: "安装 Caelis Bot"
description: "校验 macOS 安装包，并连接本地运行时。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "e58d90b7c26f1f004d25d05d9b55fed6973482b3"
sourcePath: "docs/install.zh-CN.md"
productVersion: "v0.2.0"
---

## 开始前

准备 Apple Silicon Mac，独立安装并配置 Caelis 或 Codex，完成所需的账户登录。运行时兼容性通过协议握手检查，连接时按应用提示操作。

## 下载与校验

1. 从官方 Cloudflare R2 镜像[下载 macOS 版 Caelis Bot（Apple Silicon）](/download/caelis-bot/)。
2. 下载对应的 [SHA-256 校验文件](/download/caelis-bot/?asset=checksum)。入口始终解析最新稳定版，也可以从 [GitHub Releases](https://github.com/caelis-labs/caelis-bot/releases/latest) 下载。
3. 按照已锁定公开版本中的[完整校验与首次启动指令](../reference/install/)操作。
4. 校验完成后，将 **Caelis Bot.app** 拖入 Applications 并启动。

正常打开已核验的应用，如出现 macOS 首次打开提示，确认即可，无需移除隔离标记。下载或系统验证失败时应停止。

## 连接运行时

Caelis Bot 会自动发现本地 Caelis 和 Codex，也可以在 **设置 → 运行时** 中选择。应用不捆绑运行时。

单击角色开始输入，双击打开对话。参阅[对话操作](../conversation/)。

在 **设置 → 常规 → 语言** 中选择**简体中文**或**英文**。切换语言会保留草稿、待审批答案和连接进度。

## 更新

从 **v0.2.0** 起，稳定版每天自动检查更新。可在 **设置 → 关于 → 检查更新** 中立即检查，也可以关闭自动检查。下载与安装需要你确认；Bot 会等待当前任务和待处理操作完成后再重启，并保留对话、Notebook 与设置。

**从 v0.1.0 升级：**先手动下载、校验并安装一次新版 DMG。退出 Bot，仅替换应用包，保留应用数据。之后可使用应用内更新。预览版和开发版仍需手动安装。

R2 仅保留最新稳定版，旧版本可从 [GitHub 发布历史](https://github.com/caelis-labs/caelis-bot/releases)获取。请一起下载 DMG 与校验文件；如果两次下载之间恰逢发版，导致文件名不匹配，请重新下载对应的一组文件。
