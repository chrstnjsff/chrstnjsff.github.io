---
title: Install the zsh plugins
nav: zsh plugins
summary: Suggestions from your history as you type, and colors that flag typos before you press Enter.
sources:
  - label: zsh-autosuggestions
    url: https://github.com/zsh-users/zsh-autosuggestions
  - label: zsh-syntax-highlighting
    url: https://github.com/zsh-users/zsh-syntax-highlighting
---

Download two popular plugins into Oh My Zsh's folder for custom plugins.

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Now turn them on.
This backs up `~/.zshrc`, replaces its `plugins=(...)` line, and restarts the shell.

```bash
cp ~/.zshrc ~/.zshrc.bak-$(date +%Y%m%d-%H%M%S)
sed -i '' 's|^plugins=(.*)|plugins=(git zsh-autosuggestions zsh-syntax-highlighting web-search)|' ~/.zshrc
exec zsh
```

Here is what each plugin does:

- `git` adds short aliases for common Git commands, and comes with Oh My Zsh.
- `zsh-autosuggestions` shows a grey suggestion from your history as you type, and the right arrow key accepts it.
- `zsh-syntax-highlighting` colors a command as you type it, so a misspelled command stands out before you run it.
- `web-search` lets you search the web from the terminal, and also comes with Oh My Zsh.

Try the last one, which opens a Google search in your browser:

```bash
google ghostty terminal
```

This guide restarts the shell with `exec zsh` instead of `source ~/.zshrc`, because the Powerlevel10k docs warn that sourcing `~/.zshrc` again can cause odd problems.
