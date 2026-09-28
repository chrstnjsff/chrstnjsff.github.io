---
title: Install the language tools
nav: Language tools
summary: Go, Node.js, yamlfmt and OpenTofu, which the language support calls behind the scenes.
sources:
  - label: "LazyVim: Go extra"
    url: https://lazyvim.github.io/extras/lang/go
  - label: yamlfmt
    url: https://github.com/google/yamlfmt
  - label: OpenTofu
    url: https://opentofu.org/
---

LazyVim installs language servers for you, but it builds some of them with Go or Node.js, and two formatters in this setup run their own programs.
Install all four:

```bash
brew install go node yamlfmt opentofu
```

- `go` lets LazyVim install gopls, the Go language server, along with the Go formatters and debugger.
- `node` lets it install the TypeScript, JSON, YAML and Docker language servers.
- `yamlfmt` formats YAML the way Kubernetes manifests are usually written.
- `opentofu` provides `tofu fmt` and `tofu validate` for your Terraform files.

If you already have Node.js from another installer, such as nvm or fnm, leave `node` out of the command.
