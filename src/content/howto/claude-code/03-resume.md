---
title: Pick up where you left off
nav: Resume
summary: Continue your last conversation, or choose an older one from a list.
sources:
  - label: "Claude Code: Manage sessions"
    url: https://code.claude.com/docs/en/sessions
---

**What it is:** Claude Code saves every conversation, so you can reopen one later with its full history.

**When to use it:** you closed the terminal, came back the next day, or want to return to an earlier task.

**Example:** from the terminal, in the same project folder, continue the most recent conversation:

```bash
claude -c
```

Or open a list of past conversations to choose from:

```bash
claude -r
```

Inside a running session, the same list opens with:

```text title="In Claude Code"
/resume
```

In the list, use the arrow keys and press Enter to open a conversation, or start typing to search.
Giving a conversation a name makes it easy to find, and `/rename` does that:

```text title="In Claude Code"
/rename auth-refactor
```

**How to stop or exit:** press `Esc` to close the list without choosing.
To leave Claude Code itself, type `/exit`, or press `Ctrl+D` twice.
