---
title: Start with a solid CLAUDE.md
nav: CLAUDE.md
summary: Standing instructions that Claude reads at the start of every session, in every project.
sources:
  - label: "Boris Cherny's CLAUDE.md (gist by hqman)"
    url: https://gist.github.com/hqman/e29cb6386c539d795767e8c3fd2c959b
  - label: "Claude Code: How Claude remembers your project"
    url: https://code.claude.com/docs/en/memory
---

`CLAUDE.md` is a plain Markdown file of instructions that Claude Code loads at the start of every session.
The copy in `~/.claude/CLAUDE.md` applies to all your projects, and a `CLAUDE.md` inside a project applies to that project only.

A popular starting point is a short file that GitHub user hqman shared as "Boris Cherny's CLAUDE.md".
It has three parts:

- **Workflow:**
  - Plan before any task with several steps, and stop to re-plan when something goes wrong.
  - Hand research to subagents, so the main conversation stays focused.
  - Record a lesson after every correction, so the same mistake does not happen twice.
  - Prove that the work runs before calling it done.
  - Look for the elegant fix on bigger changes, without over-engineering small ones.
  - Fix bugs from the logs and failing tests, without asking for hand-holding.
- **Task management:** write the plan as a checklist in `tasks/todo.md`, check in before building, tick items off, summarize each change, and keep lessons in `tasks/lessons.md`.
- **Core principles:** keep every change as simple and small as possible, and fix root causes instead of patching symptoms.

Read [the full text on GitHub Gist](https://gist.github.com/hqman/e29cb6386c539d795767e8c3fd2c959b) before you use it.
This command backs up any `CLAUDE.md` you already have, then downloads the gist at a fixed revision, so the file cannot change under you later:

```bash
mkdir -p ~/.claude
[ -f ~/.claude/CLAUDE.md ] && cp ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.bak-$(date +%Y%m%d-%H%M%S)
curl -fsSL https://gist.githubusercontent.com/hqman/e29cb6386c539d795767e8c3fd2c959b/raw/47e5cc85bfd4d051b080b7f12f80e549281e5a50/CLAUDE.md -o ~/.claude/CLAUDE.md
```

Optionally, fix three typos that commenters on the gist pointed out.
This edits only the copy you just downloaded:

```bash
sed -i '' -e 's/Plan Node Default/Plan Mode Default/' -e 's/One tack per subagent/One task per subagent/' -e 's/Minimat Impact/Minimal Impact/' ~/.claude/CLAUDE.md
```

The file is now yours, so edit it to fit how you work.
Inside Claude Code, `/memory` shows the instruction files that are loaded and opens them for editing.
To create a `CLAUDE.md` for one project, run `/init` inside Claude Code in that project.

If you use rtk, from the tools step below, run this afterwards, because the download replaced the `@RTK.md` line that rtk had added:

```bash
rtk init -g
```
