---
title: Reach your notes from any project
nav: Other projects
summary: Give a coding session access to your vault and its CLAUDE.md, so Claude can read your notes while it works.
sources:
  - label: "Claude Code: Working directories"
    url: https://code.claude.com/docs/en/permissions#working-directories
  - label: "Claude Code: Load from additional directories"
    url: https://code.claude.com/docs/en/memory#load-from-additional-directories
---

A session normally sees only the folder you start it in.
`--add-dir` gives it your vault as well, and the variable in front makes Claude also read the vault's `.claude/CLAUDE.md`, so it follows your note rules there:

```bash
cd ~/path/to/your/project
CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1 claude --add-dir ~/Notes
```

To save typing, add a `claude-notes` shortcut to `~/.zshrc`, only if it is not there yet.
It works in new terminal windows.

```bash
grep -q 'alias claude-notes=' ~/.zshrc || echo "alias claude-notes='CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1 claude --add-dir ~/Notes'" >> ~/.zshrc
```

Then, inside any project:

```text title="In Claude Code"
Read my notes in ~/Notes about this project and turn the open questions into a plan.
```

```text title="In Claude Code"
Write a note in ~/Notes that explains how we fixed this bug, and link it to [[Kitchen renovation]].
```

In a session that is already open, `/add-dir ~/Notes` adds the vault without restarting.
The permission rules from the permissions step apply only when you start Claude inside `~/Notes`, so from other projects it asks before each `obsidian` command.
