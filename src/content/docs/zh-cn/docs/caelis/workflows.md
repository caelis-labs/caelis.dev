---
title: "工具与自动化"
description: "扩展工作空间，并通过单次请求完成自动化任务。"
sidebar: {"order": 6}
project: "caelis"
sourceRepo: "caelis"
sourceRef: "fa598b00db7d6635086d3388f4d4c9c335642cfd"
sourcePath: "README.md"
productVersion: "v0.72.2"
---

## 带上适合的工具

除了文件与命令工具，Caelis 也支持 MCP、技能和插件。按工作需要添加工具，在信任项目前先检查其配置。外部 ACP 智能体可能拥有不同的工具和权限。

## 执行单次请求

连接模型后，在项目目录中运行：

```sh
caelis -p "Summarize this repository."
caelis -p "Review the changes." -format json
caelis -p "Run the tests." -format jsonl
```

文本适合快速查看结果，JSON 用于单个结构化响应，JSONL 用于流式事件。这些命令可以使用工具，仍需遵循正常的权限与审批规则。请求运行测试不代表测试通过，请检查实际结果。

## 连接 ACP 客户端

```sh
caelis acp
```

在支持 ACP stdio 的客户端中配置此命令，进程启动方式与工作目录由客户端配置决定。

## 留住有用的上下文

内置 Remember 与 Recall 无需额外安装；可通过 `/team` 配置可选的 Memory Steward。模型请求仍按你选择的服务发送。

`caelis bot` 是终端入口，与 [Caelis Bot 桌面应用](/zh-cn/docs/caelis-bot/)不同。需要桌面角色、截图工具与日常对话时，从桌面应用开始。
