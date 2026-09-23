---
title: "安装与更新"
description: "在 macOS、Linux 或 Windows 上安装 Caelis。"
sidebar: {"order": 1}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis/installation.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

## macOS 与 Linux

```sh
curl -fsSL https://caelis.dev/install.sh | sh
```

安装器获取最新版本、验证校验和，默认安装到 `~/.local/bin`。如果找不到命令，请按安装器提示设置 PATH。

## Windows PowerShell

```powershell
irm https://caelis.dev/install.ps1 | iex
```

## npm

```sh
npm install -g @caelis/caelis
```

## 打开工作区

```sh
cd /path/to/your/project
caelis
```

将示例路径替换为你的项目目录。随后[建立第一次连接](../connections/)。

## 更新与指定版本

再次执行相同安装指令即可更新。官网 Shell 与 PowerShell 安装器始终选择最新版本，不用于选择历史版本。需要固定版本时，请从 [GitHub Releases](https://github.com/caelis-labs/caelis/releases) 获取对应文件与校验和。

正式发布二进制覆盖 macOS、Linux、Windows 的 x64 与 ARM64。从源码构建时，以所选版本 `go.mod` 中声明的 Go 版本为准。
