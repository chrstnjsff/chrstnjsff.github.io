---
title: Add a code intelligence plugin
nav: Code intelligence
summary: A language server lets Claude jump straight to a definition instead of searching and opening several files.
sources:
  - label: "Claude Code: Code intelligence plugins"
    url: https://code.claude.com/docs/en/plugins/code-intelligence
---

Without help, Claude finds a function by searching for its name and opening the files that match.
A code intelligence plugin connects Claude Code to your language's language server, the same engine your editor uses for "go to definition", so one lookup replaces that search.
It also reports type errors after each edit, so Claude catches mistakes without running a full build.

The plugins come from Anthropic's official marketplace.
This adds that marketplace if Claude Code has not added it yet, and does nothing if it is already there:

```bash
claude plugin marketplace add anthropics/claude-plugins-official
```

Each plugin needs its language server installed first, so run the pair of commands for your language.

**TypeScript and JavaScript.**
The `@6` matters: TypeScript 7 no longer includes the `tsserver` that this language server runs, so it needs TypeScript 6 installed globally.
That global copy also covers projects that use TypeScript 7 themselves.

```bash
npm install -g typescript-language-server typescript@6
claude plugin install typescript-lsp@claude-plugins-official
```

**Python:**

```bash
npm install -g pyright
claude plugin install pyright-lsp@claude-plugins-official
```

**Go:**

```bash
go install golang.org/x/tools/gopls@latest
claude plugin install gopls-lsp@claude-plugins-official
```

**Rust:**

```bash
rustup component add rust-analyzer
claude plugin install rust-analyzer-lsp@claude-plugins-official
```

The Claude Code docs list more languages, including Java, C and C++, C#, PHP, Ruby, Kotlin and Swift.

Start a new session to load the plugin.
After Claude edits a file, the type errors in that file reach it with its next step.
If Claude never reports type errors for that language, run `/plugin` and open the **Errors** tab: `Executable not found in $PATH` means the shell you started `claude` from cannot find the language server.
