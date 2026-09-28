---
title: Set your options and keys
nav: Options and keys
summary: Wrap long lines, fold only when you ask, hide the tab line, and type jj or jk to leave insert mode.
sources:
  - label: "LazyVim: Options"
    url: https://lazyvim.github.io/configuration/general
---

LazyVim loads your own options from `lua/config/options.lua`.
Add three to the end of it:

```bash
grep -q 'showtabline = 0' ~/.config/nvim/lua/config/options.lua || cat >> ~/.config/nvim/lua/config/options.lua <<'EOF'

vim.opt.wrap = true -- wrap long lines instead of scrolling sideways
vim.opt.foldmethod = "manual" -- fold only when you ask, with zf
vim.opt.showtabline = 0 -- never show the tab line at the top
EOF
```

In files it understands, LazyVim switches folding to follow the structure of the code, which would override the manual setting.
This file stops that, so folds appear only where you make them:

```bash
[ -f ~/.config/nvim/lua/plugins/folds.lua ] && cp ~/.config/nvim/lua/plugins/folds.lua ~/.config/nvim/lua/plugins/folds.lua.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/nvim/lua/plugins/folds.lua <<'EOF'
-- Keep foldmethod = "manual" in every file
return {
  { "nvim-treesitter/nvim-treesitter", opts = { folds = { enable = false } } },
  { "neovim/nvim-lspconfig", opts = { folds = { enabled = false } } },
}
EOF
```

Next, make `jj` and `jk` leave insert mode, so you can keep your hands on the home row instead of reaching for `Esc`:

```bash
grep -q '"jj"' ~/.config/nvim/lua/config/keymaps.lua || cat >> ~/.config/nvim/lua/config/keymaps.lua <<'EOF'

-- Leave insert mode by typing jj or jk
vim.keymap.set("i", "jj", "<Esc>", { desc = "Leave insert mode" })
vim.keymap.set("i", "jk", "<Esc>", { desc = "Leave insert mode" })
EOF
```

The `grep -q` checks skip each append if it is already there, so running them twice is safe.
