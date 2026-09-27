---
title: Set Ghostty's font, size and colors
nav: Font and colors
summary: A few lines of config replace iTerm2's Profiles > Text and Profiles > Colors screens.
sources:
  - label: "Ghostty: Configuration"
    url: https://ghostty.org/docs/config
  - label: "Ghostty: Color themes"
    url: https://ghostty.org/docs/features/theme
  - label: "Claude Code: Option key shortcuts on macOS"
    url: https://code.claude.com/docs/en/terminal-config#enable-option-key-shortcuts-on-macos
---

Ghostty reads its settings from a plain text file, `~/.config/ghostty/config.ghostty`.
First, see what is already in that folder:

```bash
ls ~/.config/ghostty
```

If the folder does not exist yet, that is fine, because the commands below create it.
If you see an older file named just `config`, Ghostty still reads it, and `config.ghostty` wins wherever both set the same option.

Save the coolnight colors as a Ghostty theme.
The colors come from Josean's own Ghostty config.
The first two lines create the themes folder and back up any theme file with the same name.

```bash
mkdir -p ~/.config/ghostty/themes
[ -f ~/.config/ghostty/themes/coolnight ] && cp ~/.config/ghostty/themes/coolnight ~/.config/ghostty/themes/coolnight.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/ghostty/themes/coolnight <<'EOF'
background = #00111E
foreground = #CBE0F0
cursor-color = #47FF9C
cursor-text = #011423
selection-background = #033259
selection-foreground = #CBE0F0
palette = 0=#214969
palette = 1=#E52E2E
palette = 2=#44FFB1
palette = 3=#FFE073
palette = 4=#0FC5ED
palette = 5=#a277ff
palette = 6=#24EAF7
palette = 7=#24EAF7
palette = 8=#214969
palette = 9=#E52E2E
palette = 10=#44FFB1
palette = 11=#FFE073
palette = 12=#A277FF
palette = 13=#a277ff
palette = 14=#24EAF7
palette = 15=#24EAF7
EOF
```

Now write the main config file, after backing up the one you already have, if any.
It sets the font, a font size of 20 as in Josean's iTerm2 setup, the coolnight theme, and some padding.
The last setting makes the Option key act as Alt, which Claude Code's Option shortcuts need.

```bash
[ -f ~/.config/ghostty/config.ghostty ] && cp ~/.config/ghostty/config.ghostty ~/.config/ghostty/config.ghostty.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/ghostty/config.ghostty <<'EOF'
# Font (iTerm2: Profiles > Text)
font-family = "MesloLGS NF"
font-size = 20

# Colors (iTerm2: Profiles > Colors > coolnight)
theme = coolnight

# Space between the text and the window edge
window-padding-x = 10
window-padding-y = 10

# Option works as Alt, which Claude Code shortcuts use
macos-option-as-alt = true
EOF
```

Check the file for mistakes.
No output means it is valid.

```bash
ghostty +validate-config
```

Press `Cmd+Shift+,` to reload the config.
If the font does not change, open a new window with `Cmd+N`.

To preview Ghostty's hundreds of built-in themes, run this command.
Press `F1` inside the preview for help, and `Esc` to close it.

```bash
ghostty +list-themes
```
