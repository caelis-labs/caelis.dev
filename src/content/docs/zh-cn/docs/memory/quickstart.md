---
title: "嵌入式集成"
description: "将 Memory 集成到 Go 宿主，并由宿主代码管理授权。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/memory/quickstart.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "README.md"
productVersion: "v0.6.1"
---

## 添加模块

```sh
go get github.com/caelis-labs/memory@v0.6.1
```

工具链要求以所选版本的 `go.mod` 为准。

## 打开运行时

下面是项目 README 中的生命周期片段，`ctx` 与 `dataDir` 由宿主提供。

```go
runtime, err := appliance.Open(ctx, appliance.Options{DataDir: dataDir})
if err != nil {
    return err
}
defer runtime.Close()
```

导入 `github.com/caelis-labs/memory/appliance`。仅打开运行时，并不意味着已经建立具备授权的模型客户端。

## 绑定宿主上下文

宿主通过公开 API 建立身份、Space、View、Grant 与 capability，再使用 `sdk/go/memory` 将上下文绑定到简洁的工具接口。模型参数不能选择这些授权字段。

暴露工具前，请查阅[公开 API](https://pkg.go.dev/github.com/caelis-labs/memory@v0.6.1)与[授权边界](../boundaries/)，并为所集成的版本保留对应测试。
