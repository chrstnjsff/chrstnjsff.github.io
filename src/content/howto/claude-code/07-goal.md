---
title: Keep Claude working toward a goal
nav: /goal
summary: Set a finish line, and Claude keeps taking turns until it is reached.
sources:
  - label: "Claude Code: Keep Claude working toward a goal"
    url: https://code.claude.com/docs/en/goal
---

**What it is:** `/goal` sets a condition for when the work is done.
After each turn, a small, fast model checks the conversation, and Claude keeps going on its own until that model judges the condition met, or impossible.

**When to use it:** for bigger jobs with a clear, checkable end, such as getting a test suite green or finishing a migration.

**Example:** write one measurable end state, say how Claude should prove it, and add a limit so it cannot run forever:

```text title="In Claude Code"
/goal npm test exits 0 and no test files are deleted, or stop after 20 turns
```

The goal starts working immediately, so you do not need to send another prompt.
The checker only reads the conversation and never runs commands itself, so describe an end state that Claude's own output can show, such as a test result.
A goal does not change your permission mode, so Claude still asks before actions that normally need your approval.
Only one goal can be active at a time, and setting a new one replaces it.

To see how it is going, including how many turns it has taken, run `/goal` on its own:

```text title="In Claude Code"
/goal
```

**How to stop or exit:** clear the goal before it finishes:

```text title="In Claude Code"
/goal clear
```

Starting a new conversation with `/clear` also removes the goal.
