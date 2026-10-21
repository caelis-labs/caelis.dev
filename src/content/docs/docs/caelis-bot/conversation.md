---
title: "Conversations, models and tools"
description: "Talk, share files, capture a screen region and follow tasks."
sidebar: {"order": 2}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis-bot/conversation.md"
project: "caelis-bot"
sourceRepo: "caelis-bot"
sourceRef: "1acfd0b9ecc50a9270ce321e90365b152221491a"
sourcePath: "docs/product.md"
productVersion: "v0.18.1"
---

## Open the conversation

On desktop, click the character to open or hide chat. Double-click to bring chat and already-open settings forward. Drafts stay in the chat window. The menu bar on macOS and system tray on Windows provide settings, visibility controls and Quit.

Send a message or attach a file to provide context. Replies return to the ongoing conversation. When an action needs your decision, review the request before allowing it to continue.

In Linux Headless/Web, use chat, files and settings in your browser. Closing the page does not stop accepted work. Files, model connections and accounts belong to the service machine. Desktop characters, capture shortcuts, Computer Use and terminal observer windows do not apply to this edition.

## Choose conversation and work models

Open **Settings → Connections & Models**. The conversation model is the one you talk to; the default work model is used for newly delegated tasks. You can choose them separately. Existing work keeps its original connection. Model availability, reasoning options and image support depend on your connected service.

Caelis comes with desktop and Linux packages and connects to your model services. Codex uses your own local installation and account. Switching runtime is different from choosing another model; follow the app’s connection guidance.

## Follow longer work

Bot can delegate code, research or document work. Open the task entry beside the character to see progress and completed results. A task card can open its associated external terminal for closer observation; closing that observer does not stop the underlying work. A task’s actual result, rather than its animation, tells you what finished.

On macOS, **Remote Machines** lets you configure an SSH machine with its own runtime login and default work model. Explicitly ask Bot to use that machine. Accounts and files are not automatically copied, and this is not automatic workload scheduling.

## Capture only what you want to share

Enable screenshot and pin tools in **Settings → Extras**. Use **F1** for region selection, annotation and redaction. Review the selection before copying, saving or sending it. **Ask Bot** is available when the current model explicitly supports image input. Copy, annotation and pinning do not require an image model. **F3** pins an image from the clipboard.

Required system permissions are requested when a feature needs them. Manual capture is not continuous desktop recording. Computer-use plugins are separate: actions may use the foreground, pointer and keyboard.

## Notes, reminders and connected services

Notebook contains Markdown notes you and Bot can read and edit. Tell Bot which preferences or project facts to keep. Notes are not model training, and you remain in control of their contents.

Ask for a reminder in the conversation. Scheduling needs the app to remain running and is affected by sleep and notification permissions; it is not an always-on cloud alarm.

Configure supported plugins in Settings, and connect Telegram through **Settings → Messaging** to continue the same Bot conversation. Each service has its own account, permissions and available actions. Only share information appropriate for that service.

## Make room

Move, resize or hide the character. Closing chat or settings keeps Bot running; hiding it does not cancel work. **Quit** ends the app and pauses resident reminders. See [troubleshooting](../troubleshooting/) if a connection or feature is unavailable.
