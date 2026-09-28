---
title: Set up Obsidian with Claude Code
summary: Keep your notes in an Obsidian vault and let Claude Code search, write and link them, with every change tracked in Git.
order: 5
platform: macOS on Apple silicon
duration: About 20 minutes
verifiedOn: 2026-09-28
verifiedWith:
  - Obsidian 1.13.7
  - Claude Code 2.1.283
  - macOS 27.0
prerequisites:
  - Claude Code, from the Claude Code guide.
  - Homebrew and Git, from the Ghostty guide.
sources:
  - label: "Obsidian: Obsidian CLI"
    url: https://obsidian.md/help/cli
  - label: "Obsidian: Manage vaults"
    url: https://obsidian.md/help/manage-vaults
  - label: "obsidian-skills on GitHub"
    url: https://github.com/kepano/obsidian-skills
  - label: "Claude Code: Configure permissions"
    url: https://code.claude.com/docs/en/permissions
  - label: "Claude Code: How Claude remembers your project"
    url: https://code.claude.com/docs/en/memory
---

Obsidian is a note-taking app that keeps every note as a plain Markdown file in a folder called a vault.
Because the notes are just files, Claude Code can read, search and write them like code.
This guide creates a vault at `~/Notes`, turns on Obsidian's command line tool, puts the vault under Git so you can review and undo Claude's changes, and teaches Claude how your vault works.
The last steps use the vault from your other projects and, optionally, keep Claude's own memory there.
