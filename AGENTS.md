# AGENT.md — Mnemosine Universal Agent Protocol

This project is governed by Mnemosine. This protocol is provider-agnostic: it applies to any software-development agent, local or cloud, regardless of model vendor, IDE, operating system, company or development environment.

## Mandatory workflow

1. Identify the agent, role and project UUID.
2. Obtain the minimum relevant context from Mnemosine before changing code.
3. Treat constraints, contracts, ADRs, dependencies and task state as SSOT.
4. Execute only the assigned task unless a human explicitly changes the scope.
5. Validate the implementation and required tests.
6. Report changed/created/deleted files, tests, errors, retries, duration and token metrics.
7. Update task progress and reusable memory when the work produces durable knowledge.

## Project activation and preparation

Do not begin implementation while the project is in preparation. The project becomes ACTIVE only after:
- central-memory selections have been materialized into project memory;
- Mnemosine internal Gemini analysis has completed;
- all required answers in question.md have been answered;
- the final Gemini analysis has produced no required pending questions.

Gemini is Mnemosine's internal preparation service only. It is not the coding agent for this project.

## API and agent communication

Use the Mnemosine API when available. The external coding agent may be any provider, model, IDE, cloud service or local runtime.

The agent should:
1. authenticate with its Mnemosine agent token;
2. request the next ready task through the agent gateway;
3. claim/start the task before implementation;
4. update task state when work completes, fails or becomes blocked;
5. report tests, files, errors, retries and token metrics;
6. poll or acknowledge Changes and Bugs;
7. maintain heartbeat while connected.

Mnemosine may call the agent callback through a scheduled 30-minute probe. The probe is only a notification mechanism; the API remains the authoritative bidirectional channel.

If Mnemosine is temporarily unavailable, do not invent project state or claim a task was recorded. Continue only with information already available and safe local validation; reconcile task progress and durable memory with Mnemosine when service access returns.


## Source of truth

Operational state is stored by the Mnemosine API in PostgreSQL. `memory/state.json` is a derived compatibility read model. API contracts belong under `contracts/api/`; architectural decisions belong under `architecture/decisions/`; constraints belong under `analysis/constraints.md`. Derived indexes are rebuildable and are never SSOT.

When the project is connected to GitHub, the connected repository and branch are the code-delivery location for this project. The Agent Gateway poll response exposes the repository name and branch. Prefer normal Git/GitHub operations for source-code changes and commits. Mnemosine mirrors the project memory under `docs/` and keeps this mirror synchronized through Mnemosine; do not treat those mirrored files as a replacement for the Central Memory API. The `docs/` tree is a recovery backup only. Never overwrite existing source files just to synchronize memory.

## Security

- Never place credentials, API keys, tokens or secrets in source, memory, prompts, commits or logs.
- Never bypass authorization or project file governance.
- Never modify global memory through project-scoped operations.
- Never write outside the governed project hierarchy.

## Deterministic core and recovery

Mnemosine core does not require an LLM. Memory retrieval, task readiness, dependency validation, indexing, permissions and context budgeting are deterministic. The consuming agent may use any model provider or no LLM.

After an interrupted execution, inspect task state before retrying. Do not fabricate completion. Use Mnemosine diagnostics/recovery to repair derived state, then resume only after dependencies and ownership are valid.
