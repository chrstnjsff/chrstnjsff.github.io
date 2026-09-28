---
title: Watch the hidden spenders
nav: Hidden costs
summary: Subagents, agent teams, repeating tasks and big pastes all use your limit in the background.
sources:
  - label: "Claude Code: Why usage climbs in a long session"
    url: https://code.claude.com/docs/en/costs#why-usage-climbs-in-a-long-session
  - label: "Claude Code: Agent team token costs"
    url: https://code.claude.com/docs/en/costs#agent-team-token-costs
  - label: "Claude Code: Which TTL each request gets"
    url: https://code.claude.com/docs/en/prompt-caching#which-ttl-each-request-gets
---

Some features do useful work out of sight, and each one draws on the same limit as your conversation.

| What | What to know |
| --- | --- |
| Subagents | Each one works in its own conversation and sends its own requests. Their cache lasts five minutes, not an hour. They are worth it for noisy jobs, such as digging through logs, because only a summary comes back, but asking for five in parallel for a small job costs five times over. |
| Agent teams | Several full Claude Code sessions working together. Anthropic measured about 7 times the tokens of a normal session when teammates run in plan mode. They are off unless you turn them on, and on a basic plan it is best to leave them off. |
| Repeating tasks | `/loop` and scheduled tasks send your whole conversation on every run, even while you are away. Stop them when you are done, and check the Loops rows in `/usage`. |
| `ultracode` effort | Plans a multi-agent workflow for each substantial task, which multiplies usage. Keep it for rare, large jobs. |
| Big pastes | A whole log or file pasted into the prompt stays in the conversation. Paste the error and a few lines around it, or give the file path. |
| Fast mode | `/fast` does not use your plan's limit at all: on subscription plans it bills usage credits, which cost money. |

If `/usage` shows subagents taking a large share, give the subagents you write a smaller model in their settings, such as `model: haiku` for simple lookups, or put them all on Sonnet as in the model step.
