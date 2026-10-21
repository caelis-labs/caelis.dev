---
title: "开始使用"
description: "基于 CUA 二次开发与封装的 Computer Use 插件。"
project: "desktop-world"
productVersion: "v0.1.2"
sourceRepo: "desktop-world"
sourceRef: "977afec748845c05c294b01318c926db60826378"
sourcePath: "README.md"
---

## 1. 选择已发布安装文件

打开 [Desktop World Releases](https://github.com/caelis-labs/desktop-world/releases)，选择适合平台的 v0.1.2 正式版。macOS Apple Silicon（macOS 14+）使用 `dtw-darwin-arm64`，Windows x64 使用 `dtw-windows-amd64.exe`，并下载对应的校验文件。单个可执行文件已包含插件及 CUA worker，安装不需要另配 Rust、Python 或 Node。

README 可能仍链接较早的已测试版本，请根据 Release 页面及其说明确认想安装的版本。

## 2. 连接支持的智能体

对应智能体的 CLI 需已安装。校验下载后，按[官方安装指南](https://github.com/caelis-labs/desktop-world/blob/v0.1.2/docs/install.md)执行：Antigravity 使用 `dtw install agy`，Claude Code 使用 `dtw install claude`。兼容的插件宿主可使用 `dtw install plugin --to <新目录>`。

macOS 需要给实际启动智能体的应用授予辅助功能和屏幕录制权限，然后重启该应用。Windows 需要 x64 Visual C++ Runtime；可执行文件未做 Authenticode 签名。

## 3. 先观察，再操作

新开一个智能体会话，先要求：

> 使用 Desktop World 查看我打开的浏览器窗口，描述其中的控件。不要点击或输入。

随后在临时文档里尝试一个小操作，并要求独立确认可见结果。注意前台焦点及系统权限提示。

## 平台说明

Windows 的显示缩放、模态窗口与焦点结果不确定等限制由 [Issue #36](https://github.com/caelis-labs/desktop-world/issues/36) 跟踪。不应盲目重放结果不确定的操作；混合 DPI、提权应用与任意应用覆盖不在已确立范围内。

使用前阅读 [v0.1.2 发布说明](https://github.com/caelis-labs/desktop-world/releases/tag/v0.1.2)。Caelis 可将标准 Plugin 导出到固定目录后，按[官方 Caelis 安装步骤](https://github.com/caelis-labs/desktop-world/blob/v0.1.2/docs/install.md#caelis)注册；Bot 内置副本通过 Bot 自身更新管理。
