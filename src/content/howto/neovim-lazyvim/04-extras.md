---
title: Turn on the language extras
nav: Extras
summary: Go, TypeScript, Terraform, Docker, Helm, JSON and YAML support, plus a debugger, Harpoon, mini.files and mini.surround.
sources:
  - label: "LazyVim: Extras"
    url: https://lazyvim.github.io/extras
---

LazyVim keeps optional features, called extras, switched off until you ask for them.
You can pick them one at a time with the `:LazyExtras` command, which saves your choices to `lazyvim.json`.
Writing that file yourself turns them all on at once:

```bash
[ -f ~/.config/nvim/lazyvim.json ] && cp ~/.config/nvim/lazyvim.json ~/.config/nvim/lazyvim.json.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.config/nvim/lazyvim.json <<'EOF'
{
  "extras": [
    "lazyvim.plugins.extras.coding.mini-surround",
    "lazyvim.plugins.extras.dap.core",
    "lazyvim.plugins.extras.editor.harpoon2",
    "lazyvim.plugins.extras.editor.mini-files",
    "lazyvim.plugins.extras.lang.docker",
    "lazyvim.plugins.extras.lang.go",
    "lazyvim.plugins.extras.lang.helm",
    "lazyvim.plugins.extras.lang.json",
    "lazyvim.plugins.extras.lang.terraform",
    "lazyvim.plugins.extras.lang.typescript",
    "lazyvim.plugins.extras.lang.yaml"
  ],
  "install_version": 8,
  "version": 8
}
EOF
```

What you get:

- `coding.mini-surround`: keys to add, change and delete quotes and brackets around text.
- `dap.core`: a debugger with breakpoints and step-through.
- `editor.harpoon2`: pin a handful of files and jump between them with one key.
- `editor.mini-files`: a file browser you edit like a normal text buffer.
- `lang.docker`: Dockerfile and Compose language servers, plus the hadolint linter.
- `lang.go`: gopls, gofumpt, goimports and the Delve debugger.
- `lang.helm`: Helm chart templates.
- `lang.json`: JSON with schema checks.
- `lang.terraform`: the Terraform language server and the tflint linter.
- `lang.typescript`: the TypeScript and JavaScript language server.
- `lang.yaml`: YAML with schema checks, including Kubernetes manifests.

The two version numbers tell LazyVim this is a fresh install, so it uses its current defaults for file search and the file explorer.
