---
title: Add fzf, fd, eza and zoxide
nav: Extra tools
summary: Fuzzy search, a faster find, a nicer ls, and a cd that learns your favorite folders.
optional: true
sources:
  - label: "Josean Martinez: 7 amazing CLI tools"
    url: https://www.josean.com/posts/7-amazing-cli-tools
---

These four tools come from Josean's follow-up post on command line tools.
Install them with Homebrew:

```bash
brew install fzf fd eza zoxide
```

Next, add their settings to the end of `~/.zshrc`, then restart the shell.
The `grep -q` check skips the append if the block is already there, so running this twice is safe.

```bash
grep -q '# ---- FZF -----' ~/.zshrc || cat >> ~/.zshrc <<'EOF'

# ---- FZF -----
eval "$(fzf --zsh)"
export FZF_DEFAULT_COMMAND="fd --hidden --strip-cwd-prefix --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_ALT_C_COMMAND="fd --type=d --hidden --strip-cwd-prefix --exclude .git"

# ---- Eza (better ls) -----
alias ls="eza --color=always --long --git --no-filesize --icons=always --no-time --no-user --no-permissions"

# ---- Zoxide (better cd) ----
eval "$(zoxide init zsh)"
EOF
exec zsh
```

What you get:

- `Ctrl+R` searches your command history with fzf.
- `Ctrl+T` finds a file and pastes its path into the command you are typing.
- `Option+C` picks a folder and moves into it, which works because your Ghostty config makes Option act as Alt.
- `ls` now shows icons and Git status for each file, thanks to eza.
- `z` jumps to a folder you visited before when you type part of its name, thanks to zoxide.

For example, after you have visited a folder called `projects` once, this jumps straight back to it from anywhere:

```bash
z proj
```
