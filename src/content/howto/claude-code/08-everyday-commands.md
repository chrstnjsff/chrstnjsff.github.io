---
title: Everyday commands and shortcuts
nav: Everyday commands
summary: The short list of commands and keys worth learning first.
sources:
  - label: "Claude Code: Checkpointing"
    url: https://code.claude.com/docs/en/checkpointing
  - label: "Claude Code: Configure your terminal"
    url: https://code.claude.com/docs/en/terminal-config
---

Type `/` in Claude Code to see every command, and `/help` for help.
These are the ones worth learning first.

**Manage the conversation.**
Everything in a conversation takes up room in Claude's context window, its working memory for the session.
These commands keep that room under control.

| Command | What it does |
| --- | --- |
| `/clear` | Start a new conversation with an empty context. The old one stays available in `/resume`. `/reset` and `/new` do the same. |
| `/compact` | Summarize the conversation so far to free up space, and keep going. Add a focus, such as `/compact keep the API decisions`. |
| `/context` | Show what is filling the context window, as a colored grid. |
| `/rewind` | Go back to an earlier point and restore the code, the conversation, or both. Pressing `Esc` twice on an empty prompt opens the same menu. |
| `/btw` | Ask a quick side question without adding it to the conversation. |

**Choose how Claude works.**

| Command | What it does |
| --- | --- |
| `/model` | Pick the model, and save it as your default. |
| `/effort` | Set how hard Claude thinks, from `low` up to `max`. |
| `/init` | Write a starter `CLAUDE.md` for the current project. |
| `/memory` | Open your `CLAUDE.md` files for editing. |
| `/permissions` | See and change which tools Claude may use without asking. |
| `/config` | Open the settings, such as theme and model. |

**Review your changes.**

| Command | What it does |
| --- | --- |
| `/diff` | Show the changes in your working tree, including Claude's edits. |
| `/code-review` | Review the current changes for bugs. |
| `/simplify` | Look for cleanups in the changed code, and apply them. |
| `/security-review` | Check the changes on your branch for security problems. |

**Check on things.**

| Command | What it does |
| --- | --- |
| `/usage` | Show what this session cost and how much of your plan's limits you have used. |
| `/status` | Show the version, model, account and connection. |
| `/doctor` | Run a checkup of your install and settings, which can offer fixes. |

**Keyboard shortcuts.**

| Keys | What it does |
| --- | --- |
| `Esc` | Stop Claude mid-answer so you can redirect it. The work done so far is kept. |
| `Shift+Enter` | Start a new line without sending. It works in Ghostty as is, and inside tmux with the settings from the tmux guide. `Ctrl+J` works everywhere. |
| `!` at the start | Run a shell command yourself, such as `!git status`, and share its output with Claude. |
| `@` | Mention a file by its path, with autocomplete. |
| `Shift+Tab` | Cycle permission modes, including plan mode. |
| `Ctrl+O` | Show the detailed transcript of what Claude did. |
| `Ctrl+R` | Search the prompts you typed before. |
| `Ctrl+G` | Write your prompt in your text editor. |
| `Ctrl+D` twice | Exit Claude Code, like `/exit`. |
