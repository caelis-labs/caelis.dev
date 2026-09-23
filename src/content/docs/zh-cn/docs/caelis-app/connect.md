---
title: "连接 ACP 智能体"
description: "指定程序、明确参数与绝对工作区路径。"
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-app/connect.md"
project: "caelis-app"
sourceRepo: "caelis-app"
sourceRef: "e443ccd1a5f595fb31caade2e5af0fc941d7772d"
sourcePath: "README.md"
productVersion: "Development"
---

## 准备智能体

单独安装兼容 ACP stdio 的智能体。桌面客户端直接启动可执行程序，不经过 Shell。

在连接界面填写：

1. 程序路径或命令。
2. 每行一个参数。
3. 工作区的绝对路径。

对于提供标准 ACP 服务的 Caelis 构建，命令填写 `caelis`，并单独填写参数 `acp`。未来的 App Server 集成属于不同的后端。

## 完成一个简单请求

连接后建立会话，发送一个简单 prompt，确认所选智能体的流式输出、工具与权限请求处理正常。智能体 stderr 与协议 stdout 分开处理。

## 尊重当前能力边界

初始客户端不声明 ACP 文件系统或终端能力。要求这些能力的智能体，可能不适用于当前范围。

客户端与传输边界参阅[公开架构说明](https://github.com/caelis-labs/caelis-app/blob/e443ccd1a5f595fb31caade2e5af0fc941d7772d/docs/architecture.md)。
