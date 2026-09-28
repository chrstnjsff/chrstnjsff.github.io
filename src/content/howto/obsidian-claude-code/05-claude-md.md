---
title: Tell Claude how your vault works
nav: Vault CLAUDE.md
summary: A CLAUDE.md inside the vault with your note style, how to search, and what Claude must never do.
sources:
  - label: "Claude Code: How Claude remembers your project"
    url: https://code.claude.com/docs/en/memory
---

Claude Code reads a project's `CLAUDE.md` at the start of every session.
Saving it as `.claude/CLAUDE.md` keeps it out of sight, because Obsidian hides folders whose names start with a dot.

This command backs up any file with the same name first, then writes one you can adjust later:

```bash
mkdir -p ~/Notes/.claude
[ -f ~/Notes/.claude/CLAUDE.md ] && cp ~/Notes/.claude/CLAUDE.md ~/Notes/.claude/CLAUDE.md.bak-$(date +%Y%m%d-%H%M%S)
cat > ~/Notes/.claude/CLAUDE.md <<'EOF'
# My Obsidian vault

This folder is an Obsidian vault: plain Markdown notes that I also read and edit in the Obsidian app.

## Writing notes
- Write Obsidian Flavored Markdown.
- Link to other notes with wikilinks by note name, such as [[Project Alpha]], not by file path.
- Start every new note with properties (YAML frontmatter) that include `created` (YYYY-MM-DD) and `tags`.
- Save new notes in the vault root unless I name a folder.
- When you edit one of my notes, keep my wording and add to it instead of rewriting it.

## Finding notes
- Prefer the `obsidian` command for searching, links, tags and tasks, because it uses Obsidian's own index.
  Examples: `obsidian search query="term"`, `obsidian backlinks file="Note name"`, `obsidian tasks todo`.
- If an `obsidian` command fails or hangs, search the files directly instead.

## Safety
- Never delete, move or rename a note without asking me first.
- Never change anything inside `.obsidian/`, which holds Obsidian's own settings.
- Never write passwords, API keys or tokens into a note.
- After a batch of changes, show me `git status` so I can review them.
EOF
```

To change the rules later, edit `~/Notes/.claude/CLAUDE.md` in any text editor.
