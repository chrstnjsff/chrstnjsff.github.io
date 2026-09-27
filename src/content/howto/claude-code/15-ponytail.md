---
title: "ponytail: simpler code"
nav: ponytail
summary: Pushes Claude toward the smallest solution that works, without cutting validation, error handling or security.
optional: true
sources:
  - label: "ponytail on GitHub"
    url: https://github.com/DietrichGebert/ponytail
---

ponytail puts a "lazy senior developer" in Claude's ear: use what the platform or standard library already has, skip features nobody asked for, and write one line instead of fifty.
Its two hooks run with Node.js, so `node` must be on your `PATH`.
Without it, the commands still work, but the always-on mode stays off.
This installs Node with Homebrew only if it is missing:

```bash
node --version || brew install node
```

Then, inside Claude Code, send these as two separate prompts:

```text title="In Claude Code"
/plugin marketplace add DietrichGebert/ponytail
```

```text title="In Claude Code"
/plugin install ponytail@ponytail
```

Set how strict it is with `lite`, `full` or `ultra`, or turn it `off`.
`full` is the default, and `/ponytail` on its own shows the current level.

```text title="In Claude Code"
/ponytail lite
```

It also adds these commands:

- `/ponytail-review` reviews your current changes for over-engineering and hands back a list of things to delete.
- `/ponytail-audit` does the same for the whole repository.
- `/ponytail-debt` collects the shortcuts marked for later into one list.
- `/ponytail-gain` shows the project's benchmark results.
- `/ponytail-help` is a quick reference.

To start every session at a different level, set `PONYTAIL_DEFAULT_MODE`.
This adds it to `~/.zshrc` only if it is not there yet:

```bash
grep -q 'PONYTAIL_DEFAULT_MODE' ~/.zshrc || echo 'export PONYTAIL_DEFAULT_MODE=lite' >> ~/.zshrc
```
