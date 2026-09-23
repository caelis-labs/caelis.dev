---
title: "Remember 与 Recall"
description: "模型接口保持简洁，范围由宿主控制。"
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/memory/remember-recall.md"
project: "memory"
sourceRepo: "memory"
sourceRef: "847c4699f8e59cf3ea53e16df0726a4420b13c80"
sourcePath: "README.md"
productVersion: "v0.6.1"
---

## Remember

`remember(text)` 通过已绑定宿主上下文的客户端记录信息。Memory 管理持久回执及处理状态。模型提供的是文本，不是身份、受众或检索策略。

## Recall

`recall(query)` 在已绑定的范围中检索获准访问的证据，返回结果前先进行授权判断。

未绑定 Steward 模型时，静态回执与词法 Recall 不调用模型。宿主可以在没有后台模型处理依赖的情况下保存和检索持久证据。

## 证据与当前事实

召回的回执是证据，不会自动成为当前用户偏好。0.6 引入显式的当前事实生命周期 API 与可信证据处理，现有证据不会被静默转换为当前事实。

公开约定见 [Facts 参考](../reference/facts/)。升级已有数据库时，请阅读[迁移说明](../migration/)。
