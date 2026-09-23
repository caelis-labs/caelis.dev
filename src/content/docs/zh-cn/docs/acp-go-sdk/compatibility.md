---
title: "兼容与升级"
description: "区分模块、schema 与 wire protocol 版本。"
sidebar: {"order": 4}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/acp-go-sdk/compatibility.md"
project: "acp-go-sdk"
sourceRepo: "acp-go-sdk"
sourceRef: "ed838d76cc0bca458732e15a457235c55a4d6642"
sourcePath: "README.md"
productVersion: "v1.4.0"
---

## 三种版本，各有含义

| 标识 | 本文档对应版本 |
| --- | --- |
| Go 模块发布 | v1.4.0 |
| ACP v1 类型来源 schema | schema-v1.23.0 |
| 协商的 wire protocol | ACP v1 |

升级模块不等于协商了另一种协议。初始化时检查可选能力，不能因为类型存在就假定所有智能体都支持对应方法。

## 升级到 v1.4

阅读[对应版本的升级指南](../reference/upgrading-to-v1-4/)，对照公开 API 检查处理器、生成类型和子进程生命周期。

## 互操作证据

项目维护与官方 TypeScript、Rust SDK 的互操作矩阵。证据只对应已测试的版本与路径；你自己的权限策略和进程管理仍需验证。

参阅 [API 参考](https://pkg.go.dev/github.com/caelis-labs/acp-go-sdk@v1.4.0)与[版本发布](https://github.com/caelis-labs/acp-go-sdk/releases)。
