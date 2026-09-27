---
title: Install Claude Code
nav: Install
summary: The native installer keeps Claude Code up to date on its own.
sources:
  - label: "Claude Code: Advanced setup"
    url: https://code.claude.com/docs/en/setup
---

Run the official installer:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Open a new terminal window with `Cmd+N`, then check the install.
The first command prints the version, and the second checks your setup without starting a session.

```bash
claude --version
claude doctor
```

Now start Claude Code inside a project folder.
The first time, it opens your browser so you can sign in.

```bash
cd ~/path/to/your/project
claude
```

Prefer Homebrew?
This works too, but a Homebrew install does not update itself.

```bash
brew install --cask claude-code
```

Update a Homebrew install from time to time with:

```bash
brew upgrade claude-code
```
