---
title: "Caelis App 概览"
description: "以 ACP 为先、处于早期 Beta 的桌面工作台。"
sidebar: {"order": 0}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-app/index.md"
project: "caelis-app"
sourceRepo: "caelis-app"
sourceRef: "e443ccd1a5f595fb31caade2e5af0fc941d7772d"
sourcePath: "README.md"
productVersion: "Development"
---

Caelis App 是独立的桌面编码智能体客户端，首先遵循开放的 Agent Client Protocol。

## 当前范围

早期 Beta 可以启动本地 stdio ACP 智能体、协商 ACP v1、建立工作区会话，并显示流式消息、思考过程、工具调用和计划，提供权限请求与取消操作。

当前没有声明 ACP 文件系统或终端能力。多会话持久化、远程传输、签名、更新与生产打包不属于初始版本范围。

## 从源码体验

目前没有公开安装包。请先按[本地开发指南](./quickstart/)启动，再[连接 ACP 智能体](./connect/)。

终端 UI 仍是 Caelis 的主要产品界面。规划中的 Caelis App Server 适配器，不应被视为当前公开客户端已有能力。
