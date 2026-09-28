---
title: Shorten the surround keys
nav: Surround
summary: Add and delete quotes and brackets around text with sa and sd.
sources:
  - label: mini.surround
    url: https://github.com/nvim-mini/mini.surround
---

The mini.surround extra adds, deletes and replaces pairs such as quotes and brackets.
All its keys start with `gs` by default.
This shortens the two you will use most to `sa` and `sd`:

```bash
[ -f ~/.config/nvim/lua/plugins/surround.lua ] && cp ~/.config/nvim/lua/plugins/surround.lua ~/.config/nvim/lua/plugins/surround.lua.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/nvim/lua/plugins/surround.lua <<'EOF'
return {
  "nvim-mini/mini.surround",
  opts = {
    mappings = {
      add = "sa",
      delete = "sd",
      find = "gsf",
      find_left = "gsF",
      highlight = "gsh",
      replace = "gsr",
      update_n_lines = "gsn",
    },
  },
}
EOF
```

A few examples, with the cursor on a word:

| Keys | What it does |
| --- | --- |
| `saiw"` | Wrap the word in double quotes |
| `sd"` | Delete the double quotes around the cursor |
| `gsr"'` | Change double quotes to single quotes |
| `saiw)` | Wrap the word in parentheses |

Pressing `s` on its own still starts LazyVim's Flash jump after a short pause.
