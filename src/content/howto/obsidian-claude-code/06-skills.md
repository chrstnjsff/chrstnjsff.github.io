---
title: Add the Obsidian skills
nav: Obsidian skills
summary: Skills from Obsidian's CEO that teach Claude Obsidian's Markdown, Bases, Canvas and command line tool.
sources:
  - label: "obsidian-skills on GitHub"
    url: https://github.com/kepano/obsidian-skills
  - label: "Claude Code: Install and manage plugins"
    url: https://code.claude.com/docs/en/discover-plugins
---

Steph Ango, the CEO of Obsidian, publishes a set of skills for coding agents.
They teach Claude the parts of Obsidian that plain Markdown does not cover:

- **obsidian-markdown:** wikilinks, embeds, callouts and properties.
- **obsidian-bases:** `.base` files, Obsidian's database-like views of your notes.
- **json-canvas:** `.canvas` files, Obsidian's whiteboards.
- **obsidian-cli:** the `obsidian` command from the previous steps.
- **defuddle** and **knap:** turning web pages into clean Markdown, and filling Markdown templates from data.

**Review before installing.**
A plugin can run code on your machine, so read [the repository](https://github.com/kepano/obsidian-skills) first.

Install the plugin from the terminal:

```bash
claude plugin marketplace add kepano/obsidian-skills && claude plugin install obsidian@obsidian-skills
```

Or send these as two separate prompts inside Claude Code:

```text title="In Claude Code"
/plugin marketplace add kepano/obsidian-skills
```

```text title="In Claude Code"
/plugin install obsidian@obsidian-skills
```

Check which skills it added:

```bash
claude plugin details obsidian
```

The defuddle skill also needs the `defuddle` tool, which runs on Node.js.
Install both only if you want Claude to save web pages as notes:

```bash
brew install node
npm install -g defuddle
```
