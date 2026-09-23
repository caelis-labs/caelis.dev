---
title: "构建 Client"
description: "启动智能体，并管理它的进程生命周期。"
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/acp-go-sdk/client.md"
project: "acp-go-sdk"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "README.md"
productVersion: "v1.4.0"
---

以[完整 Client 示例](https://github.com/caelis-labs/acp-go-sdk/blob/ed838d76cc0bca458732e15a457235c55a4d6642/example/client/main.go)作为起点。

## 实现 Client 接口

处理 `RequestPermission` 与 `SessionUpdate`。文件系统、终端和其他可选能力，只有在处理逻辑完成后才应声明。

最小示例拒绝权限请求，不声明文件系统或终端能力。

## 启动进程

`transport/stdio.StartClient` 接收可执行程序和参数切片。它直接启动程序、读取 stderr，并连接类型明确的协议客户端。

启动后先调用 `Initialize`，确认协商的协议版本，再执行 `NewSession` 与 `Prompt`。

## 明确关闭流程

使用具有截止时间的 `Process.Shutdown(ctx)` 关闭协议输入、等待正常退出，并在需要时终止所拥有的进程树。`Close` 则是立即停止操作。

不要用固定等待时间替代生命周期管理，也不要认为一次 prompt 完成就代表子进程已退出。
