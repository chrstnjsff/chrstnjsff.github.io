---
title: Install Neovim and its helpers
nav: Install
summary: Neovim itself, plus the search, Git and parser tools LazyVim uses.
sources:
  - label: "LazyVim: Requirements"
    url: https://lazyvim.github.io/
---

Install Neovim and the command line tools LazyVim relies on:

```bash
brew install neovim ripgrep fd fzf lazygit tree-sitter-cli
```

What each one does:

- `neovim` is the editor. You start it with `nvim`.
- `ripgrep` and `fd` power the search across file contents and file names.
- `fzf` is a fuzzy finder that LazyVim's health check looks for.
- `lazygit` is a full Git screen you can open inside Neovim.
- `tree-sitter-cli` builds the parsers behind accurate syntax highlighting, using the C compiler that came with Homebrew.

Check the version:

```bash
nvim --version | head -1
```

```text title="Expected output (yours may be newer)"
NVIM v0.12.5
```

LazyVim needs Neovim 0.11.2 or newer.
