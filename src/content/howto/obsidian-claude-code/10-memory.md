---
title: Keep Claude's memory in your vault
nav: Memory in the vault
summary: Point a project's auto memory into the vault, so you can read, link and edit what Claude remembers in Obsidian.
optional: true
sources:
  - label: "Claude Code: Auto memory storage location"
    url: https://code.claude.com/docs/en/memory#storage-location
---

Claude Code keeps notes for itself about each project, called auto memory, in a hidden folder under `~/.claude/projects/`.
They are Markdown files too, so you can move them into your vault and browse them in Obsidian.
Each project keeps its own folder, here `~/Notes/Claude/<project name>`.

Run this from the top folder of a project.
It copies the memory Claude already has for that project, without overwriting anything, then sets `autoMemoryDirectory` in the project's personal settings file:

```bash
cd ~/path/to/your/project
root=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
dir="$HOME/Notes/Claude/$(basename "$root")"
old="$HOME/.claude/projects/$(echo "$root" | sed 's/[^A-Za-z0-9]/-/g')/memory"
mkdir -p "$dir"
[ -d "$old" ] && cp -Rn "$old"/. "$dir"/
mkdir -p "$root/.claude"
f="$root/.claude/settings.local.json"
[ -f "$f" ] && cp "$f" "$f.bak-$(date +%Y%m%d-%H%M%S)"
[ -f "$f" ] || echo '{}' > "$f"
jq --arg dir "$dir" '.autoMemoryDirectory = $dir' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
```

`settings.local.json` is only for you, so keep it out of the project's Git history.
This adds it to the repository's local ignore list, which is never committed, and does nothing outside a Git repository:

```bash
cd ~/path/to/your/project
if git rev-parse --git-dir >/dev/null 2>&1; then
  ex=$(git rev-parse --git-path info/exclude)
  mkdir -p "$(dirname "$ex")"
  grep -qxF '.claude/settings.local.json*' "$ex" 2>/dev/null || echo '.claude/settings.local.json*' >> "$ex"
fi
```

Restart any Claude Code session that is open in the project, because a running session keeps using the old folder.
Then check the new location:

```text title="In Claude Code"
What is the full path of your auto memory folder?
```

Claude reads `MEMORY.md` in that folder at the start of every session: the first 200 lines or 25 KB, whichever comes first.
Ask it to remember something, such as "remember that the staging database resets every Sunday", and the note appears in Obsidian under `Claude/`.

To go back, delete the `autoMemoryDirectory` line from `.claude/settings.local.json` and restart Claude Code.
