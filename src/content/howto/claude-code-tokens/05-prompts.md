---
title: Ask precisely and stop early
nav: Prompts
summary: Name the files, plan big changes first, and stop Claude the moment it heads the wrong way.
sources:
  - label: "Claude Code: Write specific prompts"
    url: https://code.claude.com/docs/en/costs#write-specific-prompts
  - label: "Claude Code: Work efficiently on complex tasks"
    url: https://code.claude.com/docs/en/costs#work-efficiently-on-complex-tasks
  - label: "Claude Code: Checkpointing"
    url: https://code.claude.com/docs/en/checkpointing
---

A vague request makes Claude search the whole project before it starts.
A precise one lets it open the right file straight away.

| Instead of | Try |
| --- | --- |
| Improve this codebase | Add input validation to the login function in @src/auth.ts |
| Fix the tests | `npm test` fails in @src/cart.test.ts with "total is NaN". Find the cause and fix it |
| Why is this slow? | The /orders page takes 4 seconds. Check the query in @src/orders/list.ts first |

Typing `@` and a path attaches that file, so Claude does not have to go looking for it.

**Say it all in one message.**
Put related requests, the constraints and the expected result in one message instead of drip-feeding them, since every extra round re-sends the conversation.
Say how Claude can check its work, such as a test to run or the output you expect, so it can catch its own mistakes instead of waiting for you to spot them.

**Plan bigger changes first.**
Press `Shift+Tab` until the status bar shows plan mode.
Claude reads the code and proposes a plan without changing anything, so a wrong direction costs one plan instead of a pile of edits to undo.

**Stop early, and rewind instead of arguing.**
Press `Esc` as soon as Claude heads the wrong way.
Then go back to before the mistake instead of correcting it in the conversation, since every correction stays in the conversation and is re-sent with every later step:

```text title="In Claude Code"
/rewind
```

Pressing `Esc` twice on an empty prompt opens the same menu.
Pick the message to go back to, restore the code, the conversation or both, then send a clearer version of your request.
