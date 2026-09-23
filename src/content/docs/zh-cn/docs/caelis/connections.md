---
title: "首次连接"
description: "选择模型 Provider，或连接外部 ACP 智能体。"
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis/connections.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

## 连接模型 Provider

在工作区启动 Caelis，运行：

```text
/connect
```

选择支持的登录流程、配置 API Key Provider，或连接本地模型 Provider。按照界面显示的步骤完成连接。

随后打开 `/model`，选择主模型和它支持的思考强度。先询问一个简单的仓库问题，确认连接可用，再开始较大的任务。

## 连接 ACP 智能体

单独安装外部智能体，并确保 Host 的 PATH 能找到它的可执行文件。在 `/connect` 中选择该智能体，或者通过 **Custom** 配置其他 ACP stdio 命令。

外部智能体拥有自己的模型连接和执行能力。Caelis 只能使用对方通过 ACP 暴露的协作与审批能力。

## 配置参与者角色

打开 `/team`，为角色绑定 Provider 模型或 ACP 智能体，并保存需要复用的配置。参阅[参与者协作](../participants/)与[外部 ACP 参考](../reference/external-acp-agents/)。

## 连接失败时

检查可执行程序、参数、Provider 配置以及所选 Host 的运行环境。协议初始化成功不代表已经完成鉴权和真实请求，请用一个简单任务验证完整连接。
