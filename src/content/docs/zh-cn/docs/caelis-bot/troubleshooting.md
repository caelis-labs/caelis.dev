---
title: "常见问题与支持"
description: "检查连接、下载、截图与平台要求。"
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis-bot/troubleshooting.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "README.md"
productVersion: "v0.18.1"
---

## 角色出现了，但无法开始聊天

打开**设置 → 连接与模型**，完成所选连接的登录和模型选择。Caelis 已内置，Codex 需要你自己的本机安装。安装完成不代表模型已登录，配置好后先发送一个简单问题。

## macOS 阻止首次打开

按[安装指南](../reference/install/)校验官方安装包，正常确认首次打开提示。如果校验和、签名或 Gatekeeper 验证失败，请重新下载官方副本，不要关闭系统检查。

## Windows 显示安全提示

当前 Windows 包没有 Authenticode 签名，SmartScreen 或组织策略可能提示或阻止安装。只使用官方发布，核对对应校验和并阅读发布说明，同时确认已安装 Microsoft Edge WebView2。详见[Windows 安装要求](../installation/)。

## 截图工具栏无法使用“问 Bot”

当前模型需要明确支持图片输入。可在“连接与模型”中选择兼容模型；截图、复制、标注和贴图仍可独立使用。如果无法截图，检查附加功能和系统权限。

## 支持哪些平台？

已发布 Apple Silicon macOS 与 Windows x64 安装包。Windows 要求 Windows 10 22H2 或更新版本及 WebView2，原生测试使用 Windows 11。目前没有 Intel Mac、Windows ARM64 或 Linux 桌面包。另提供 Linux amd64/arm64 Headless/Web 完整包，使用浏览器连接常驻服务。它与桌面版中的 SSH 远程工作目标不同。

## Linux 服务或 Web 页面打不开

先检查 `systemctl --user status caelisbot.service`，再用 `journalctl --user -u caelisbot.service` 查看服务日志。确认 systemd 用户管理器、Python 3、OpenSSL 和 bubblewrap 可用，WSL 已启用 systemd。VM 的 localhost 不等于宿主的 localhost；按 [Linux 指南](../linux/)使用只绑定本机的 SSH 转发。请勿通过关闭沙箱保护来绕过安装要求。

## 数据与账号在哪里？

Notebook 和应用数据保存在运行 Bot 的机器上，所选模型或连接的服务可能接收请求和附件。安装包不包含服务账号、订阅或额度。重新安装时保留应用数据；Windows 预览版与正式版数据保持独立。

## 怎样报告问题？

遵循应用的恢复提示，或提交 [Issue](https://github.com/caelis-labs/caelis-bot/issues)，附上平台、版本和复现步骤。分享诊断报告前检查内容，移除私人对话、账号、私有路径与密钥。[角色资产许可](../reference/character-assets/)独立于 Apache-2.0 代码许可。
