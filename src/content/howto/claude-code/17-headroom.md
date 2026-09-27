---
title: "headroom: compressed context"
nav: headroom
summary: Compresses large tool output before it reaches Claude, and keeps the originals on hand in case Claude needs them.
optional: true
sources:
  - label: "headroom on GitHub"
    url: https://github.com/headroomlabs-ai/headroom
---

headroom shrinks what coding agents read, such as long logs and file listings, and stores the originals locally so Claude can fetch the full text when it needs it.

**Review before installing.**
headroom sends an anonymous "beacon" by default, with compression ratios, model names and your OS, but never your prompts, code or file paths.
To turn it off, add this setting to `~/.zshrc`, only if it is not there yet.
It takes effect in new terminal windows.

```bash
grep -q 'HEADROOM_BEACON' ~/.zshrc || echo 'export HEADROOM_BEACON=off' >> ~/.zshrc
```

Install the command line tool with uv, a Python tool installer:

```bash
brew install uv
uv tool install --python 3.13 "headroom-ai[all]"
headroom --version
```

If your shell cannot find `headroom`, add uv's tool folder to your `PATH`, then open a new terminal window:

```bash
uv tool update-shell
```

Connect it to Claude Code as an MCP server, which gives Claude tools to compress and retrieve content on demand:

```bash
headroom mcp install --agent claude
```

If you would rather add the server by hand, this command does the same thing, for all your projects:

```bash
claude mcp add -s user headroom -- headroom mcp serve
```

Check that the server is connected, or run `/mcp` inside Claude Code:

```bash
claude mcp list
```

The MCP server only compresses when Claude asks it to.
To compress everything automatically, start Claude Code through headroom's local proxy instead.
That wrapper also installs a code navigation server called Serena for all your projects, and `--code-memory none` skips it:

```bash
headroom wrap claude --code-memory none
```

Undo the wrapper's changes with:

```bash
headroom unwrap claude
```
