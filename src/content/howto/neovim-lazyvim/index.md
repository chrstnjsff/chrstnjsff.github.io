---
title: Set up Neovim with LazyVim
summary: Turn Neovim into a full editor with LazyVim, with support for Go, TypeScript, Terraform, Docker, Helm and YAML, a transparent Tokyo Night theme, and Claude Code one key away.
order: 6
platform: macOS on Apple silicon
duration: About 20 minutes
verifiedOn: 2026-09-28
verifiedWith:
  - Neovim 0.12.5
  - LazyVim 16.0.1
  - macOS 27.0
prerequisites:
  - Homebrew and Git, from the Ghostty guide.
  - Ghostty, also from the Ghostty guide. It ships with the Nerd Font icons LazyVim draws, so you need no extra font.
  - Claude Code, from the Claude Code guide, but only for the optional Claude Code step.
sources:
  - label: "LazyVim: Installation"
    url: https://lazyvim.github.io/installation
  - label: "LazyVim: Extras"
    url: https://lazyvim.github.io/extras
  - label: "LazyVim: Keymaps"
    url: https://lazyvim.github.io/keymaps
  - label: Neovim
    url: https://neovim.io/
---

Neovim is a fast, keyboard-driven text editor that runs in your terminal.
LazyVim is a ready-made Neovim setup that adds a file explorer, fuzzy search, code completion, language servers and Git tools, and stays easy to change.
This guide installs both and turns on support for Go, TypeScript, Terraform, Docker, Helm, JSON and YAML.
It then adds a few personal touches: a transparent Tokyo Night theme, `jj` to leave insert mode, a Kubernetes-friendly YAML formatter, and Claude Code in a split.
Run every command in Ghostty.
