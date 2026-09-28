---
title: How your usage limit works
nav: How limits work
summary: Two windows, one allowance shared with Claude chat, and why a long conversation costs more with every message.
sources:
  - label: "Claude Code: Manage costs effectively"
    url: https://code.claude.com/docs/en/costs
  - label: "Claude Code: Cache lifetime"
    url: https://code.claude.com/docs/en/prompt-caching#cache-lifetime
  - label: "Claude Help Center: What is the Team plan?"
    url: https://support.claude.com/en/articles/9266767-what-is-the-team-plan
---

Your plan gives you an allowance with two limits: one that resets on a rolling five-hour window, and one that resets weekly.
The same allowance covers Claude Code, Claude chat and Cowork, so a long chat in the browser leaves less for coding.
On a Team plan, a Premium seat has about five times the usage of a Standard seat.

Claude Code does not send only your latest message.
Every request carries the whole conversation so far, and Claude makes a new request each time it reads a file, runs a command or gets a tool result back.
Prompt caching makes the repeated part cheaper, but it still counts, so a one-line question at the end of an all-day conversation costs as much as re-reading the whole day.

These are the things that make usage climb fastest:

| What | Why it costs |
| --- | --- |
| Long conversations | Every step re-sends everything before it. |
| Long breaks | On a subscription the cache lasts an hour after your last message. After a longer break, the next message processes the whole conversation again without the cache discount. |
| Opus, high effort | Opus costs more than Sonnet, and the thinking that higher effort adds is billed like the answer itself. |
| Big tool output | Test runs, logs and whole files stay in the conversation and are re-sent with every later step. |
| Extra agents | Subagents, agent teams and repeating `/loop` tasks each send their own requests. |

The rest of this guide takes these on one by one.
