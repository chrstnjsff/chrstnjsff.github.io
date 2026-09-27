---
title: Install plugins
nav: Plugins
summary: Add bundles of skills, subagents and hooks that other people publish, in two steps.
sources:
  - label: "Claude Code: Install and manage plugins"
    url: https://code.claude.com/docs/en/discover-plugins
---

A plugin bundles skills, subagents, hooks or MCP servers so you can install them together.
Plugins come from a marketplace, which is usually a GitHub repository, so installing one takes two steps: add the marketplace, then install the plugin from it.

Inside Claude Code, send these as two separate prompts, replacing `owner/repo` and `name@marketplace`:

```text title="In Claude Code"
/plugin marketplace add owner/repo
```

```text title="In Claude Code"
/plugin install name@marketplace
```

Or do both from the terminal in one line, again replacing the placeholders:

```bash
claude plugin marketplace add owner/repo && claude plugin install name@marketplace
```

A plugin's commands have a full name that starts with the plugin's name, such as `/caveman:caveman`.
The `/` menu finds them by their short name too, and the short name works on its own as long as no other command uses it.

To manage plugins from the terminal, first list the ones you have:

```bash
claude plugin list
```

See what a plugin contains, replacing `name` with a name from that list:

```bash
claude plugin details name
```

Update a plugin, then restart Claude Code to use the new version:

```bash
claude plugin update name
```

Remove a plugin:

```bash
claude plugin uninstall name
```

**Review before installing.**
A plugin can run code on your machine: its hooks run shell commands automatically, and its skills can run commands when they are used.
Read the plugin's repository before you install it, and after installing, `claude plugin details` lists the skills, agents, hooks and servers it added.
