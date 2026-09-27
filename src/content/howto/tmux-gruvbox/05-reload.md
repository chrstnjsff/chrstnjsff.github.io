---
title: Reload after you edit the config
nav: Reload
summary: Apply changes to ~/.tmux.conf without closing tmux.
---

tmux reads `~/.tmux.conf` when it starts.
After you change the file, run this inside tmux to apply the change right away:

```bash
tmux source ~/.tmux.conf
```

If you add a new `@plugin` line, press `Ctrl+b` then `Shift+i` again to download it.
