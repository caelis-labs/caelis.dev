---
title: "常见问题与支持范围"
description: "检查运行时、平台与版本要求。"
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-bot/troubleshooting.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "6d60b22779b9ffa8927f9a306219e5bccb699320"
sourcePath: "README.md"
productVersion: "v0.1.0"
---

## 角色出现了，但无法开始对话

确认所选的 Caelis 或 Codex 已在本机安装并配置。在 **设置 → 运行时** 检查选择的可执行程序。Caelis Bot 不捆绑模型运行时或账号。

## macOS 阻止首次启动

使用最新稳定版，按[安装指南](../reference/install/)校验下载文件。如出现正常的首次打开提示，确认即可；若 macOS 拒绝应用，停止并重新下载官方安装包，不要关闭系统安全检查。

## 支持 Intel、Windows 或 Linux 吗？

当前正式版适用于 Apple Silicon Mac。官网不声明其他平台或架构已经完成原生支持。

## 是否内置运行时？

没有。本应用独立连接本机 Caelis 或 Codex；需要单独安装并配置所选运行时。

## 角色资产是否开源？

代码采用 Apache-2.0，成品角色资产使用独立许可，建模源文件保持私有。详细说明见[角色资产参考](../reference/character-assets/)。
