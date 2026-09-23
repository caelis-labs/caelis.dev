---
title: "安装 SDK"
description: "将最新发布的 Go 模块加入应用。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/acp-go-sdk/quickstart.md"
project: "acp-go-sdk"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "README.md"
productVersion: "v1.4.0"
---

Go 工具链要求以所选发布版本的 `go.mod` 为准。

```sh
go get github.com/caelis-labs/acp-go-sdk@latest
```

使用 `acp` 作为根包别名：

```go
import acp "github.com/caelis-labs/acp-go-sdk"
```

Go 模块版本、schema 版本与协商的 wire protocol 版本是不同的标识。上面的指令获取最新模块版本，并将实际选中的版本记录到项目的 `go.mod`。

## 运行完整示例

下面单独检出的示例使用已审核的文档提交，便于复现；它与上面安装到应用中的最新模块分开。

```sh
git clone https://github.com/caelis-labs/acp-go-sdk.git
cd acp-go-sdk
git checkout ed838d76cc0bca458732e15a457235c55a4d6642
go build -o .artifacts/minimal-agent ./example/minimal-agent
go run ./example/client -agent ./.artifacts/minimal-agent
```

预期输出包含 `Hello from the minimal Go ACP agent.`，并以 `end_turn` 结束。

Windows 上请构建 `.artifacts/minimal-agent.exe`，并将该路径传给 `-agent`。
