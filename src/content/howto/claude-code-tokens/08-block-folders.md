---
title: Keep Claude out of big generated folders
nav: Block folders
summary: Deny rules stop Claude from reading dependencies, build output and lock files, which are large and rarely help.
sources:
  - label: "Claude Code: Read and Edit permission rules"
    url: https://code.claude.com/docs/en/permissions#read-and-edit
---

Folders like `node_modules` and `dist`, and files like `package-lock.json`, are huge and generated.
When Claude opens one while searching, whatever it reads stays in the conversation and is re-sent with every later step.
A `Read` deny rule blocks them for Claude's file tools, for `@` mentions, and for shell commands that name the file, such as `cat` and `head`.
It is a guardrail against wasted reads, not a security boundary: a script that opens files itself can still read them.

Run this in your project's root folder.
It adds the rules to the project's `.claude/settings.json`, backs the file up first, skips any rule that is already there, and keeps your existing rules in their order.
Edit the list to match your stack before you run it:

```bash
mkdir -p .claude
f=.claude/settings.json
[ -f "$f" ] || echo '{}' > "$f"
cp "$f" "$f.bak-$(date +%Y%m%d-%H%M%S)"
jq '(.permissions.deny // []) as $old | .permissions.deny = $old + ([
  "Read(node_modules/**)",
  "Read(dist/**)",
  "Read(build/**)",
  "Read(coverage/**)",
  "Read(.next/**)",
  "Read(package-lock.json)",
  "Read(yarn.lock)",
  "Read(pnpm-lock.yaml)",
  "Read(*.min.js)"
] - $old)' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
```

A folder rule such as `Read(dist/**)` blocks a folder with that name at any depth, and a file name such as `Read(yarn.lock)` matches that file anywhere in the project.
Start a new session so the rules take effect.
Commit `.claude/settings.json` so everyone on the project gets them, and leave the `.bak-` copy out of the commit.

If Claude needs one of these files for a task, such as reading a library's source while debugging, delete that rule for the task and put it back afterwards.
