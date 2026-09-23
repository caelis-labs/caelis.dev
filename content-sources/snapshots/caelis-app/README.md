# Caelis App

An ACP-first desktop workbench for coding agents.

> **Status: early beta.** The terminal UI remains the primary Caelis product surface. This repository is establishing a lightweight, protocol-driven desktop client before it takes on production release responsibilities.

Caelis App is intentionally a separate project from [`caelis`](https://github.com/caelis-labs/caelis). Its first contract is the open [Agent Client Protocol](https://agentclientprotocol.com/), not an internal Go package. A later adapter will consume the versioned Caelis App Server API without importing `control/*` or sharing process authority with the main repository.

## What works in v0.1

- launch any local stdio ACP agent without a shell;
- negotiate ACP v1 with the official TypeScript SDK;
- create a workspace-scoped session and send prompts;
- render streaming messages, reasoning, tool calls, and plans;
- surface ACP permission requests and cancellation;
- keep agent stderr separate from protocol stdout;
- reserve an explicit `caelis-appserver` backend boundary for the next iteration.

The current client deliberately does not advertise ACP filesystem or terminal capabilities. It should not claim a capability until the corresponding permission, lifecycle, and platform behavior is implemented end to end.

## Quick start

Requirements:

- Go 1.25;
- Node.js 22 or newer;
- pnpm 11;
- Wails CLI `v3.0.0-beta.6`.

```bash
go install github.com/wailsapp/wails/v3/cmd/wails3@v3.0.0-beta.6
cd frontend && pnpm install && cd ..
wails3 task dev PACKAGE_MANAGER=pnpm
```

In the connection screen, enter the executable, one argument per line, and an absolute workspace path. For a Caelis build that exposes its standard ACP agent, use `caelis` as the command and `acp` as one argument. The future App Server integration is a different backend.

## Real ACP validation

The repository contains an opt-in real-process compatibility test for the production
backend. Grok is the current strict v0.1 gate:

```bash
ACP_E2E_COMMAND=/absolute/path/to/grok \
ACP_E2E_ARGS='["agent","stdio"]' \
ACP_E2E_CWD="$PWD" \
pnpm --dir frontend test:e2e:acp
```

The same test can run against `caelis acp`. Current evidence, including the Caelis
streaming `messageId` gap that must be fixed upstream, is documented in
[ACP compatibility](docs/acp-compatibility.md).

## Architecture

```text
React workbench
  └─ WorkbenchBackend
      ├─ StandardACPBackend (v0.1)
      │   └─ official ACP SDK → Wails host transport → local agent process
      └─ CaelisAppServerBackend (next iteration)
          └─ versioned HTTP/SSE protocol only
```

Go owns desktop and OS concerns: window lifecycle, child processes, stdio, and later secure credential custody. TypeScript owns ACP client semantics through the official SDK. The UI consumes a backend-neutral workbench model. See [Architecture](docs/architecture.md) and [ADR 0001](docs/decisions/0001-stack-and-repository.md).

## Development

```bash
make bindings   # regenerate Wails TypeScript bindings
make test       # Go + frontend unit tests
make check      # tests, typecheck, production frontend build, Go build
make dev        # Wails hot reload
```

Generated Wails bindings are checked in so frontend typechecking and review do not depend on a local generator run. Never edit files under `frontend/bindings` manually.

## Roadmap boundary

The next iteration adds a Caelis App Server adapter after the host contract is ready for independent desktop clients. The tracked server-side prerequisites are in [Caelis App Server readiness](docs/caelis-appserver-readiness.md). Multi-session persistence, remote transports, filesystem/terminal providers, updates, signing, and production packaging remain out of v0.1.

## Reference implementation policy

[`RongleCat/grok-app`](https://github.com/RongleCat/grok-app) is the primary product and interaction reference because it is already an ACP desktop client. The initial shell selectively ports its proven TypeScript/CSS presentation boundaries: project/session rail, light theme tokens, centered composer, shell chrome, and Tabler icon layer. Grok branding, account logic, Tauri runtime code, and vendor protocol extensions are excluded. Reuse is pinned and attributed in [NOTICE](NOTICE); ACP behavior comes from the official SDK rather than copied wire code. See [References](docs/references.md) and [Visual direction](docs/visual-direction.md).

Caelis icons and wordmark are synchronized from the sibling `caelis.dev` homepage at
revision `2cfdc6ff32ee`; their source hashes and copy locations are recorded in
[References](docs/references.md#caelis-brand-assets).

## License

Apache License 2.0. See [LICENSE](LICENSE).
