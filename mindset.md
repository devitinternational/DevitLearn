# Agent Mindset

> This file captures learned lessons, pitfall patterns, and approach corrections to prevent repeating mistakes.
> Updated as new learnings emerge during work sessions.

---

## Core Mindset Rules

1. **Read before writing.** Always load `definition.md`, `requirements.md`, `instructions.md`, `memory.md`, `notes.md`, `mindset.md` before any implementation.
2. **Ask before assuming.** If requirements are ambiguous, ask clarifying questions. Never assume a design decision without confirmation.
3. **Reuse, don't reinvent.** Search `@hooks`, `@utils`, and `@components/smart` before writing new shared logic.
4. **Log before starting.** Every task must have a `requirements.md` entry before implementation begins.
5. **Verify before claiming done.** Cross-check implementation against requirements, memory.md for reuse gaps, and definition.md for scope drift.

---

## Architectural Mindset

- The correct flow is always: **API (`@apis`) → State (`@states`) → Page/Component**.
- Never put business logic directly in components. It belongs in the state layer.
- Never put API calls directly in components. They belong in `@apis` and invoked via state actions.
- Table columns belong in `_list-table-structure.tsx` for complex pages — don't inline them.
- Keep `useEffect` for side effects only. Keep render paths pure.

---

## Naming Mindset

- React components: `PascalCase`.
- Functions and variables: `snake_case`.
- Files: `kebab-case`.
- API functions: suffix `_query` for reads, `_mutation` for writes.
- State files: `domain.state.ts`.
- Hooks: `use-*.tsx` files.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why it's Wrong |
|---|---|
| `console.log` in production code | Leaks internal state; remove before finalizing |
| Using `any` type broadly | Masks type errors; use explicit types |
| Deeply nested conditionals | Hard to read; use early returns |
| Mixing casing within a file | Inconsistent; reduces readability |
| Inlining reusable logic in components | Violates DRY; extract to `@hooks` or `@utils` |
| Creating a new utility when one already exists | Violates DRY; search first |
| Modifying `definition.md` autonomously | Requires explicit user approval |
| Starting a task without logging it | Violates requirements tracking protocol |

---

## Lessons Learned

### LESSON-001: Protocol File Initialization (2026-03-09)
- **What happened**: Project had no `requirements.md`, `definition.md`, `notes.md`, or `mindset.md` despite active development.
- **Learning**: Protocol files should be created at project inception. Existing `instructions.md` and `memory.md` were already solid foundations.
- **Prevention**: On first contact with any project, check for all 6 mandatory context files and create missing ones immediately.

### LESSON-002: Skipped Mandatory Pre-Work Before Task (2026-03-09)
- **What happened**: For REQ-001 (remove page size changer), jumped directly into implementation without reading the 6 mandatory files or logging the task in `requirements.md` first.
- **Learning**: The pre-work step is not optional — even for small, "obvious" tasks. The user explicitly called this out.
- **Prevention**: Before touching any code, always read all 6 files in order and create a `requirements.md` entry. No exceptions, regardless of task size.

---

*Add new lessons below this line as sessions progress.*
