---
title: "会话与恢复"
description: "随时回到之前的工作。"
sidebar: {"order": 4}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/zh-cn/docs/caelis/sessions.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

## 恢复对话

使用 `/resume` 或 **Ctrl+O** 打开会话列表。活跃会话标记为 `running`。选择会话会切换当前视图，已接受的工作可以继续在 Host 上运行。

从另一个终端观察已知会话：

```sh
caelis -session <session-id>
```

将 `<session-id>` 替换为真实标识。两个终端需要连接相同的 Host 与数据根目录。

## 退出与中断

`/quit`、`/exit`、**Ctrl+D** 或连续两次 **Ctrl+C** 关闭 TUI，不会取消已接受的 Turn。在会话工作区按 **Esc** 中断当前 Turn；在会话列表中按 Esc 则关闭列表。

终端退出后继续工作需要托管或远程 Host。使用 `-embedded` 时，Host 会随所属进程结束。

## 本地数据

正式发布版本默认将会话与管理的凭证保存在 `~/.caelis`。`-store-dir` 修改的是数据根目录，不是工作区。模型请求仍会发往所选 Provider 或外部智能体。
