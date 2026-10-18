---
title: "Desktop World"
description: "基于 CUA 二次开发与封装的 Computer Use 插件。"
project: "desktop-world"
productVersion: "v0.1.0-rc.9"
sourceRepo: "desktop-world"
sourceRef: "79a097b3b479fbf65926fdd6a58c296d8d1e1e1e"
sourcePath: "README.md"
---

Desktop World 是 **基于 CUA 二次开发与封装的 Computer Use 插件**，由 Caelis Labs 维护。它让支持的智能体查看窗口、截取画面、点击、输入及执行支持的原生操作；操作后需要再次观察应用，确认实际结果。

它使用 [trycua/cua](https://github.com/trycua/cua) 的 CUA Driver，保留上游归属与许可，并非从零自研的桌面自动化底层。详见[发布版本的第三方声明](https://github.com/caelis-labs/desktop-world/blob/v0.1.0-rc.9/THIRD_PARTY_NOTICES.md)。

## 从这里开始

- [安装并尝试只读任务](/zh-cn/docs/desktop-world/quickstart/)。
- [官方源码](https://github.com/caelis-labs/desktop-world)。
- [已发布的预览版与平台说明](https://github.com/caelis-labs/desktop-world/releases)。

## 当前范围

目前为**预发布版本**，提供 macOS Apple Silicon 与 Windows x64 可执行文件。macOS 包含应用级窗口观察扩展；该扩展不适用于 Windows。没有宣称 Linux 为受支持发行平台。

RC.9 包含 Windows fixture 与独立 Chrome 的真实检查，但 Windows 全功能 GUI 验收仍未通过。显示缩放、模态窗口和焦点校验仍有已知限制；使用坐标操作前请先阅读发布说明。系统权限和智能体宿主的审批规则仍然适用。
