---
title: "安装 CaelisBot"
description: "选择 macOS、Windows 桌面版或 Linux Headless/Web 版，连接模型并开始使用。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-bot/installation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "docs/install.zh-CN.md"
productVersion: "v0.18.1"
---

当前正式版：[v0.18.1](https://github.com/caelis-labs/caelis-bot/releases/tag/v0.18.1)。内置 Caelis Core 0.73.1；桌面包使用 Desktop World 0.1.2。

[macOS](#macosapple-silicon) · [Windows](#windowsx64) · [Linux / WSL Headless + Web](../linux/)

## macOS：Apple Silicon

1. [下载最新 macOS DMG](/download/caelis-bot/) 和对应的 [SHA-256 文件](/download/caelis-bot/?asset=checksum)。
2. 对照[最新正式版](https://github.com/caelis-labs/caelis-bot/releases/latest)与 [macOS 下载清单](https://releases.caelis.dev/caelis-bot/latest.json)。版本不一致时，等待匹配的制品，不安装较旧的默认下载。
3. 按[完整校验步骤](../reference/install/)检查后，将 **Caelis Bot.app** 拖入 Applications。
4. 正常打开应用，按需确认 macOS 首次打开提示。正式版经过 Developer ID 签名与 Apple 公证，无需移除隔离属性。

目前没有 Intel Mac 安装包。校验和或系统验证失败时，请停止并重新获取官方安装包。

## Windows：x64

使用[Windows 安装版](https://ohmybot.si/download/windows/setup/)或[免安装 ZIP](https://ohmybot.si/download/windows/zip/)。[正式发行页](https://github.com/caelis-labs/caelis-bot/releases/latest)提供对应校验文件：以 **windows-amd64-stable-Setup.exe** 结尾的安装程序，或以 **windows-amd64-stable.zip** 结尾的便携包，同时下载同名 `.sha256` 文件核对。安装程序支持选择安装目录；便携包请先解压再运行。

要求 Windows 10 22H2 x64 或更新版本，以及 **Microsoft Edge WebView2 Runtime**。原生开发测试使用 Windows 11。当前 Windows 程序**没有 Authenticode 签名**，SmartScreen 或组织策略可能提示或阻止安装。更新清单签名不等于 Windows 程序签名，请先阅读发布说明。

正式版与预览版拥有独立的安装和数据，安装正式版不会迁移预览版数据或改变其更新渠道。目前没有 Windows ARM64 和 Linux 桌面包。

## Linux / WSL：Headless + Web

正式提供 **amd64 / arm64 完整 tar.gz**，内置 Caelis CLI 与 Web 页面。使用官方一键脚本安装为 systemd 用户服务，再在浏览器打开 `http://127.0.0.1:9317`。

```sh
curl -fsSL https://releases.caelis.dev/caelis-bot/install.sh | sh
```

安装前需满足 systemd 用户服务、Python 3、OpenSSL 和 bubblewrap 要求；WSL 需启用 systemd。详见 [Linux 安装、下载与升级](../linux/)。这是无桌面窗口的 Web 版，不提供 Linux 桌面角色、电脑操控或 Web 终端。

## 连接并开始聊天

1. 在首次引导中选择 **Caelis** 或 **Codex**。桌面版和 Linux 包均已内置 Caelis，无需单独安装；Codex 使用你自己的本机安装和账号，引导会显示缺少的设置步骤。
2. 连接模型服务并完成登录；已有可用连接时，选择模型后继续。应用不包含服务额度或订阅。
3. 桌面版可选择截图、贴图等附加功能，为助手起名并填写可选介绍，连接就绪后开始聊天。

之后可在**设置 → 连接与模型**调整连接与模型。账号登录和必要的系统权限仍由你完成。通用设置可切换英语或简体中文。

桌面版单击角色打开或隐藏聊天，通过 macOS 菜单栏或 Windows 系统托盘进入设置、退出应用。[了解对话操作](../conversation/)。

Caelis 实验特性遵循 Core 当前配置，初始默认关闭；只有你主动切换时才保存，不会在登录或读取设置时自动开启。

## 更新与数据

在**设置 → 更新**检查更新选项，安装和重启前由你确认。对话、Notebook 和设置保存在应用数据目录中；手动升级时先退出，只替换应用并保留数据。

极早期没有更新器的 macOS 版本需要手动升级一次，开发版不使用公开更新渠道。旧安装包可在[发布历史](https://github.com/caelis-labs/caelis-bot/releases)查找，安装包和校验文件必须来自同一版本。
