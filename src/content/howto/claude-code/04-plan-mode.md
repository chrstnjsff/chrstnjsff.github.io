---
title: Plan before Claude edits anything
nav: Plan mode
summary: Claude researches and writes a plan, and changes nothing until you approve it.
sources:
  - label: "Claude Code: Plan mode"
    url: https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode
---

**What it is:** in plan mode, Claude reads your files and explores, then writes a step-by-step plan.
It does not edit your code until you approve the plan.

**When to use it:** before any change that touches several files, or whenever you want to agree on the approach first.

**Example:** type `/plan` followed by the task, and Claude starts planning right away:

```text title="In Claude Code"
/plan add a dark mode toggle to the settings page
```

You can also press `Shift+Tab` to cycle through the permission modes until the status bar shows `⏸ plan mode on`, then type your request as usual.
To start a whole session in plan mode, launch Claude Code like this:

```bash
claude --permission-mode plan
```

When the plan is ready, Claude asks whether to go ahead.
Approving it leaves plan mode and Claude starts editing.
Choose "No, keep planning" to tell Claude what to change first, or press `Ctrl+G` to edit the plan in your text editor.

**How to stop or exit:** press `Shift+Tab` to leave plan mode without approving anything.
