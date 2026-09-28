---
title: Work with your notes
nav: Use it
summary: Start Claude in the vault, ask it to find, write and link notes, then review every change in Obsidian and Git.
---

Keep Obsidian open, then start Claude Code in the vault:

```bash
cd ~/Notes
claude
```

The first time, Claude Code asks whether you trust the folder.
Accept, so it can use the rules from the previous step.

Ask in plain English, for example:

```text title="In Claude Code"
Find my notes about the kitchen renovation and summarize them, with a link to each note.
```

```text title="In Claude Code"
Create a note for today's call with Sam about the budget, and link it to [[Kitchen renovation]].
```

```text title="In Claude Code"
List my open tasks across the vault, grouped by note.
```

```text title="In Claude Code"
Which notes link to [[Kitchen renovation]], and which links in my vault point to notes that do not exist?
```

```text title="In Claude Code"
Make a Base that lists every note tagged meeting, newest first.
```

New and changed notes appear in Obsidian right away.
Review them in the terminal too:

```bash
cd ~/Notes
git status
git diff
```

Keep the changes by saving a snapshot:

```bash
git add -A
git commit -m "Notes from today"
```

Or undo Claude's edits to one note, replacing the path with a note from `git status`:

```bash
git restore "Kitchen renovation.md"
```

`git restore .` undoes the edits to every note since your last snapshot, so commit anything you wrote yourself first.
