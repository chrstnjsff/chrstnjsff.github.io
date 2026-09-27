---
title: Write your tmux config
nav: tmux.conf
summary: True color in Ghostty, the settings Claude Code needs, and the Gruvbox plugin.
sources:
  - label: "tmux-gruvbox: Install via TPM"
    url: https://github.com/egel/tmux-gruvbox#install-via-tpm-recommended
---

tmux reads its settings from `~/.tmux.conf`.
This command backs up the file you already have, if any, then writes a new one in three parts:

- Color: tells tmux that Ghostty can show full 24-bit color.
- Claude Code: lets notifications reach Ghostty and makes `Shift+Enter` insert a new line, as the Claude Code docs recommend.
- Plugins: loads TPM, the sensible defaults plugin, and the Gruvbox theme, with TPM's `run` line kept at the very bottom.

```bash
[ -f ~/.tmux.conf ] && cp ~/.tmux.conf ~/.tmux.conf.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.tmux.conf <<'EOF'
# 24-bit color inside Ghostty
set -g default-terminal "tmux-256color"
set -as terminal-features ",xterm-ghostty:RGB"

# Claude Code inside tmux: Shift+Enter newlines, notifications, progress bar
# https://code.claude.com/docs/en/terminal-config#configure-tmux
set -g allow-passthrough on
set -s extended-keys on
set -as terminal-features 'xterm*:extkeys'

# Plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'egel/tmux-gruvbox'
set -g @tmux-gruvbox 'dark' # or 'dark256', 'light', 'light256'

# Start TPM (keep this line at the very bottom)
run '~/.tmux/plugins/tpm/tpm'
EOF
```

The first setting needs your Mac to know a terminal type called `tmux-256color`.
This check prints `ok` if it does:

```bash
infocmp tmux-256color >/dev/null && echo ok
```

If it prints an error instead, change `tmux-256color` to `screen-256color` in `~/.tmux.conf`:

```bash
sed -i '' 's|"tmux-256color"|"screen-256color"|' ~/.tmux.conf
```
