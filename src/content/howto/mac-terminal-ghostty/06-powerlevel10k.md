---
title: Install Powerlevel10k
nav: Powerlevel10k
summary: A fast prompt theme that shows your folder, Git branch and more at a glance.
sources:
  - label: "Powerlevel10k: Oh My Zsh install"
    url: https://github.com/romkatv/powerlevel10k#oh-my-zsh
---

Download the theme into Oh My Zsh's folder for custom themes.

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```

Next, switch the `ZSH_THEME` line in `~/.zshrc` to Powerlevel10k.
The first line saves a dated backup, such as `~/.zshrc.bak-20260927-101500`, so you can undo the change.
The last line prints the result.

```bash
cp ~/.zshrc ~/.zshrc.bak-$(date +%Y%m%d-%H%M%S)
sed -i '' 's|^ZSH_THEME=.*|ZSH_THEME="powerlevel10k/powerlevel10k"|' ~/.zshrc
grep '^ZSH_THEME=' ~/.zshrc
```

```text title="Expected output"
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Do not restart your shell yet.
The next step sets Ghostty's font first, so the Powerlevel10k setup wizard can draw its icons.
