---
title: Install the MesloLGS NF font
nav: Nerd Font
summary: The font Powerlevel10k expects, with the icons it draws in your prompt.
sources:
  - label: "Powerlevel10k: Meslo Nerd Font"
    url: https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k
---

Powerlevel10k draws small icons in your prompt, and those icons need a special font called MesloLGS NF.
In iTerm2 its setup wizard can install the font for you, but not in Ghostty, so install it with Homebrew instead.

```bash
brew install --cask font-meslo-for-powerlevel10k
```

This installs four font files: Regular, Bold, Italic and Bold Italic.
Check that Ghostty can see them:

```bash
ghostty +list-fonts | grep "MesloLGS NF"
```

```text title="Expected output"
MesloLGS NF
  MesloLGS NF Bold
  MesloLGS NF Bold Italic
  MesloLGS NF Italic
  MesloLGS NF Regular
```
