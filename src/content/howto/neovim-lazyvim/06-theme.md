---
title: Make Tokyo Night transparent and drop the buffer tabs
nav: Theme
summary: Tokyo Night with a see-through background, so your Ghostty colors show through, and no row of open files along the top.
sources:
  - label: tokyonight.nvim
    url: https://github.com/folke/tokyonight.nvim
---

LazyVim already uses the Tokyo Night theme.
This makes its background, side panels and pop-ups transparent, so the editor sits on your Ghostty background.
It also turns off bufferline, the row of open files along the top:

```bash
[ -f ~/.config/nvim/lua/plugins/colorscheme.lua ] && cp ~/.config/nvim/lua/plugins/colorscheme.lua ~/.config/nvim/lua/plugins/colorscheme.lua.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/nvim/lua/plugins/colorscheme.lua <<'EOF'
return {
  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "tokyonight",
    },
  },
  {
    "folke/tokyonight.nvim",
    opts = {
      transparent = true,
      styles = {
        sidebars = "transparent",
        floats = "transparent",
      },
    },
  },
}
EOF
[ -f ~/.config/nvim/lua/plugins/bufferline.lua ] && cp ~/.config/nvim/lua/plugins/bufferline.lua ~/.config/nvim/lua/plugins/bufferline.lua.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/nvim/lua/plugins/bufferline.lua <<'EOF'
return {
  { "akinsho/bufferline.nvim", enabled = false },
}
EOF
```

Without the tabs you still switch between open files with `Shift+H` and `Shift+L`, or pick one from a list with `Space` then `,`.
