---
title: Track the vault with Git
nav: Git
summary: A local history of every note, so you can see what Claude changed and undo it.
---

Before Claude edits any notes, put the vault under Git.
Every change then shows up in `git diff`, and anything you do not like can be undone.

If you have never made a Git commit on this Mac, tell Git your name and email first, replacing the examples:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

This creates a `.gitignore` that skips Obsidian's window layout, its trash folder, the backups this guide makes and macOS clutter, only if the vault does not have one yet, then saves the first snapshot:

```bash
cd ~/Notes
git init
[ -f .gitignore ] || cat > .gitignore <<'EOF'
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.trash/
*.bak-*
.DS_Store
EOF
git add -A
git commit -m "Start my notes"
```

The history stays on your Mac.
If you add a remote later to back it up, keep that repository private, because it holds everything you write.
