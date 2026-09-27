---
title: Match Ghostty's colors to Gruvbox
nav: Match Ghostty
summary: Switch Ghostty to its built-in Gruvbox themes, which follow your Mac's light or dark mode.
optional: true
sources:
  - label: "Ghostty: Separate light and dark themes"
    url: https://ghostty.org/docs/features/theme#separate-light-and-dark-themes
---

Ghostty ships with Gruvbox themes, so the whole window can match the tmux status bar.
This replaces the coolnight colors from the Ghostty guide.

This command backs up your Ghostty config, then points its `theme` line at Gruvbox Dark in dark mode and Gruvbox Light in light mode.
If the file has no `theme` line yet, it adds one instead.

```bash
f=~/.config/ghostty/config.ghostty
mkdir -p ~/.config/ghostty && touch "$f"
cp "$f" "$f.bak-$(date +%Y%m%d-%H%M%S)"
if grep -q '^theme = ' "$f"; then
  sed -i '' 's|^theme = .*|theme = dark:Gruvbox Dark,light:Gruvbox Light|' "$f"
else
  echo 'theme = dark:Gruvbox Dark,light:Gruvbox Light' >> "$f"
fi
ghostty +validate-config
```

The `theme` line in your config now reads:

```ini title="~/.config/ghostty/config.ghostty"
theme = dark:Gruvbox Dark,light:Gruvbox Light
```

Press `Cmd+Shift+,` to reload Ghostty.
For an exact match, use the tmux `dark` variant with Gruvbox Dark: both use the same `#282828` background.
Ghostty follows your Mac's appearance on its own, but tmux does not, so switch the tmux variant to `light` yourself when you use light mode.
