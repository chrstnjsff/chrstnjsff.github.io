---
title: Install the LazyVim starter
nav: LazyVim
summary: Back up any Neovim setup you already have, then copy LazyVim's starter config into place.
sources:
  - label: "LazyVim: Installation"
    url: https://lazyvim.github.io/installation
  - label: LazyVim starter
    url: https://github.com/LazyVim/starter
---

Neovim keeps its settings in `~/.config/nvim`, and its plugins, history and cache in three more folders.
This moves any of them that already exist aside, with the date in the name, so nothing is lost:

```bash
stamp=$(date +%Y%m%d-%H%M%S)
for d in ~/.config/nvim ~/.local/share/nvim ~/.local/state/nvim ~/.cache/nvim; do
  [ -e "$d" ] && mv "$d" "$d.bak-$stamp"
done
```

Now copy the starter config, then delete its Git history so the config is yours to change and track:

```bash
git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
```

Do not start Neovim yet.
The next steps finish the config first, so the first start installs everything in one go.
