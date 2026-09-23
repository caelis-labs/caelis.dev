---
title: "Work with participants"
description: "Give each participant a role and keep the conversation open."
sidebar: {"order": 3}
editUrl: "https://github.com/caelis-labs/caelis.dev/edit/main/src/content/docs/docs/caelis/participants.md"
project: "caelis"
sourceRepo: "caelis"
sourceRef: "f136ebaeb46608a69bf7732af57bb2f2a2382756"
sourcePath: "docs/participants.md"
productVersion: "v0.60.1"
---

## Configure the team

Use `/team` to configure roles such as `breeze`, `orbit`, and `zenith`, or create a custom role. Bind each to an appropriate model or ACP agent.

## Start with a bounded task

```text
Review this change with two participants: one for correctness and one
for test coverage. Have them exchange findings, then summarize the
issues and recommended fixes. Do not edit files yet.
```

Participants keep separate conversations and communicate through the local Session's mailbox. The collaboration network is scoped to that Session, not a hosted messaging service.

## Follow and steer the work

Open a participant link or the running/done count in the footer. Use an overlay or split view, and send text or images directly to that participant.

- **F6** switches composer focus.
- **F7** shows or hides the participant pane without stopping work.

External ACP agents differ in their support for tool injection, steering, and history. Check the [full participant guide](../reference/participants/) and [ACP capability requirements](../reference/external-acp-agents/) for those boundaries.
