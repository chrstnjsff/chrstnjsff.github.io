---
title: Show Claude only the failing tests
nav: Filter test output
summary: A hook trims test runs down to the failures before Claude reads them, so a passing suite no longer fills the conversation.
sources:
  - label: "Claude Code: Offload processing to hooks and skills"
    url: https://code.claude.com/docs/en/costs#offload-processing-to-hooks-and-skills
  - label: "Claude Code: Hooks reference"
    url: https://code.claude.com/docs/en/hooks
---

A full test run can print thousands of lines, and all of it stays in the conversation.
This hook, adapted from the Claude Code docs, runs before every shell command Claude runs.
When the command starts with `npm test`, `pytest` or `go test`, it rewrites it to keep only the lines around `FAIL`, `ERROR` and `error:`, at most 100 lines.
When nothing matches, Claude sees a one-line note instead of an empty result.

Write the script, backing up any script with the same name first:

```bash
mkdir -p ~/.claude/hooks
[ -f ~/.claude/hooks/filter-test-output.sh ] && cp ~/.claude/hooks/filter-test-output.sh ~/.claude/hooks/filter-test-output.sh.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/.claude/hooks/filter-test-output.sh <<'EOF'
#!/bin/bash
# Keep only the failures from test runs before Claude reads them.
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command')

if [[ "$cmd" =~ ^(npm test|pytest|go test) ]]; then
  filtered_cmd="$cmd 2>&1 | { grep -A 5 -E '(FAIL|ERROR|error:)' || echo 'No FAIL or ERROR lines in the test output.'; } | head -100"
  echo "$input" | jq --arg filtered "$filtered_cmd" \
    '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: "allow", updatedInput: (.tool_input + {command: $filtered})}}'
else
  echo "{}"
fi
EOF
chmod +x ~/.claude/hooks/filter-test-output.sh
```

Then register it in `~/.claude/settings.json`, backing the file up first and skipping it if it is already there:

```bash
f=~/.claude/settings.json
[ -f "$f" ] || echo '{}' > "$f"
if ! grep -q 'filter-test-output.sh' "$f"; then
  cp "$f" "$f.bak-$(date +%Y%m%d-%H%M%S)"
  jq '.hooks.PreToolUse += [{"matcher": "Bash", "hooks": [{"type": "command", "command": "~/.claude/hooks/filter-test-output.sh"}]}]' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
fi
```

Run `/hooks` in Claude Code to check that it is listed under `PreToolUse`.

A few things to know:

- The hook approves the test command it rewrites, so Claude runs it without asking you first.
- The exit code Claude sees is no longer the test runner's, so it judges the run by the lines it gets back.
- Change the pattern `^(npm test|pytest|go test)` to match how your project runs its tests, such as `^(pnpm test|cargo test)`.
- rtk, in the community tools step, filters test runs and many other commands. Use this hook or rtk, not both.
