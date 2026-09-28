---
title: Daily checklist
nav: Checklist
summary: The whole guide on one screen, to keep next to your terminal.
---

**Once:**

- Make Sonnet your default with `/model sonnet`.
- Add the status line from the usage step.
- Trim `CLAUDE.md` to under 200 lines, moving workflows to skills and area rules to `.claude/rules/`.
- Turn off MCP servers, skills and plugins you do not use, with `/mcp` and `/skill-doctor`.
- Block generated folders with `Read` deny rules in `.claude/settings.json`.
- Install the code intelligence plugin for your language.

**Every task:**

- One task per conversation, with `/clear` in between.
- Name the files with `@path` and say how to check the result.
- Plan big changes first: `Shift+Tab` to plan mode.
- Press `Esc` as soon as it goes wrong, then `/rewind`.
- After an hour away, write a handoff note and `/clear`.
- Ask side questions with `/btw`.

**Every week:**

- Run `/usage` and press `w` to see what used your limit.
- Remove the plugins, skills and MCP servers that take a big share without paying for themselves.
