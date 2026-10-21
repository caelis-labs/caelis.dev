---
title: "Linux / WSL：安装与 Web 使用"
description: "将正式 Headless/Web 发行版安装为 systemd 用户服务。"
sidebar: {"order": 2}
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "docs/install.linux.md"
productVersion: "v0.18.1"
---

CaelisBot **v0.18.1** 提供 Linux **amd64 / arm64** 完整包，无需桌面窗口，内置 Caelis Core **0.73.1** 与 Web 页面。在浏览器中聊天、添加文件、调整设置并跟进已接受的后台工作。它不是 Linux 桌面角色版，不提供电脑操控或 Web 终端。

## 安装前准备

使用普通 Linux 用户，确保有运行中的 **systemd 用户管理器**、**Python 3**、支持 Ed25519 的 **OpenSSL**，以及启用非特权 user namespaces 的 **bubblewrap**。缺少依赖时通过发行版包管理器安装。正式包不需要 Go 或 Node.js。

WSL 必须启用 systemd。按 [Microsoft 官方说明](https://learn.microsoft.com/zh-cn/windows/wsl/systemd)配置并重启 WSL，再确认 `systemctl --user show-environment` 可用。systemd 服务不会让已关闭的 WSL 实例持续运行；本次发行检查不代表已通过实体 WSL 环境验收。

## 安装并打开

在 Linux 机器运行官方安装命令：

```sh
curl -fsSL https://releases.caelis.dev/caelis-bot/install.sh | sh
```

也可以先[保存并查看脚本](https://releases.caelis.dev/caelis-bot/install.sh)。安装器自动选择架构，核验签名索引和下载文件，再启用并启动当前用户的 `caelisbot.service`；不会调用 sudo、修改防火墙或启用 linger。

在服务所在机器打开 `http://127.0.0.1:9317`。关闭浏览器不会停止已接受的工作，但服务与机器必须保持运行。

1. 选择 **Caelis**，连接模型服务或复用已有认证模型。Caelis CLI 已内置。
2. 使用 **Codex** 时，先选择**安装 Codex**，再选择**使用 ChatGPT 登录**，按页面提示在官方验证页输入设备验证码。安装包不内置 Codex 或模型订阅。
3. 模型地址、路径、文件和账号都属于**运行服务的机器**，不因浏览器在另一台电脑上打开而改变。

Caelis 实验特性遵循 Core 当前配置，初始默认关闭。只有你明确修改时才保存，打开设置不会自动开启。

## 手动下载

| 架构 | 完整包 | 校验清单 |
| --- | --- | --- |
| amd64 / x86_64 | [tar.gz](https://ohmybot.si/download/linux/amd64/) | [SHA-256](https://ohmybot.si/download/linux/amd64/?asset=checksum) |
| arm64 / aarch64 | [tar.gz](https://ohmybot.si/download/linux/arm64/) | [SHA-256](https://ohmybot.si/download/linux/arm64/?asset=checksum) |

这些入口读取对应架构最新正式版的 R2 索引。[GitHub v0.18.1 发行页](https://github.com/caelis-labs/caelis-bot/releases/tag/v0.18.1)保留准确版本的资产。请保留完整包内文件；校验和用于核对传输内容，官方安装器还会验证签名索引。手动安装及其更新由你管理。当前不发布 AppImage、deb、rpm 或正式 Docker 镜像。

## 服务管理与升级

```sh
systemctl --user status caelisbot.service
systemctl --user stop caelisbot.service
systemctl --user start caelisbot.service
journalctl --user -u caelisbot.service
```

使用**设置 → 更新**，或显式升级受管理的安装：

```sh
curl -fsSL https://releases.caelis.dev/caelis-bot/install.sh | sh -s -- --upgrade
```

受管理更新等待安全的空闲交接，保留配置、登录、Notebook 与历史。工作繁忙时更新可能继续排队；按设置页确认安装完成，如仍需修复 launcher，再运行 `--upgrade`。不带 `--upgrade` 重跑安装器会保留现有代码和数据，并启动自有用户服务。

代码位于 `$XDG_DATA_HOME/caelisbot-install`，私有数据独立位于 `$XDG_DATA_HOME/caelisbot`（默认基础目录 `~/.local/share`）。替换应用时保留数据目录，普通升级不需要删除它。

## VM 或另一台电脑

虚拟机的 localhost 不等于宿主机的 localhost。服务保持本机监听，需要时通过 SSH 转发到你自己的电脑：

```sh
ssh -N -L 127.0.0.1:9317:127.0.0.1:9317 user@guest
```

将 `user@guest` 替换为自己的 SSH 账号与主机。不要将这个受信任的本机转发公开到网络。私网或反向代理访问需要明确的允许来源和配对，请遵循[官方网络部署说明](https://github.com/caelis-labs/caelis-bot/blob/v0.18.1/docs/headless-web.md)。安装器不会自动开放远程访问。

[官方 Linux 安装说明](https://github.com/caelis-labs/caelis-bot/blob/v0.18.1/docs/install.linux.md) · [常见问题](../troubleshooting/)
