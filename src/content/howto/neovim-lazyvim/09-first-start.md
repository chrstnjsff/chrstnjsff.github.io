---
title: Start Neovim for the first time
nav: First start
summary: LazyVim installs every plugin, language server and parser on its own, then a health check confirms it all works.
sources:
  - label: "LazyVim: Installation"
    url: https://lazyvim.github.io/installation
  - label: mason.nvim
    url: https://github.com/mason-org/mason.nvim
---

Start Neovim:

```bash
nvim
```

The first start takes a minute or two.
A window lists each plugin as it installs.
When it finishes, press `q` to close it.
Mason, LazyVim's installer for language servers and formatters, keeps working in the background and reports each tool in the corner as it lands.

Once the messages stop, quit with `:qa` and start `nvim` again, so everything loads cleanly.
Then check that LazyVim has what it needs:

```text
:checkhealth lazyvim
```

Every line should start with OK.
To see the language tools Mason installed, open its window with `:Mason`, and press `q` to close it.
