---
title: tmux cheat sheet
nav: Cheat sheet
summary: The handful of keys and commands you will use every day.
sources:
  - label: "tmux wiki: Getting started"
    url: https://github.com/tmux/tmux/wiki/Getting-Started
---

Every tmux shortcut starts with the prefix, `Ctrl+b`.
Press and release it, then press the next key.

| Keys | What it does |
| --- | --- |
| `Ctrl+b` then `%` | Split the pane into left and right |
| `Ctrl+b` then `"` | Split the pane into top and bottom |
| `Ctrl+b` then an arrow key | Move to the pane in that direction |
| `Ctrl+b` then `z` | Zoom the current pane to full size, or back |
| `Ctrl+b` then `x` | Close the current pane, after you confirm with `y` |
| `Ctrl+b` then `c` | Open a new window, like a tab |
| `Ctrl+b` then `n` or `p` | Go to the next or previous window |
| `Ctrl+b` then a number | Go to that window |
| `Ctrl+b` then `d` | Detach, leaving everything running in the background |

After you detach or close Ghostty, your session keeps running.
List your sessions:

```bash
tmux ls
```

Reattach to the one named `main`:

```bash
tmux attach -t main
```

When Claude Code runs inside tmux, its `Ctrl+B` shortcut, which sends a running task to the background, needs two presses, because tmux takes the first one as its prefix.
