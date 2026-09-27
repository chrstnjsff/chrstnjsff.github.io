---
title: Install Homebrew
nav: Homebrew
summary: The package manager that installs everything else in this guide.
sources:
  - label: Homebrew
    url: https://brew.sh
---

Open the built-in Terminal app for now, then run the Homebrew installer.
It asks for your Mac password and may install the Xcode Command Line Tools first.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Add Homebrew to your `PATH` so new shells can find it.
The first line adds a setup line to `~/.zprofile` only if it is not there yet, so running it twice is safe.
The second line loads Homebrew into the window you have open now.

```bash
grep -q 'brew shellenv' ~/.zprofile 2>/dev/null || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Check that it worked:

```bash
brew --version
```
