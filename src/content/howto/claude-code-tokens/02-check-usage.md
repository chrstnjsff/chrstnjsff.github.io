---
title: See what is using your limit
nav: Check usage
summary: Three built-in commands show how much you have used and what used it, and a status line keeps it in view.
sources:
  - label: "Claude Code: Track your costs"
    url: https://code.claude.com/docs/en/costs#track-your-costs
  - label: "Claude Code: Customize your status line"
    url: https://code.claude.com/docs/en/statusline
---

Start by finding out where your usage goes, so you fix the right thing.

```text title="In Claude Code"
/usage
```

`/usage` shows how much of your five-hour and weekly limits you have used.
On a Pro or Team plan it also breaks down what used it: the share that went to skills, subagents, plugins and each MCP server, plus a warning for any habit, such as long conversations or cache misses, that caused 10% or more of your recent usage.
Press `w` to see the last 7 days and `d` for the last 24 hours.
The breakdown only counts Claude Code on this computer, not Claude chat in the browser.

```text title="In Claude Code"
/context
```

`/context` draws a colored grid of what fills the current conversation: instructions, tools, memory files and messages.
It also suggests what to trim.

```text title="In Claude Code"
/insights
```

`/insights` reads your recent sessions and writes a report about how you work, where Claude misunderstood you, and what to try instead.
The report itself uses tokens, so run it now and then, not every day.

**Keep an eye on it while you work.**
A status line is the bar under the prompt.
This one shows the model and how full the conversation is, and, on Pro and Max plans, how much of the five-hour limit you have used.
Claude Code does not send the limit to the status line on Team plans, so there it shows only the first two.
It needs `jq`:

```bash
brew install jq
```

This writes the script, backing up any script with the same name first, and turns it on only if you do not already have a status line:

```bash
mkdir -p ~/.claude
[ -f ~/.claude/statusline.sh ] && cp ~/.claude/statusline.sh ~/.claude/statusline.sh.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.claude/statusline.sh <<'EOF'
#!/bin/bash
# Model, context use and, on Pro and Max, 5-hour limit use.
jq -r '
  "\(.model.display_name) · \(.context_window.used_percentage // 0 | floor)% context"
  + (if .rate_limits.five_hour.used_percentage
     then " · \(.rate_limits.five_hour.used_percentage | floor)% of 5-hour limit"
     else "" end)
'
EOF
chmod +x ~/.claude/statusline.sh
f=~/.claude/settings.json
[ -f "$f" ] || echo '{}' > "$f"
if jq -e '.statusLine' "$f" > /dev/null; then
  echo "You already have a status line, so it was left alone."
else
  cp "$f" "$f.bak-$(date +%Y%m%d-%H%M%S)"
  jq '.statusLine = {"type": "command", "command": "~/.claude/statusline.sh"}' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
fi
```

The status line appears after your next message.
It reads something like `Sonnet 5 · 23% context · 41% of 5-hour limit`.
