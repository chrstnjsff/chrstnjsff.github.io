---
title: "brag: a launch video of your project"
nav: brag
summary: Turns the project you built into a short, shareable video with music, motion and share copy.
optional: true
sources:
  - label: "brag on GitHub"
    url: https://github.com/latent-spaces/brag
  - label: Hyperframes
    url: https://hyperframes.heygen.com
---

brag reads your project's code and makes a short launch video for it.
It needs Node.js 22 or later and FFmpeg.
Install them with Homebrew if you do not have them yet, then check that the Node version starts with 22 or higher:

```bash
brew install node ffmpeg
node --version
```

Inside Claude Code, send these as two separate prompts:

```text title="In Claude Code"
/plugin marketplace add latent-spaces/brag
```

```text title="In Claude Code"
/plugin install brag@brag
```

In any project folder, ask for a video:

```text title="In Claude Code"
let's /brag
```

The result lands in a `brag-output/` folder, with the plan, the share copy and the finished `brag.mp4`.
Voiceover is off unless you ask for it with `/brag --voice`, and `/brag --tone` sets the mood, as in this example:

```text title="In Claude Code"
/brag --tone "fake Series A launch from 2016"
```

The plugin includes two versions.
`/brag-slim` builds the video with the tools already on your machine.
The classic `/brag` renders through Hyperframes, and on Claude Opus 5.5 it switches to `/brag-slim` automatically unless you run `/brag --full`.

**Review before using the classic version:** Hyperframes is a separate tool that `npx` downloads and runs.
Check that it is ready with:

```bash
npx hyperframes doctor
```
