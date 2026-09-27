---
title: "rtk: smaller command output"
nav: rtk
summary: Trims the output of commands like git status and test runs before Claude reads it, which saves tokens.
optional: true
sources:
  - label: "rtk on GitHub"
    url: https://github.com/rtk-ai/rtk
---

rtk, short for Rust Token Killer, is a command line proxy that filters noisy output down to what matters.
A hook rewrites Claude's shell commands for you, so `git status` quietly becomes `rtk git status`.

Install it with Homebrew:

```bash
brew install rtk
```

**Review before setting it up.**
Setup changes three files in `~/.claude`: it adds a hook to `settings.json`, writes an `RTK.md` guide, and adds an `@RTK.md` line to your `CLAUDE.md` that loads it.
Preview those changes without writing anything:

```bash
rtk init -g --dry-run
```

Then run the setup for real.
When it asks to patch `settings.json`, type `y` and press Enter.

```bash
rtk init -g
```

Restart Claude Code, then check that everything is in place and see how much it has saved:

```bash
rtk init --show
rtk gain
```

A few things to know:

- The hook only rewrites shell commands, so Claude's built-in Read, Grep and Glob tools are not filtered.
- A different program called Rust Type Kit also installs as `rtk`, but the Homebrew package is the right one, and if `rtk gain` fails, you have the other one.
- Its anonymous usage statistics are off unless you opt in.
- If you replace your `CLAUDE.md` later, run `rtk init -g` again to put the `@RTK.md` line back.

To remove it again:

```bash
rtk init -g --uninstall
```
