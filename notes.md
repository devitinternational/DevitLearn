# Knowledge Notes

> Stores user instructions, clarifications, decisions, and preferences gathered across sessions.
> **Always read before starting any task.**

---

## Format

Each note entry follows this structure:

```
### NOTE-XXX: [Topic]
- **Date**: YYYY-MM-DD
- **Type**: instruction | clarification | decision | preference
- **Context**: What triggered this note.
- **Content**: The actual information / decision.
```

---

## Notes

### NOTE-001: File & Folder Naming Conflict (Resolved)
- **Date**: 2026-03-09
- **Type**: decision
- **Context**: Conflict between naming preferences resolved per updated JSON instructions.
- **Content**: 
  - **Files**: `kebab-case`
  - **Functions**: `snake_case`
  - **Classes**: `PascalCase`
  - **Components**: `PascalCase`
  - **Folders**: `PascalCase`

### NOTE-002: Project Protocol Setup
- **Date**: 2026-03-09
- **Type**: instruction
- **Context**: User provided a full `project_protocol` JSON configuration at session start.
- **Content**: 
  - Always read `definition.md`, `requirements.md`, `instructions.md`, `memory.md`, `notes.md`, `mindset.md` before implementation.
  - Log every task in `requirements.md` before starting.
  - Update `memory.md` when new reusable logic is created.
  - Do not modify `definition.md` without user approval.
  - Apply DRY and KISS in every change.
  - Ask clarifying questions before implementing if scope is unclear.

### NOTE-003: Engineering Principles
- **Date**: 2026-03-09
- **Type**: preference
- **Context**: Extracted from protocol JSON.
- **Content**: DRY (Don't Repeat Yourself) and KISS (Keep It Simple, Stupid) are mandatory on every change. Redundant code and unnecessary complexity must be flagged.

---

*Add new notes below this line as sessions progress.*
