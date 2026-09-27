---
title: Install Oh My Zsh
nav: Oh My Zsh
summary: A framework that manages your zsh settings, themes and plugins.
sources:
  - label: Oh My Zsh
    url: https://ohmyz.sh
---

Oh My Zsh takes over your shell settings file, `~/.zshrc`.
If you already have one, the installer saves it as `~/.zshrc.pre-oh-my-zsh` before writing a new one.

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

When it finishes, it starts a fresh zsh with a new prompt.
