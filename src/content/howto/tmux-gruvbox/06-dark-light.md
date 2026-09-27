---
title: Switch between dark and light
nav: Dark or light
summary: Pick one of the four Gruvbox variants, and tweak the status bar if you like.
sources:
  - label: "tmux-gruvbox: Configuration options"
    url: https://github.com/egel/tmux-gruvbox#configuration-options
---

The theme has four variants.
`dark` and `light` use the exact Gruvbox colors, which relies on the 24-bit color setting from your config.
`dark256` and `light256` use the nearest colors from the older 256-color palette.
Without any setting, the plugin uses `dark256`.
This command backs up your config, switches the variant to `light`, and reloads tmux.
Replace `light` with any of the four names.

```bash
cp ~/.tmux.conf ~/.tmux.conf.bak-$(date +%Y%m%d-%H%M%S)
sed -i '' "s|^set -g @tmux-gruvbox .*|set -g @tmux-gruvbox 'light'|" ~/.tmux.conf
tmux source ~/.tmux.conf
```

The theme also has a few optional settings.
Each one goes in `~/.tmux.conf` above the `run` line, because the theme reads them when TPM loads it.

```bash title="~/.tmux.conf"
# See-through status bar (needs tmux 3.2 or later)
set -g @tmux-gruvbox-statusbar-alpha 'true'

# Left side: the session name (this is the default)
set -g @tmux-gruvbox-left-status-a '#S'

# Right side: date, time and host name (US date format shown)
set -g @tmux-gruvbox-right-status-x '%m/%d/%Y'
set -g @tmux-gruvbox-right-status-y '%H:%M'
set -g @tmux-gruvbox-right-status-z '#h'
```

To add one, open the file in nano, the simple editor that comes with macOS:

```bash
nano ~/.tmux.conf
```

Paste the line above the `run` line, press `Ctrl+O` then Enter to save, and `Ctrl+X` to exit.
Then reload tmux as in the previous step.
