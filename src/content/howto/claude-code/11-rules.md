---
title: Add rules for parts of your code
nav: Rules
summary: Small instruction files that can load only when Claude works on matching files.
sources:
  - label: "Claude Code: Organize rules with .claude/rules/"
    url: https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/
---

Rules split your instructions into small topic files instead of one long `CLAUDE.md`.
They live in `.claude/rules/` for one project, or `~/.claude/rules/` for all your projects.

- A rule without `paths` loads at the start of every session, like `CLAUDE.md`.
- A rule with `paths` loads only when Claude reads a file that matches one of its patterns, which saves room in the context window.

Run this in a project's root folder to add a rule for its API code.
It backs up any rule file with the same name first.

```bash
mkdir -p .claude/rules
[ -f .claude/rules/api.md ] && cp .claude/rules/api.md .claude/rules/api.md.bak-$(date +%Y%m%d-%H%M%S)
cat > .claude/rules/api.md <<'EOF'
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules

- All API endpoints must include input validation
- Use the standard error response format
- Include OpenAPI documentation comments
EOF
```

The pattern `src/api/**/*.ts` matches every TypeScript file under `src/api`, at any depth.
Commit `.claude/rules/` so everyone on the project gets the same rules.
