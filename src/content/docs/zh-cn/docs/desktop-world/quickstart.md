---
title: "开始使用"
description: "基于 CUA 二次开发与封装的 Computer Use 插件。"
project: "desktop-world"
productVersion: "v0.1.0-rc.9"
sourceRepo: "desktop-world"
sourceRef: "79a097b3b479fbf65926fdd6a58c296d8d1e1e1e"
sourcePath: "README.md"
---

## 1. 选择已发布安装文件

打开 [Desktop World Releases](https://github.com/caelis-labs/desktop-world/releases)，选择适合平台的预发布版本。macOS Apple Silicon（macOS 14+）使用 `dtw-darwin-arm64`，Windows x64 使用 `dtw-windows-amd64.exe`，并下载对应的校验文件。单个可执行文件已包含插件及 CUA worker，安装不需要另配 Rust、Python 或 Node。

README 可能仍链接较早的已测试预发布版本，请根据 Release 页面及其说明确认想安装的版本。

## 2. 连接支持的智能体

对应智能体的 CLI 需已安装。校验下载后，按[官方安装指南](https://github.com/caelis-labs/desktop-world/blob/v0.1.0-rc.9/docs/install.md)执行：Antigravity 使用 `dtw install agy`，Claude Code 使用 `dtw install claude`。兼容的插件宿主可使用 `dtw install plugin --to <新目录>`。

macOS 需要给实际启动智能体的应用授予辅助功能和屏幕录制权限，然后重启该应用。Windows 可能需要 x64 Visual C++ Runtime；预发布可执行文件未做 Authenticode 签名。

## 3. 先观察，再操作

新开一个智能体会话，先要求：

> 使用 Desktop World 查看我打开的浏览器窗口，描述其中的控件。不要点击或输入。

随后在临时文档里尝试一个小操作，并要求独立确认可见结果。注意前台焦点及系统权限提示。

## 平台说明

RC.9 的 Windows 检查覆盖独立 fixture 与 Chrome。一些 DPI-unaware 窗口在 125% 缩放下存在截图与几何错位；模态文件选择器可能使原调用保持等待；操作已产生效果时仍可能出现焦点错误。不要盲目重试结果不确定的操作。混合 DPI、多显示器、提权应用及任意应用覆盖尚不能由这些检查证明。

使用前请阅读 [RC.9 实测范围与剩余限制](https://github.com/caelis-labs/desktop-world/releases/tag/v0.1.0-rc.9)。本指南不提供 `dtw install caelis` 命令；请遵循宿主当前支持的插件安装方式。
