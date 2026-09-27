---
title: Set up a Mac terminal with Ghostty
summary: Ghostty, Oh My Zsh, Powerlevel10k, a Nerd Font, and the coolnight colors, with every command ready to paste.
order: 1
platform: macOS on Apple silicon
duration: About 20 minutes
verifiedOn: 2026-09-27
verifiedWith:
  - Ghostty 1.3.1
  - macOS 27.0
prerequisites:
  - A Mac with Apple silicon and an admin account.
  - About 1 GB of free disk space for Homebrew and its tools.
sources:
  - label: "Josean Martinez: How to set up your Mac terminal"
    url: https://www.josean.com/posts/terminal-setup
  - label: "Josean Martinez: Ghostty config (coolnight colors)"
    url: https://github.com/josean-dev/dev-environment-files/blob/main/ghostty/.config/ghostty/config.ghostty
  - label: Ghostty documentation
    url: https://ghostty.org/docs
---

This guide follows Josean Martinez's popular terminal setup, with one change: it uses Ghostty instead of iTerm2.
Ghostty is a fast, native macOS terminal that is configured with a plain text file, so every iTerm2 menu step becomes a few lines of config.
Paste each block into your terminal one at a time, and wait for it to finish before moving on.
