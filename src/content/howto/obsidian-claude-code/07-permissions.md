---
title: Let Claude search without asking
nav: Permissions
summary: Pre-approve the obsidian commands that only read, and keep a prompt for everything else.
sources:
  - label: "Claude Code: Configure permissions"
    url: https://code.claude.com/docs/en/permissions
---

Claude Code asks before it runs any command.
For the `obsidian` commands that only read your vault, that gets old fast, so this step approves them in the vault's `.claude/settings.json`.

Commands that change or send notes still ask first.
That includes `create`, `move` and `delete`, the `sync` and `publish` commands that upload to Obsidian's services, and `eval`, which runs code inside Obsidian.

This installs `jq`, backs up the settings file if you have one, and merges the rules into it:

```bash
brew install jq
mkdir -p ~/Notes/.claude
f=~/Notes/.claude/settings.json
[ -f "$f" ] && cp "$f" "$f.bak-$(date +%Y%m%d-%H%M%S)"
[ -f "$f" ] || echo '{}' > "$f"
jq '.permissions.allow = ((.permissions.allow // []) + [
  "Bash(obsidian search *)",
  "Bash(obsidian search:context *)",
  "Bash(obsidian read *)",
  "Bash(obsidian backlinks *)",
  "Bash(obsidian links *)",
  "Bash(obsidian tags *)",
  "Bash(obsidian tasks *)",
  "Bash(obsidian unresolved *)",
  "Bash(obsidian files *)"
] | unique)' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
```

Rules in a project's `.claude/settings.json` take effect after you trust that folder, which the next step does.
Inside Claude Code, `/permissions` lists every rule in effect.
