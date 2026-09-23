---
title: "构建 Agent"
description: "实现基础方法，并发送会话更新。"
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/acp-go-sdk/agent.md"
project: "acp-go-sdk"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "README.md"
productVersion: "v1.4.0"
---

从[最小 Agent 示例](https://github.com/caelis-labs/acp-go-sdk/blob/ed838d76cc0bca458732e15a457235c55a4d6642/example/minimal-agent/main.go)开始。

## 基础方法

实现 `acp.Agent` 的 `Initialize`、`NewSession`、`Prompt`、`Cancel`。通过类型明确的 Session 更新向客户端发送输出。

可选方法使用独立接口。只有已实现的能力才应被声明；未实现的可选接口会返回 JSON-RPC method-not-found。

## 连接 stdio

下面是生命周期片段，`agent` 与 `ctx` 由你的应用提供。

```go
connection, err := stdio.NewAgentConnection(agent, acp.ConnectionOptions{})
if err != nil {
    return err
}
defer connection.Close()
return connection.Wait(ctx)
```

导入 `github.com/caelis-labs/acp-go-sdk/transport/stdio`。应用日志写入 stderr，stdout 用于协议消息。

下一步连接 [Client](../client/)，完成 initialize → 新会话 → prompt 的完整流程。
