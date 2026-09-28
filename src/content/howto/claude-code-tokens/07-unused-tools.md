---
title: Turn off tools you do not use
nav: Unused tools
summary: Every connected MCP server and installed skill adds to every session, so keep only the ones you use.
sources:
  - label: "Claude Code: Reduce MCP server overhead"
    url: https://code.claude.com/docs/en/costs#reduce-mcp-server-overhead
  - label: "Claude Code: Connect to tools with MCP"
    url: https://code.claude.com/docs/en/mcp
  - label: "Claude Code: Find unused skills"
    url: https://code.claude.com/docs/en/skills#find-unused-skills
---

An MCP server connects Claude Code to another tool, such as GitHub, a database or a browser.
Claude Code loads each server's tool names and instructions into every session, and a tool's full description once Claude first uses it.
A handful of servers you never use still cost something in every conversation.

List your servers and switch off the ones you do not need:

```text title="In Claude Code"
/mcp
```

Or turn one off by name, replacing `server-name`:

```text title="In Claude Code"
/mcp disable server-name
```

To remove one for good, list them from the terminal and remove it by name:

```bash
claude mcp list
claude mcp remove server-name
```

**Use a command line tool when there is one.**
Tools such as `gh` for GitHub, `aws`, `gcloud` and `sentry-cli` add nothing to your sessions until Claude runs them, because Claude already knows how to use a terminal.
If a command line tool does the job, you can remove the MCP server that does the same thing.

**Prune skills and plugins too.**
Each skill's description sits in the conversation on every turn, whether Claude uses the skill or not, and plugins often bring several skills at once.
This report shows what each skill costs, how often it runs, and which plugins you have not used lately:

```text title="In Claude Code"
/skill-doctor
```

It opens in the **Stats** tab of the `/plugin` manager, where you can turn off what you do not need.
