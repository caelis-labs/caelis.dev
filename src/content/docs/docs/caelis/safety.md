---
title: "Approvals and sandboxing"
description: "Understand how tool requests and local execution are controlled."
sidebar: {"order": 5}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis/safety.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "README.md"
productVersion: "v0.60.1"
---

## Tool approval modes

Caelis starts in `auto-review` mode. Guardian evaluates tool requests against the Session context and approval policy. If it cannot make a valid decision, it fails closed.

To approve requests yourself:

```text
/mode manual
```

Review the requested action, relevant path, and stated purpose before approving it.

## Operating-system sandboxing

Local commands run under the configured sandbox policy. Caelis uses the applicable operating-system isolation mechanisms on supported platforms. The selected policy determines filesystem access and other available restrictions.

External agents retain their own execution capabilities. Caelis handles the permission requests they expose through ACP; connecting an external agent does not make all of its behavior equivalent to Caelis's native runtime.

## Local does not mean offline

Sessions and Caelis-managed credentials are stored locally. Requests go to the model provider or external agent you select. Keep this distinction in mind when choosing a connection for a workspace.
