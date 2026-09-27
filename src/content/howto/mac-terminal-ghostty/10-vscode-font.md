---
title: Use the font in VS Code's terminal
nav: VS Code font
summary: Makes the prompt icons show up in VS Code's built-in terminal too.
optional: true
---

Skip this step if you do not use VS Code.

In VS Code, press `Cmd+Shift+P`, type `Open User Settings (JSON)`, and press Enter.
Add the font setting inside the outer curly braces.
If the file already has other settings, add only the middle line, and put a comma at the end of the line before it.

```json title="settings.json (VS Code)"
{
  "terminal.integrated.fontFamily": "MesloLGS NF"
}
```

Save the file, then choose Terminal > New Terminal from VS Code's menu bar.
