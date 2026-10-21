---
title: "Desktop World"
description: "基于 CUA 二次开发与封装的 Computer Use 插件。"
project: "desktop-world"
productVersion: "v0.1.2"
sourceRepo: "desktop-world"
sourceRef: "977afec748845c05c294b01318c926db60826378"
sourcePath: "README.md"
---

Desktop World 是**基于 CUA 二次开发与封装的 Computer Use 插件**，由 Caelis Labs 维护。让支持的智能体查看窗口、截图并操作桌面应用，再次观察以确认实际结果。

底层使用 [trycua/cua](https://github.com/trycua/cua) 的 CUA Driver，保留上游归属与许可证。[第三方声明](https://github.com/caelis-labs/desktop-world/blob/v0.1.2/THIRD_PARTY_NOTICES.md)。

## 从这里开始

- [安装并尝试只读任务](/zh-cn/docs/desktop-world/quickstart/)。
- [官方源码](https://github.com/caelis-labs/desktop-world)。
- [v0.1.2 正式版与平台说明](https://github.com/caelis-labs/desktop-world/releases/tag/v0.1.2)。

## 当前范围

正式版提供 macOS Apple Silicon、Windows x64 可执行文件与精简 Plugin 包。macOS 要求 14 或更高版本；Windows 需要 x64 Visual C++ runtime，程序未做 Authenticode 签名。目前不提供 Linux 发行包。

Windows 的显示缩放、模态窗口与焦点结果不确定等限制仍由 [Issue #36](https://github.com/caelis-labs/desktop-world/issues/36) 跟踪。本次发行不代表新增 Windows 原生 GUI 完整验收。系统权限与宿主审批规则继续适用。

CaelisBot 内置独立锁定的 Plugin；Bot v0.18.1 桌面包使用 Desktop World v0.1.2。单独安装 Desktop World 不会替换 Bot 内置副本，Linux Headless/Web 不提供电脑操控。
