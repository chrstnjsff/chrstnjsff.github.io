---
title: Open Claude Code inside Neovim
nav: Claude Code
summary: Turn on LazyVim's Claude Code extra to run Claude in a split that sees your open files and selections.
optional: true
sources:
  - label: "LazyVim: Claude Code extra"
    url: https://lazyvim.github.io/extras/ai/claudecode
  - label: claudecode.nvim
    url: https://github.com/coder/claudecode.nvim
---

This step needs Claude Code, from the Claude Code guide.
LazyVim has an extra for it, built on the claudecode.nvim plugin.
Turn it on from inside Neovim:

1. Type `:LazyExtras` and press `Enter`.
2. Type `/claudecode` and press `Enter` to jump to `ai.claudecode`.
3. Press `x` to turn it on, then `q` to close the window.
4. Quit with `:qa` and start `nvim` again.

Every Claude key starts with `Space` then `a`:

| Keys | What it does |
| --- | --- |
| `Space` `a` `c` | Open or close Claude in a split |
| `Space` `a` `f` | Move the cursor into Claude's split |
| `Space` `a` `b` | Add the current file to the conversation |
| `Space` `a` `s` | Send the selected lines, in visual mode |
| `Space` `a` `r` | Pick an earlier conversation to resume |
| `Space` `a` `a` | Accept the change Claude proposes |
| `Space` `a` `d` | Reject the change Claude proposes |

When Claude wants to edit a file, Neovim shows the change as a side-by-side diff, and nothing is saved until you accept it.
