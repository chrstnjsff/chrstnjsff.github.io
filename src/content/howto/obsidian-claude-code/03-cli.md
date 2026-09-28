---
title: Turn on the Obsidian command line tool
nav: Obsidian CLI
summary: The obsidian command lets Claude search and read your vault through Obsidian's own index.
sources:
  - label: "Obsidian: Obsidian CLI"
    url: https://obsidian.md/help/cli
---

Obsidian includes a command line tool called `obsidian`.
It is off until you turn it on:

1. In Obsidian, open **Settings** with `Cmd+,` and select **General**.
2. Turn on **Command line interface**.
3. Next to **Set up CLI to work in the terminal**, click **Register**, and enter your Mac password if asked.

Open a new terminal window with `Cmd+N`, then check that it works.
The first command prints the version, and the second prints the vault's name, path and file count.

```bash
obsidian version
cd ~/Notes
obsidian vault
```

A few things to know:

- The tool only works while the Obsidian app is running, and the first command opens it if it is closed.
- Inside a vault folder it uses that vault.
  Anywhere else it uses the vault that is active in Obsidian, and `vault=Notes` as the first option picks one by name.
- `obsidian help` lists every command, and `obsidian help search` explains one.
