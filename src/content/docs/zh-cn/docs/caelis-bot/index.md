---
title: "CaelisBot 概览"
description: "一起聊天、处理文件与日常任务的桌面伙伴。"
sidebar: {"order": 0}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-bot/index.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "README.md"
productVersion: "v0.18.1"
---

CaelisBot 把一个生动的小伙伴带到你的桌面。问问题、分享文件、跟进后台工作，在需要你决定的操作出现时参与确认。

## 选择桌面版本

- **macOS：**适用于 Apple Silicon，应用已内置 Caelis。
- **Linux / WSL：**amd64、arm64 Headless/Web 完整包，通过 systemd 用户服务运行，在浏览器使用。无 Linux 桌面角色。
- **Windows：**x64 安装程序或便携 ZIP，要求 Windows 10 22H2 或更新版本与 Microsoft Edge WebView2。原生开发测试使用 Windows 11。
- **模型连接：**使用内置 Caelis，或你自己安装的 Codex；聊天前完成所选模型服务的登录。
- **语言：**支持英语和简体中文，可在设置中切换。

[下载 macOS 版](/download/caelis-bot/) · [SHA-256](/download/caelis-bot/?asset=checksum) · [Windows 下载](https://ohmybot.si/zh-cn/#download) · [Linux 安装](./linux/) · [v0.18.1 发布说明](https://github.com/caelis-labs/caelis-bot/releases/tag/v0.18.1)

Windows 安装包尚未进行 Authenticode 签名。先阅读[安装与首次使用](./installation/)，再了解[对话、模型与工具](./conversation/)。

## 一个伙伴，多种工作方式

在 Notebook 中保存可编辑的笔记，在应用运行时安排提醒，截取并标注屏幕选区，按需连接支持的插件。Telegram 也可以接入同一个 Bot 对话。实际能力取决于模型、服务与权限；应用下载不包含模型服务订阅。

CaelisBot 提供桌面应用与 Linux Headless/Web 发行形态，与 Caelis 的 `caelis bot` 终端命令 不同。

代码采用 Apache-2.0，角色成品资产适用独立的[资产许可](./reference/character-assets/)。
