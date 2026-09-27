---
title: Create a subagent for focused jobs
nav: Subagents
summary: A helper with its own instructions, tools and context window, so side work stays out of your main conversation.
sources:
  - label: "Claude Code: Create custom subagents"
    url: https://code.claude.com/docs/en/sub-agents
---

A subagent is a Markdown file that describes a specialist, such as a code reviewer.
Claude hands it a task, the subagent works in its own context window, and only its summary comes back to your conversation.

Subagents live in `~/.claude/agents/` for all your projects, or `.claude/agents/` for one project.
Only `name` and `description` are required.
Optional settings include `tools` to limit what it can use, `model` to pick a model, `permissionMode`, `skills` to preload, `isolation: worktree` to give it its own copy of the repository, and `color`.

This creates a read-only code reviewer that runs on the Sonnet model, after backing up any file with the same name:

```bash
mkdir -p ~/.claude/agents
[ -f ~/.claude/agents/code-reviewer.md ] && cp ~/.claude/agents/code-reviewer.md ~/.claude/agents/code-reviewer.md.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.claude/agents/code-reviewer.md <<'EOF'
---
name: code-reviewer
description: Reviews code for quality and best practices. Use after writing or changing code.
tools: Read, Glob, Grep
model: sonnet
---
You are a senior code reviewer. Review the changed files for correctness, readability, and security. Report findings as a prioritized list with file and line references.
EOF
```

Ask for it by name:

```text title="In Claude Code"
Use the code-reviewer subagent to review my changes
```

To make sure that exact subagent runs, type `@`, pick `code-reviewer (agent)` from the list, and add your request.

Since version 2.1.198, `/agents` no longer opens an editor.
Edit the files yourself, or ask Claude to write one for you.
Claude Code notices new and changed files within a few seconds, but if `~/.claude/agents` did not exist when the session started, restart Claude Code once.
