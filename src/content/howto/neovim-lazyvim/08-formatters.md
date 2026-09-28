---
title: Format YAML for Kubernetes and Terraform with OpenTofu
nav: Formatters
summary: yamlfmt for YAML that matches Kubernetes manifests, and tofu fmt and tofu validate for Terraform files.
sources:
  - label: conform.nvim
    url: https://github.com/stevearc/conform.nvim
  - label: nvim-lint
    url: https://github.com/mfussenegger/nvim-lint
  - label: "yamlfmt: Configuration"
    url: https://github.com/google/yamlfmt/blob/main/docs/config-file.md
---

LazyVim formats a file every time you save it.
The YAML extra's default formatter indents list items under their parent key, which Kubernetes manifests usually do not.
This switches YAML to yamlfmt with lists kept flush with their key:

```bash
[ -f ~/.config/nvim/lua/plugins/conform.lua ] && cp ~/.config/nvim/lua/plugins/conform.lua ~/.config/nvim/lua/plugins/conform.lua.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/nvim/lua/plugins/conform.lua <<'EOF'
return {
  "stevearc/conform.nvim",
  opts = {
    formatters_by_ft = {
      yaml = { "yamlfmt" }, -- Kubernetes-friendly YAML
    },
    formatters = {
      yamlfmt = {
        -- lists flush with their key, as kubectl writes them
        prepend_args = { "-formatter", "indentless_arrays=true" },
      },
    },
  },
}
EOF
```

The Terraform extra formats and checks files with the `terraform` program.
This points both at OpenTofu instead:

```bash
[ -f ~/.config/nvim/lua/plugins/opentofu.lua ] && cp ~/.config/nvim/lua/plugins/opentofu.lua ~/.config/nvim/lua/plugins/opentofu.lua.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/nvim/lua/plugins/opentofu.lua <<'EOF'
return {
  {
    "stevearc/conform.nvim",
    opts = {
      formatters_by_ft = {
        terraform = { "tofu_fmt" },
        tf = { "tofu_fmt" },
        ["terraform-vars"] = { "tofu_fmt" },
      },
    },
  },
  {
    "mfussenegger/nvim-lint",
    opts = {
      linters_by_ft = {
        terraform = { "tofu" },
        tf = { "tofu" },
      },
    },
  },
}
EOF
```

Go needs nothing extra: the Go extra already turns on gofumpt formatting, automatic imports and staticcheck in gopls.
To format without saving, press `Space` then `c` then `f`.
