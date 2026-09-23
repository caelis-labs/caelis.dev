---
title: "参与者协作"
description: "为参与者分配角色，让协作持续发生。"
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis/participants.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "docs/participants.md"
productVersion: "v0.60.1"
---

## 配置团队

使用 `/team` 配置 `breeze`、`orbit`、`zenith` 等角色，或者创建自定义角色。为每个角色绑定合适的模型或 ACP 智能体。

## 从范围明确的任务开始

```text
请让两位参与者审查这次变更：一位关注正确性，另一位关注测试覆盖。
让他们交流发现，再汇总问题与修复建议。暂时不要修改文件。
```

参与者保留独立对话，通过本地会话的消息服务交流。协作网络仅属于当前会话，不是托管的跨会话消息服务。

## 跟进与补充要求

点击参与者链接或页尾的运行中/完成数量，打开浮层或分栏，并直接向参与者发送文字或图片。

- **F6** 切换输入焦点。
- **F7** 显示或隐藏参与者面板，不会停止工作。

外部 ACP 智能体在工具注入、补充输入和历史支持上存在差异。详细边界请参阅[参与者完整指南](../reference/participants/)和[ACP 能力要求](../reference/external-acp-agents/)。
