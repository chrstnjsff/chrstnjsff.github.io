---
title: Neovim cheat sheet
nav: Cheat sheet
summary: The keys you will use every day in this setup.
sources:
  - label: "LazyVim: Keymaps"
    url: https://lazyvim.github.io/keymaps
---

LazyVim's leader key is `Space`.
Press it and wait, and a menu shows every key that can follow.

| Keys | What it does |
| --- | --- |
| `jj` or `jk` | Leave insert mode |
| `Space` `Space` | Find a file by name |
| `Space` `/` | Search the text of every file |
| `Space` `e` | Open or close the file explorer |
| `Space` `f` `m` | Browse the current folder with mini.files |
| `Space` `,` | Switch between open files |
| `Shift+H` / `Shift+L` | Previous or next open file |
| `Space` `H` | Pin the current file to Harpoon |
| `Space` `h` | Show your pinned files |
| `Space` `1` to `9` | Jump to pinned file 1 to 9 |
| `g` `d` | Go to where a name is defined |
| `K` | Show the documentation for the name under the cursor |
| `Space` `c` `a` | Show fixes and code actions |
| `Space` `c` `f` | Format the file |
| `Space` `g` `g` | Open lazygit |
| `Space` `d` `b` | Set a breakpoint |
| `Space` `d` `c` | Start or continue debugging |
| `Space` `s` `k` | Search every key binding |
| `Space` `q` `q` | Quit Neovim |

To change anything later, edit the files in `~/.config/nvim/lua/`, then restart Neovim.
