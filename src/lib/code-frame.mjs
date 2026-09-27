// Shiki transformer: wraps every fenced code block in a titled frame
// with a copy button, at build time, so there is no layout shift.
//   ```bash title="~/.zshrc"   -> bar reads "~/.zshrc"
//   ```bash                    -> bar reads "Terminal"
// The button ships `hidden`; the page script reveals it once
// JavaScript can actually copy.

const LABELS = {
  bash: "Terminal",
  sh: "Terminal",
  shell: "Terminal",
  zsh: "Terminal",
  json: "JSON",
  jsonc: "JSON",
  yaml: "YAML",
  toml: "TOML",
  ini: "Config",
  markdown: "Markdown",
  md: "Markdown",
  plaintext: "Text",
  text: "Text",
};

const el = (tagName, properties, children) => ({ type: "element", tagName, properties, children });
const text = (value) => ({ type: "text", value });

export function codeFrame() {
  return {
    name: "code-frame",
    root(root) {
      const pre = root.children.find((n) => n.type === "element" && n.tagName === "pre");
      if (!pre) return;
      const meta = this.options.meta?.__raw ?? "";
      const title = meta.match(/title="([^"]+)"/)?.[1];
      const lang = this.options.lang ?? "plaintext";
      const label = title ?? LABELS[lang] ?? lang;

      root.children = [
        el("figure", { className: ["code-frame"] }, [
          el("figcaption", { className: ["code-frame-bar"] }, [
            el("span", { className: ["code-frame-title"] }, [text(label)]),
            el(
              "button",
              { type: "button", className: ["code-copy"], dataCopy: true, hidden: true, ariaLabel: `Copy code: ${label}` },
              [text("Copy")],
            ),
          ]),
          pre,
        ]),
      ];
    },
  };
}
