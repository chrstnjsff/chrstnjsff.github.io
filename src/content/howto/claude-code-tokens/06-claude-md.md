---
title: Keep CLAUDE.md short
nav: Short CLAUDE.md
summary: Everything in CLAUDE.md is sent with every request, so keep it to what Claude cannot work out on its own.
sources:
  - label: "Claude Code: Move instructions from CLAUDE.md to skills"
    url: https://code.claude.com/docs/en/costs#move-instructions-from-claude-md-to-skills
  - label: "Claude Code: How Claude remembers your project"
    url: https://code.claude.com/docs/en/memory
---

`CLAUDE.md` loads at the start of every session and rides along with every request after that.
So do the files it imports with `@path`, such as `@docs/style.md`.
Anthropic recommends keeping each `CLAUDE.md` under 200 lines.

Count the lines in your personal file and the current project's file:

```bash
wc -l ~/.claude/CLAUDE.md CLAUDE.md .claude/CLAUDE.md 2>/dev/null
```

Keep what Claude cannot work out by reading the code:

- The commands to build, test and run the project.
- Conventions that differ from the usual, such as "use pnpm, not npm".
- Traps, such as "the staging database is shared, never reset it".

Move everything else out:

- **Step-by-step workflows**, such as releasing or writing a migration, become [skills](/how-to/claude-code/#skills).
  Only a skill's one-line description loads at the start, and the rest loads when the skill is used.
- **Rules for one part of the code**, such as the API folder, become [rules with `paths`](/how-to/claude-code/#rules), which load only when Claude opens a matching file.
- **Anything Claude can see in the code**, such as the folder layout or the framework you use, can go.

`/context` shows how much room your memory files take, so you can check the result.
