---
title: Check your setup
nav: Check it
summary: Three quick checks that confirm everything is wired up.
---

Run each check in a Ghostty window.
First, confirm that you are really in Ghostty:

```bash
echo $TERM
```

```text title="Expected output"
xterm-ghostty
```

Inside tmux, from the next guide, this prints `tmux-256color` instead, which is also correct.

Next, confirm that the Ghostty config has no mistakes.
No output means it is valid.

```bash
ghostty +validate-config
```

Finally, confirm that the theme and plugins lines in `~/.zshrc` are set:

```bash
grep -E '^(ZSH_THEME|plugins)=' ~/.zshrc
```

```text title="Expected output"
ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(git zsh-autosuggestions zsh-syntax-highlighting web-search)
```
