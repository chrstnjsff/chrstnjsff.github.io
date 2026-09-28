---
title: Start fresh between tasks
nav: Clear often
summary: One task per conversation, a handoff note when a task runs long, and a new conversation after a long break.
sources:
  - label: "Claude Code: Manage context proactively"
    url: https://code.claude.com/docs/en/costs#manage-context-proactively
  - label: "Claude Code: Why usage climbs in a long session"
    url: https://code.claude.com/docs/en/costs#why-usage-climbs-in-a-long-session
---

This is the habit that saves the most.
When you finish one task and start something unrelated, clear the conversation so the old one stops riding along with every new message:

```text title="In Claude Code"
/clear
```

The old conversation is not lost.
`/clear` with a name, such as `/clear login-bug`, labels it, and `/resume` brings it back later.

**Prefer `/clear` to `/compact`.**
`/compact` summarizes the conversation so you can keep going, but it reads the whole conversation to write that summary, so on a long one it is a large request in itself.
`/clear` costs nothing.
Use `/compact` only when you are halfway through a task and need to keep its details, and tell it what to keep:

```text title="In Claude Code"
/compact keep the failing test names and the files we changed
```

**Carry work over with a handoff note.**
When a task runs long, ask Claude to write down where things stand before you clear:

```text title="In Claude Code"
Write what we did, what is left, and the files involved to handoff.md
```

Then run `/clear` and pick up from the note:

```text title="In Claude Code"
Read handoff.md and continue with what is left
```

**Come back to a fresh conversation after a long break.**
The cache lasts an hour after your last message.
The first message after a longer break processes the whole conversation again without the cache discount, so for a big conversation, starting fresh from a handoff note is cheaper than carrying on.
On Pro and Max, Claude Code offers to resume a large session from a summary for the same reason.

**Ask side questions with `/btw`.**
A quick question you do not need to keep, such as how a command works, can skip the conversation:

```text title="In Claude Code"
/btw what does git rebase --onto do?
```
