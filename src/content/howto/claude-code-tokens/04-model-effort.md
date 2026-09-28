---
title: Pick the model and effort for the job
nav: Model and effort
summary: Use Sonnet for everyday coding, save Opus for hard problems, and choose both at the start of a conversation.
sources:
  - label: "Claude Code: Model configuration"
    url: https://code.claude.com/docs/en/model-config
  - label: "Claude Code: Switching models and the cache"
    url: https://code.claude.com/docs/en/prompt-caching#switching-models
  - label: "Claude Code: Choose a model for subagents"
    url: https://code.claude.com/docs/en/sub-agents#choose-a-model
---

Since Claude Code 2.1.280, the default model on Pro and Team plans is Opus 5.5.
Before that, Pro and Team Standard defaulted to Sonnet 5, so if your usage started running out sooner after an update, this is a likely reason.
Sonnet handles most coding well and costs less, so make it your default and switch to Opus when a problem needs it, such as a tricky design decision or a bug you cannot pin down:

```text title="In Claude Code"
/model sonnet
```

`/model` saves your choice for new sessions too.
To use Opus for one session only, run `/model`, move to Opus, and press `s` instead of Enter.

**Choose at the start, not halfway.**
Each model has its own cache, so switching models mid-conversation makes the next request read the whole conversation again without the cache discount.
Pick the model when you start a task, or `/clear` first.

`opusplan` is a middle ground: Opus while you plan in plan mode, Sonnet while it carries out the plan.
Every switch between planning and doing is a model switch, so it suits one plan followed by a long stretch of work, not constant back and forth.

```text title="In Claude Code"
/model opusplan
```

**Turn effort down for routine work.**
Effort is how much Claude thinks before it answers, and that thinking counts like the answer does.
The levels run `low`, `medium`, `high`, `xhigh` and `max`.
Opus 5.5 starts at `medium` and the other models at `high`.
For routine edits, renames and small fixes, `medium` or `low` is usually enough:

```text title="In Claude Code"
/effort medium
```

On most models, changing effort mid-conversation also resets the cache, so set it when you start.
`/effort auto` goes back to the model's default.

**Put subagents on Sonnet too.**
Subagents use your session's model unless told otherwise, so an Opus session runs Opus subagents.
These settings run every subagent on Sonnet, whatever the main conversation uses.
The command backs up your settings file first and needs `jq`, which the usage step installs:

```bash
f=~/.claude/settings.json
[ -f "$f" ] || echo '{}' > "$f"
cp "$f" "$f.bak-$(date +%Y%m%d-%H%M%S)"
jq '.env.CLAUDE_CODE_SUBAGENT_MODEL = "sonnet" | .env.CLAUDE_CODE_SUBAGENT_MODEL_FORCE = "1"' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
```

It takes effect in your next session.
To undo it, delete those two lines from the `env` block in `~/.claude/settings.json`.
