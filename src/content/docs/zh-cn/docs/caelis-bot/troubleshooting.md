---
title: "常见问题与预览限制"
description: "检查运行时、平台与版本要求。"
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-bot/troubleshooting.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "0842c59ac7ab007b67f7d25a51129b87d37bd60e"
sourcePath: "README.md"
productVersion: "v0.1.0-preview.1"
---

## 角色出现了，但无法开始对话

确认本地已安装并登录 Codex 运行时。在 **设置 → Runtime** 检查选择的可执行程序。Caelis Bot 不捆绑模型运行时或账号。

## macOS 阻止首次启动

预览版使用临时签名，尚未经 Apple 公证。按[安装指南](../reference/install/)校验下载文件与签名，再完成限定于该应用的首次启动步骤。校验失败时应停止。

## 支持 Intel、Windows 或 Linux 吗？

当前公开预览适用于 Apple Silicon Mac。官网不声明其他平台或架构已经完成原生支持。

## 与 `caelis bot` 相同吗？

不同。本节说明独立桌面应用，CLI 命令属于 Caelis 主项目。

## 角色资产是否开源？

代码采用 Apache-2.0，成品角色资产使用独立许可，建模源文件保持私有。详细说明见[角色资产参考](../reference/character-assets/)。
