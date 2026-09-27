---
title: Set up tmux with the Gruvbox theme
summary: Split panes, sessions that survive a closed window, and a warm Gruvbox status bar, tuned to work well with Ghostty and Claude Code.
order: 2
platform: macOS on Apple silicon
duration: About 10 minutes
verifiedOn: 2026-09-27
verifiedWith:
  - tmux 3.6b
  - Ghostty 1.3.1
  - macOS 27.0
prerequisites:
  - Homebrew and Git, from the Ghostty guide.
  - Ghostty, also from the Ghostty guide, because the color settings here target it.
sources:
  - label: tmux-gruvbox
    url: https://github.com/egel/tmux-gruvbox
  - label: "TPM: Tmux Plugin Manager"
    url: https://github.com/tmux-plugins/tpm
  - label: "Claude Code: Configure tmux"
    url: https://code.claude.com/docs/en/terminal-config#configure-tmux
---

tmux lets one terminal window hold many shells, split side by side, and keeps them running after you close the window.
This guide installs tmux, adds the Gruvbox theme through the TPM plugin manager, and turns on the settings Claude Code needs inside tmux.
Run every command in Ghostty.
