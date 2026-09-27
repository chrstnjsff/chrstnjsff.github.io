---
title: "caveman: shorter answers"
nav: caveman
summary: Makes Claude answer in terse caveman-speak to use fewer tokens, without shortening code or error messages.
optional: true
sources:
  - label: "caveman on GitHub"
    url: https://github.com/JuliusBrussee/caveman
---

caveman changes how Claude talks, not what it writes: replies drop the filler, while code, commands and exact error messages stay intact.
Its hooks run with Node.js.
The first line installs Node with Homebrew only if it is missing, and the second installs the plugin.

```bash
node --version || brew install node
claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman
```

Choose how terse Claude gets, from `lite` to `ultra`, where `full` is the default:

```text title="In Claude Code"
/caveman lite
```

Turn it off again:

```text title="In Claude Code"
/caveman off
```

Saying "stop caveman" or "normal mode" also works.
It comes with a few more commands:

- `/caveman-commit` writes a short commit message.
- `/caveman-review` reviews code with one finding per line.
- `/caveman-compress CLAUDE.md` shrinks a memory file and backs up the original first.

The project also offers an optional `caveman` command line proxy that compresses what Claude reads.
**Review before installing it:** unlike the plugin, that proxy sends anonymous usage statistics by default.
If you install it, turn them off:

```bash
caveman telemetry off
```
