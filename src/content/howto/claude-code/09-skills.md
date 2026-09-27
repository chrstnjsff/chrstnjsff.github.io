---
title: Teach Claude a reusable skill
nav: Skills
summary: A skill is a folder with instructions that Claude loads when it needs them, or when you type its name.
sources:
  - label: "Claude Code: Extend Claude with skills"
    url: https://code.claude.com/docs/en/skills
---

A skill is a `SKILL.md` file with a short description at the top and instructions below.
Claude keeps only the description in mind until a task matches it, then loads the rest, so an unused skill costs just its short description.
Where you save the folder decides where the skill works:

| Location | Works in |
| --- | --- |
| `~/.claude/skills/<name>/SKILL.md` | All your projects |
| `.claude/skills/<name>/SKILL.md` | One project, and anyone you share the repository with |
| A plugin's `skills/` folder | Wherever the plugin is turned on |

This example from the Claude Code docs creates a skill that summarizes your uncommitted changes and flags anything risky.
The `` !`git diff HEAD` `` line runs that command first and pastes its output into the instructions.
The second line backs up an existing skill with the same name.

```bash
mkdir -p ~/.claude/skills/summarize-changes
[ -f ~/.claude/skills/summarize-changes/SKILL.md ] && cp ~/.claude/skills/summarize-changes/SKILL.md ~/.claude/skills/summarize-changes/SKILL.md.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.claude/skills/summarize-changes/SKILL.md <<'EOF'
---
description: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed, wants a commit message, or asks to review their diff.
---

## Current changes

!`git diff HEAD`

## Instructions

Summarize the changes above in two or three bullet points, then list any risks you notice such as missing error handling, hardcoded values, or tests that need updating. If the diff is empty, say there are no uncommitted changes.
EOF
```

Try it in a Git project that has some uncommitted edits.
Either ask a question that matches the description, or type the skill's name:

```text title="In Claude Code"
/summarize-changes
```

`/skills` lists every skill Claude can see.
If Claude Code was already running before you created `~/.claude/skills`, run `/reload-skills` once so it notices the new folder.
