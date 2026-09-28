---
title: When you hit the limit
nav: Hit the limit
summary: Read which limit you hit, let Claude Code wait and carry on, or pay for extra usage if your plan allows it.
sources:
  - label: "Claude Code: Wait for a usage limit to reset"
    url: https://code.claude.com/docs/en/interactive-mode#wait-for-a-usage-limit-to-reset
  - label: "Claude Code: When a developer asks about a limit"
    url: https://code.claude.com/docs/en/costs#when-a-developer-asks-about-a-limit
  - label: "Claude Help Center: Extra usage for paid Claude plans"
    url: https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans
---

The message tells you which limit you hit and when it resets.

- **"You've hit your session limit"** or **"You've hit your weekly limit"** covers every model, so switching models does not help.
- **A limit that names one model**, such as "You've hit your Opus limit", does not block other models, so `/model sonnet` keeps you working.

**Let Claude Code wait and carry on.**
Claude Code can wait for the reset and then continue the task it was on.
It often offers this on its own when you hit the limit, and you can open the options yourself:

```text title="In Claude Code"
/rate-limit-options
```

Pick **Wait here, then continue automatically**.
Claude Code still asks for permissions as usual, so the task can pause on a question while you are away.

**Pay for extra usage.**
Usage credits let you keep working past the limit at standard API prices:

```text title="In Claude Code"
/usage-credits
```

On a Pro plan this opens your usage settings, where you can turn credits on and set a monthly spending cap.
On a Team plan without billing access, it sends a request to your admins instead.
While you run on credits, the cache lasts five minutes instead of an hour, so pauses cost more there than inside your plan.

**If you hit it every week anyway,** check `/usage` for the biggest share first.
On a Team plan, a Premium seat gives about five times the usage, and admins can give one to just the people who need it.
