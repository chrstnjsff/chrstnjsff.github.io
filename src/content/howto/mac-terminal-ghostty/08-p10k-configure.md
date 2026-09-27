---
title: Configure Powerlevel10k
nav: Prompt wizard
summary: Answer a few questions and the wizard styles your prompt.
sources:
  - label: "Powerlevel10k: Configuration wizard"
    url: https://github.com/romkatv/powerlevel10k#configuration-wizard
---

Restart your shell so it loads Powerlevel10k.

```bash
exec zsh
```

The setup wizard starts on its own.
It first asks whether some icons look right, which they should now that Ghostty uses MesloLGS NF.
Then pick the prompt style you like.
The wizard saves your answers in `~/.p10k.zsh` and adds a line to `~/.zshrc` that loads that file.

If the wizard does not start, or you want to change your answers later, run it yourself:

```bash
p10k configure
```
