---
title: "Community tools: what they really save"
nav: Community tools
summary: rtk, headroom, ponytail and caveman each trim a different part of the bill, and their measured savings are smaller than the headlines.
optional: true
sources:
  - label: "JetBrains: Ponytail skill for Claude Code, tested"
    url: https://blog.jetbrains.com/ai/2026/07/ponytail-skill-claude-tested/
  - label: "JetBrains: Speak to AI agents like cavemen to save tokens"
    url: https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/
  - label: "rtk: How savings work"
    url: https://github.com/rtk-ai/rtk#how-savings-work
  - label: "headroom on GitHub"
    url: https://github.com/headroomlabs-ai/headroom
  - label: "Claude Code: Track your costs"
    url: https://code.claude.com/docs/en/costs#track-your-costs
---

These open-source tools each shrink a different part of what you pay for.
Their headline numbers measure only that part, so the effect on your whole limit is smaller.
The Claude Code guide has install steps for each one.

| Tool | What it trims | Measured savings |
| --- | --- | --- |
| [rtk](/how-to/claude-code/#rtk) | Shell command output, such as git, tests and builds | Up to 90% of that output. The project points out this is not 90% off your bill, because command output is only one part of what Claude reads. |
| [headroom](/how-to/claude-code/#headroom) | Large tool results, such as logs and files | 21% to 57% on the project's own benchmark scenarios, and very little on prose or output that is already compact. |
| [ponytail](/how-to/claude-code/#ponytail) | How much code Claude writes | JetBrains ran 80 paired tasks: 10% lower cost, 11% faster, and no measurable change in quality. The project advertises 20% cheaper. |
| [caveman](/how-to/claude-code/#caveman) | The length of Claude's replies | JetBrains ran 86 paired coding tasks: 8.5% fewer output tokens, roughly 10% lower expected cost per task, and no detectable change in quality. The project advertises 65%, which holds for chat-style questions rather than coding sessions. |

ponytail and caveman only change what Claude writes, and in a coding session Claude reads far more than it writes.
The example session in Anthropic's cost docs has 5.3 thousand output tokens next to 940 thousand tokens re-read from the cache.
That is why the habits in the earlier steps, such as clearing between tasks and choosing Sonnet, usually save more than any of these tools.

If you add tools, start with one that trims what Claude reads, rtk or headroom, rather than both, because they overlap.
Check the plugin and skill shares in `/usage` after a week, and remove what does not pay for itself.
