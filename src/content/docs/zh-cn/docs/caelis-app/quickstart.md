---
title: "在本地运行桌面客户端"
description: "准备开发工具链并启动早期 Beta。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-app/quickstart.md"
project: "caelis-app"
sourceRepo: "caelis-app"
sourceRef: "e443ccd1a5f595fb31caade2e5af0fc941d7772d"
sourcePath: "README.md"
productVersion: "Development"
---

## 环境要求

所锁定公开 README 声明 Go 1.25、Node.js 22 或更新版本、pnpm 11，以及 Wails CLI `v3.0.0-beta.6`。本指南对应记录的开发 revision，不是已发布的桌面安装包。

```sh
git clone https://github.com/caelis-labs/caelis-app.git
cd caelis-app
git checkout e443ccd1a5f595fb31caade2e5af0fc941d7772d
go install github.com/wailsapp/wails/v3/cmd/wails3@v3.0.0-beta.6
cd frontend
pnpm install
cd ..
wails3 task dev PACKAGE_MANAGER=pnpm
```

原生桌面构建还需要对应平台的开发工具。如果原生编译失败，请检查 Wails 对该平台的环境要求。

## 检查客户端

```sh
make check
```

该命令运行项目检查，但不能证明所有平台都已有签名安装包或通过原生发行验收。

接下来[连接本地 ACP 智能体](../connect/)。
