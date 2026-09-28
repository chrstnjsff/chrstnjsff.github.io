---
title: Use fewer tokens in Claude Code
summary: Make a Pro plan or a Team Standard seat last longer by seeing what uses your limit, changing a few habits, and trimming what Claude reads.
order: 4
platform: macOS on Apple silicon
duration: About 20 minutes
verifiedOn: 2026-09-28
verifiedWith:
  - Claude Code 2.1.283
  - macOS 27.0
prerequisites:
  - Claude Code signed in with a Claude Pro plan or a Team seat. Every step also works on Max and Team Premium, which simply have more room.
  - The Claude Code guide, for installing Claude Code and plugins.
  - Homebrew, from the Ghostty guide, for jq in the steps that edit settings files.
sources:
  - label: "Claude Code: Manage costs effectively"
    url: https://code.claude.com/docs/en/costs
  - label: "Claude Code: How Claude Code uses prompt caching"
    url: https://code.claude.com/docs/en/prompt-caching
  - label: "Claude Code: Model configuration"
    url: https://code.claude.com/docs/en/model-config
  - label: "Claude Help Center: Usage limit best practices"
    url: https://support.claude.com/en/articles/9797557-usage-limit-best-practices
---

On a Pro plan or a Team Standard seat, Claude Code draws from a usage allowance that resets every five hours and every week.
Most of that allowance goes on Claude re-reading your conversation and your files, not on the answers it writes.
So the biggest savings come from short conversations, a lighter model for everyday work, and less noise in what Claude reads.
The first steps show where your usage goes, the middle steps change the habits and settings that matter most, and the last steps cover community tools and what to do when you run out.
