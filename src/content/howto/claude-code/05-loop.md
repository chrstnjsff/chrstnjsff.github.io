---
title: Repeat a prompt on a timer with /loop
nav: /loop
summary: Have Claude check on something again and again while your session stays open.
sources:
  - label: "Claude Code: Run prompts on a schedule"
    url: https://code.claude.com/docs/en/scheduled-tasks
---

**What it is:** `/loop` runs the same prompt over and over, either on a fixed interval or at a pace Claude picks.

**When to use it:** to watch something that takes a while, such as a deploy, a long build, or new review comments on a pull request.

**Example:** check on a deploy every 5 minutes:

```text title="In Claude Code"
/loop 5m check if the deployment finished and tell me what happened
```

Intervals use `s`, `m`, `h` or `d` for seconds, minutes, hours or days.
Leave the interval out and Claude chooses how long to wait each time, between one minute and one hour, based on what it saw:

```text title="In Claude Code"
/loop check whether CI passed and address any review comments
```

Loops only run while this Claude Code session is open and idle, and a loop that runs on a fixed interval stops by itself after 7 days.

**How to stop or exit:** while a self-paced loop waits for its next run, press `Esc`.
For a loop on a fixed interval, ask Claude to cancel it:

```text title="In Claude Code"
cancel the deploy check loop
```

Starting a new conversation with `/clear` also removes every loop in the session.
