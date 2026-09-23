---
title: "Sessions and continuity"
description: "Return to earlier work without losing the thread."
sidebar: {"order": 4}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis/sessions.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

## Resume a conversation

Use `/resume` or **Ctrl+O** to open the Session list. Active Sessions are marked `running`. Selecting a Session changes the view while its accepted work can continue on the Host.

To observe a known Session from another terminal:

```sh
caelis -session <session-id>
```

Replace `<session-id>` with the actual identifier. Both terminals must use the same Host and data root.

## Closing and interrupting

`/quit`, `/exit`, **Ctrl+D**, or two presses of **Ctrl+C** close the TUI without cancelling an accepted Turn. **Esc** in the Session workspace interrupts the current Turn; inside the Session list it closes the list.

Continuing work after terminal exit requires a managed or remote Host. With `-embedded`, the Host ends with its owning process.

## Local data

Release builds store Sessions and managed credentials under `~/.caelis` by default. `-store-dir` chooses another data root; it does not change the workspace. Model requests still go to the selected provider or external agent.
