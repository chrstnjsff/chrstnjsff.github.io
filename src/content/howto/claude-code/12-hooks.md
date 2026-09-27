---
title: Automate actions with hooks
nav: Hooks
summary: Shell commands that run at set moments, such as when Claude needs your attention or after it edits a file.
sources:
  - label: "Claude Code: Automate actions with hooks"
    url: https://code.claude.com/docs/en/hooks-guide
---

A hook is a shell command that Claude Code runs at a certain moment, every time, without Claude having to remember.
Hooks live in a `hooks` block in `~/.claude/settings.json`, grouped by event name.

In Ghostty, Claude Code already shows a desktop notification when it needs you.
This example adds a sound as well, using the `Notification` event.
It uses `jq` to merge the hook into your existing settings safely, backs the file up first, and skips everything if the hook is already there.

```bash
brew install jq
mkdir -p ~/.claude
f=~/.claude/settings.json
[ -f "$f" ] || echo '{}' > "$f"
if ! grep -q 'Glass.aiff' "$f"; then
  cp "$f" "$f.bak-$(date +%Y%m%d-%H%M%S)"
  jq '.hooks.Notification += [{"matcher": "", "hooks": [{"type": "command", "command": "afplay /System/Library/Sounds/Glass.aiff"}]}]' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
fi
```

Type `/hooks` in Claude Code to see your hooks.
That screen is read-only, so to change a hook, edit `~/.claude/settings.json` or ask Claude to do it.

To test the sound, press `Shift+Tab` until the status bar shows `⏸ manual mode on`, ask Claude to do something that needs your permission, then switch to another app.

Two more hooks from the Claude Code docs, to adapt as you like.
The first shows a macOS notification in terminals that do not send one on their own:

```json title="~/.claude/settings.json"
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

The second runs Prettier on every file Claude edits or writes, in a project's `.claude/settings.json`:

```json title=".claude/settings.json"
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

If a settings file already has a `hooks` block, add the new event next to the existing ones instead of replacing the whole block.
