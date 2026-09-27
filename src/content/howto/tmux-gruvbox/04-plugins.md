---
title: Start tmux and install the plugins
nav: Install plugins
summary: One key combination downloads the Gruvbox theme and turns it on.
sources:
  - label: "TPM: Installing plugins"
    url: https://github.com/tmux-plugins/tpm#installing-plugins
---

Start a tmux session named `main`:

```bash
tmux new -s main
```

Now install the plugins listed in your config.
tmux shortcuts start with the prefix key, `Ctrl+b`.
Press `Ctrl+b`, let go, then press `Shift+i` (a capital I).

TPM downloads the plugins and reloads tmux, and the status bar at the bottom switches to the Gruvbox colors.
When it says Done, press the key it names, Enter or Escape, to continue.

Check that tmux sees Ghostty's full color and extended keys support:

```bash
tmux display -p '#{client_termfeatures}'
```

The list should include `RGB` and `extkeys`, for example:

```text title="Example output"
bpaste,ccolour,clipboard,cstyle,extkeys,focus,RGB,title
```
