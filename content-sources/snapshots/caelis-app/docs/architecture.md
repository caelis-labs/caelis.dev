# Architecture

## Goals

Caelis App is a lightweight desktop **client**. It does not own agent runtime semantics, Caelis Control state, model execution, policy, persistence, or replay. Its architecture must support two backends without merging their contracts:

1. standard ACP, beginning with local stdio;
2. the versioned Caelis App Server protocol, beginning in the next iteration.

The repository is independent so a change in the main Caelis `control/*` implementation cannot force a GUI release. The only Caelis coupling permitted in this repository is a released external protocol and its compatibility contract.

## Layers

```text
┌──────────────────────────────────────────────────────────┐
│ React presentation                                       │
│ transcript · composer · permissions · plan · diagnostics │
└──────────────────────────┬───────────────────────────────┘
                           │ WorkbenchSnapshot / commands
┌──────────────────────────▼───────────────────────────────┐
│ WorkbenchBackend                                         │
│ Standard ACP adapter        Caelis App Server adapter    │
└──────────────┬───────────────────────────┬───────────────┘
               │                           │
┌──────────────▼─────────────┐  ┌──────────▼──────────────┐
│ official ACP TypeScript SDK│  │ generated versioned API │
└──────────────┬─────────────┘  │ client + SSE reducer    │
               │                └──────────┬──────────────┘
┌──────────────▼───────────────────────────▼──────────────┐
│ Wails native services                                   │
│ local process/stdin/stdout · later HTTP auth custody    │
└─────────────────────────────────────────────────────────┘
```

### Presentation

`frontend/src/App.tsx` renders backend-neutral state. It may format data and own ephemeral interaction state, but it must not infer authoritative session, approval, replay, or execution facts from prose or metadata.

### Backend contract

`frontend/src/lib/backend/types.ts` is the GUI's internal seam. A backend publishes immutable snapshots and accepts a small command set. It is not a new network protocol and must not grow into a mirror of either ACP or Caelis Control.

### Standard ACP adapter

`frontend/src/lib/acp` uses `@agentclientprotocol/sdk` stable v1 APIs. The SDK owns JSON-RPC validation, method names, and compatibility. The adapter maps typed ACP updates into presentation state; it does not maintain a second wire schema.

The initial transport is a local process with NDJSON over stdin/stdout. Protocol stdout is never logged. Stderr is diagnostics only. The Go host launches the executable directly and never invokes a shell.

### Native host

`internal/agenthost` owns only OS-level lifecycle and bytes. Its four calls are:

- return the default absolute workspace;
- start an agent process;
- write exact data to agent stdin;
- stop an agent process.

Wails events carry stdout, stderr, and exit facts. Adding ACP parsing, permission policy, session persistence, or Caelis Control calls to this package would violate its boundary.

### Caelis App Server adapter

`CaelisAppServerBackend` is currently an unavailable placeholder. The real adapter will consume a released, generated client from Caelis's versioned OpenAPI/SSE contract. It must not:

- import source from the Caelis repository;
- call unversioned or private Control endpoints;
- own or construct a Caelis Runtime/Stack;
- reinterpret Envelope identity, relations, cursors, approvals, or terminal state;
- expose the App Server token to arbitrary renderer code when native custody is available.

## State ownership

| State | Owner |
| --- | --- |
| Local window and form state | GUI |
| Current ACP connection and in-memory ACP session | standard ACP adapter + agent |
| ACP method validation | official ACP SDK |
| Local child process | Wails host service |
| Caelis Session, Turn, approval, replay, operation ledger | Caelis Control Host |
| GUI unread/selection preferences | GUI, later local persistence |

There must be one semantic owner and one authoritative data path for every fact.

## Compatibility

- ACP v1 is explicitly pinned through the SDK package and `PROTOCOL_VERSION`.
- ACP v2 remains experimental and must enter through a separate adapter/conformance decision, not conditional parsing spread through the UI.
- Wails 3 is pinned to a beta release. Binding regeneration and a complete check are required for upgrades.
- The Caelis backend is gated by App Server initialization, API/envelope versions, and advertised capabilities. Unsupported combinations fail closed before opening a Session.
