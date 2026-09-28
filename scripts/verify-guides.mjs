#!/usr/bin/env node
// Verifies every how-to guide under src/content/howto/ against real tools.
//
//   node scripts/verify-guides.mjs
//
// Checks, per fenced code block and per file:
//   bash blocks        zsh -n syntax check
//   tmux config        blocks titled *.tmux.conf, and heredocs that write
//                      ~/.tmux.conf, sourced into a throwaway tmux server
//   ghostty config     ini blocks titled with a Ghostty config path, and
//                      heredocs that write one: ghostty +validate-config,
//                      plus every theme name against ghostty +list-themes
//   json               JSON.parse, for json blocks and heredocs to *.json
//   lua syntax         heredocs that write *.lua, compiled by Neovim's
//                      LuaJIT with loadfile, so nothing in them runs
//   heredoc files      zsh -n for shell rc files, bash -n for *.sh scripts,
//                      frontmatter for skills and subagents (optional
//                      for rules)
//   brew packages      brew info --json=v2 for every brew install/upgrade token
//   links              every https:// URL answers 2xx or 3xx
//   style              no em or en dashes, no "$ " prompts in bash blocks
//
// Read-only: it never installs anything and writes only to os.tmpdir().
// Exits non-zero when any check fails.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// HOWTO_DIR points the checks at another folder, e.g. broken test fixtures.
const HOWTO = process.env.HOWTO_DIR ? path.resolve(process.env.HOWTO_DIR) : path.join(ROOT, "src/content/howto");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "verify-guides-"));
const URL_TIMEOUT_MS = 15_000;
const URL_CONCURRENCY = 6;
const USER_AGENT = "verify-guides/1.0 (+https://christianaquino.dev)";

// ---------------------------------------------------------------- results

const CHECKS = [
  "bash syntax",
  "tmux config",
  "ghostty config",
  "json",
  "lua syntax",
  "heredoc files",
  "brew packages",
  "links",
  "style",
];
const results = new Map(CHECKS.map((c) => [c, []]));

function record(check, status, where, detail = "") {
  results.get(check).push({ status, where, detail });
}

// ---------------------------------------------------------------- helpers

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: "utf8", timeout: 60_000, ...opts });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`.replaceAll("\0", "").trim();
  return { ok: r.status === 0 && !r.error, status: r.status, out, stdout: r.stdout ?? "" };
}

function has(cmd) {
  return spawnSync("/bin/sh", ["-c", `command -v ${cmd}`], { encoding: "utf8" }).status === 0;
}

let tmpCount = 0;
function tmpFile(name, content) {
  const file = path.join(TMP, `${++tmpCount}-${name}`);
  fs.writeFileSync(file, content);
  return file;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith(".md") ? [p] : [];
  });
}

const rel = (file) => path.relative(ROOT, file);

// ---------------------------------------------------------------- parsing

/** Fenced code blocks with language, title and the line they start on. */
function codeBlocks(text) {
  const lines = text.split("\n");
  const blocks = [];
  let open = null;
  lines.forEach((line, i) => {
    if (!open) {
      const m = line.match(/^ {0,3}(`{3,}|~{3,})\s*([\w+-]*)\s*(.*)$/);
      if (m) open = { fence: m[1], lang: m[2] || "plaintext", meta: m[3], line: i + 1, body: [] };
      return;
    }
    const close = line.match(/^ {0,3}(`{3,}|~{3,})\s*$/);
    if (close && close[1][0] === open.fence[0] && close[1].length >= open.fence.length) {
      const title = open.meta.match(/title="([^"]+)"/)?.[1] ?? "";
      blocks.push({ lang: open.lang, title, line: open.line, code: open.body.join("\n") + "\n" });
      open = null;
      return;
    }
    open.body.push(line);
  });
  return blocks;
}

/** Heredocs in a shell block: `cat > path <<'EOF'` or `cat >> path <<EOF`. */
function heredocs(code) {
  const lines = code.split("\n");
  const found = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/\bcat\s+(>>?)\s*(\S+)\s+<<-?\s*(['"]?)(\w+)\3\s*$/);
    if (!m) continue;
    const [, mode, target, , delim] = m;
    const body = [];
    let j = i + 1;
    while (j < lines.length && lines[j] !== delim) body.push(lines[j++]);
    found.push({ target, append: mode === ">>", body: body.join("\n") + "\n", offset: i });
    i = j;
  }
  return found;
}

function classify(target) {
  if (/ghostty\/themes\/[^/]+$/.test(target)) return "ghostty-theme";
  if (/ghostty\/config(\.ghostty)?$/.test(target)) return "ghostty-config";
  if (/\.tmux\.conf$/.test(target)) return "tmux";
  if (/\.json$/.test(target)) return "json";
  if (/\.lua$/.test(target)) return "lua";
  if (/\.(zshrc|zprofile|bashrc)$/.test(target)) return "shell";
  if (/\.sh$/.test(target)) return "script";
  if (/\/SKILL\.md$/.test(target)) return "skill";
  if (/agents\/[^/]+\.md$/.test(target)) return "agent";
  if (/rules\/[^/]+\.md$/.test(target)) return "rule";
  return "other";
}

function frontmatter(body) {
  const m = body.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const keys = new Set([...m[1].matchAll(/^([A-Za-z][\w-]*):/gm)].map((k) => k[1]));
  return { keys };
}

// ---------------------------------------------------------------- collect

const files = walk(HOWTO).sort();
const items = []; // everything a validator needs, gathered in one pass
const urls = new Map(); // url -> first place it appears
const brewTokens = new Map(); // "cask:name" | "formula:name" | "any:name" -> where

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const where = rel(file);

  // Style: the owner's hard rules.
  text.split("\n").forEach((line, i) => {
    if (/[—–]/.test(line)) record("style", "fail", `${where}:${i + 1}`, "em or en dash");
  });

  for (const m of text.matchAll(/https:\/\/[^\s<>"'`)\]]+/g)) {
    const url = m[0].replace(/[.,;:!?]+$/, "");
    const line = text.slice(0, m.index).split("\n").length;
    if (!urls.has(url)) urls.set(url, `${where}:${line}`);
  }

  for (const block of codeBlocks(text)) {
    const at = `${where}:${block.line}`;
    items.push({ ...block, at });

    if (block.lang === "bash") {
      block.code.split("\n").forEach((l, i) => {
        if (/^\s*\$ /.test(l)) record("style", "fail", `${where}:${block.line + i + 1}`, 'prompt character "$ " in a bash block');
      });
      for (const m of block.code.matchAll(/\bbrew\s+(install|upgrade)\s+([^;&|#\n]+)/g)) {
        const args = m[2].trim().split(/\s+/);
        const cask = args.includes("--cask");
        for (const name of args.filter((a) => !a.startsWith("-"))) {
          const key = m[1] === "upgrade" ? `any:${name}` : `${cask ? "cask" : "formula"}:${name}`;
          if (!brewTokens.has(key)) brewTokens.set(key, at);
        }
      }
    }
  }
}
const style = results.get("style");
if (!style.some((r) => r.status === "fail")) record("style", "pass", `${files.length} files`, "no em or en dashes, no prompt characters");

// ---------------------------------------------------------------- bash

const hasZsh = has("zsh");
for (const b of items.filter((b) => b.lang === "bash")) {
  if (/\.tmux\.conf/.test(b.title)) continue; // tmux syntax, checked below
  if (!hasZsh) {
    record("bash syntax", "skip", b.at, "zsh not found");
    continue;
  }
  const r = run("zsh", ["-n", tmpFile("block.sh", b.code)]);
  record("bash syntax", r.ok ? "pass" : "fail", b.at, r.ok ? "" : r.out);
}

// Heredoc bodies written by bash blocks, and titled file-content blocks.
const written = [];
for (const b of items.filter((b) => b.lang === "bash")) {
  for (const h of heredocs(b.code)) written.push({ ...h, kind: classify(h.target), at: `${b.at} (${h.target})` });
}
for (const b of items) {
  if (!b.title) continue;
  const kind = classify(b.title);
  if (kind === "other" || b.lang === "text") continue;
  if (kind === "tmux" && b.lang !== "bash") continue;
  written.push({ target: b.title, body: b.code, kind, at: `${b.at} (${b.title})`, snippet: true });
}

// ---------------------------------------------------------------- tmux

if (!has("tmux")) {
  for (const w of written.filter((w) => w.kind === "tmux")) record("tmux config", "skip", w.at, "tmux not found");
} else {
  // A throwaway HOME with a no-op TPM, so `run '~/.tmux/plugins/tpm/tpm'`
  // succeeds without touching the real plugins. `-f file start-server`
  // swallows config errors, so the file is loaded with source-file instead.
  const home = fs.mkdtempSync(path.join(TMP, "tmux-home-"));
  fs.mkdirSync(path.join(home, ".tmux/plugins/tpm"), { recursive: true });
  fs.writeFileSync(path.join(home, ".tmux/plugins/tpm/tpm"), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
  const env = { ...process.env, HOME: home };
  delete env.TMUX;
  for (const w of written.filter((w) => w.kind === "tmux")) {
    const conf = tmpFile("tmux.conf", w.body);
    const sock = path.join(home, `s${tmpCount}`);
    const r = run("tmux", ["-S", sock, "-f", "/dev/null", "start-server", ";", "source-file", conf, ";", "kill-server"], { env });
    const ok = r.status === 0 && r.out === "";
    record("tmux config", ok ? "pass" : "fail", w.at, ok ? "" : r.out || `exit ${r.status}`);
  }
}

// ---------------------------------------------------------------- ghostty

const ghosttyItems = written.filter((w) => w.kind === "ghostty-config" || w.kind === "ghostty-theme");
if (!has("ghostty")) {
  for (const w of ghosttyItems) record("ghostty config", "skip", w.at, "ghostty not found");
} else if (ghosttyItems.length) {
  // Custom themes from the guides go into a throwaway config dir, so a
  // config that says `theme = coolnight` resolves the same way it will on
  // the reader's Mac.
  const home = fs.mkdtempSync(path.join(TMP, "ghostty-home-"));
  const themes = path.join(home, ".config/ghostty/themes");
  fs.mkdirSync(themes, { recursive: true });
  for (const w of ghosttyItems.filter((w) => w.kind === "ghostty-theme")) {
    fs.writeFileSync(path.join(themes, path.basename(w.target)), w.body);
  }
  const env = { ...process.env, HOME: home, XDG_CONFIG_HOME: path.join(home, ".config") };
  const list = run("ghostty", ["+list-themes", "--plain"], { env });
  const known = new Set(list.out.split("\n").map((l) => l.replace(/\s+\((resources|user)\)\s*$/, "").trim()));

  for (const w of ghosttyItems) {
    const file = tmpFile("ghostty-config", w.body);
    const r = run("ghostty", ["+validate-config", `--config-file=${file}`], { env });
    const problems = r.ok && r.out === "" ? [] : [r.out || `exit ${r.status}`];
    // validate-config accepts a misspelled name inside dark:...,light:...,
    // so check every theme name against the installed list as well.
    for (const m of w.body.matchAll(/^\s*theme\s*=\s*(.+)$/gm)) {
      for (const part of m[1].split(",")) {
        const name = part.trim().replace(/^(dark|light):/, "").replace(/^"(.*)"$/, "$1");
        if (name && !path.isAbsolute(name) && !known.has(name)) problems.push(`unknown theme "${name}"`);
      }
    }
    record("ghostty config", problems.length ? "fail" : "pass", w.at, problems.join("; "));
  }
}

// ---------------------------------------------------------------- json

for (const b of items.filter((b) => b.lang === "json" || b.lang === "jsonc")) {
  try {
    JSON.parse(b.code);
    record("json", "pass", b.at);
  } catch (e) {
    record("json", "fail", b.at, e.message);
  }
}
for (const w of written.filter((w) => w.kind === "json" && !w.snippet)) {
  try {
    JSON.parse(w.body);
    record("json", "pass", w.at);
  } catch (e) {
    record("json", "fail", w.at, e.message);
  }
}

// ---------------------------------------------------------------- lua

const luaItems = written.filter((w) => w.kind === "lua");
if (!has("nvim")) {
  for (const w of luaItems) record("lua syntax", "skip", w.at, "nvim not found");
} else if (luaItems.length) {
  // loadfile only compiles the chunk, so plugin specs are checked without loading any plugin.
  const checker = tmpFile("check.lua", "local f, err = loadfile(_G.arg[1])\nif not f then io.stderr:write(err) os.exit(1) end\n");
  for (const w of luaItems) {
    const r = run("nvim", ["--clean", "--headless", "-l", checker, tmpFile("chunk.lua", w.body)]);
    record("lua syntax", r.ok ? "pass" : "fail", w.at, r.ok ? "" : r.out);
  }
}

// ---------------------------------------------------------------- heredoc files

const REQUIRED = { skill: ["description"], agent: ["name", "description"], rule: [] };
for (const w of written.filter((w) => !w.snippet)) {
  if (w.kind === "shell") {
    if (!hasZsh) {
      record("heredoc files", "skip", w.at, "zsh not found");
      continue;
    }
    const r = run("zsh", ["-n", tmpFile("rc.zsh", w.body)]);
    record("heredoc files", r.ok ? "pass" : "fail", w.at, r.ok ? "" : r.out);
  } else if (w.kind === "script") {
    // Hook and status line scripts start with #!/bin/bash, so check them with bash.
    const r = run("bash", ["-n", tmpFile("script.sh", w.body)]);
    record("heredoc files", r.ok ? "pass" : "fail", w.at, r.ok ? "" : r.out);
  } else if (w.kind in REQUIRED) {
    const fm = frontmatter(w.body);
    // A rule needs frontmatter only to set `paths`; plain Markdown is an always-on rule.
    const missing = fm
      ? REQUIRED[w.kind].filter((k) => !fm.keys.has(k))
      : w.kind === "rule"
        ? []
        : ["frontmatter"];
    record("heredoc files", missing.length ? "fail" : "pass", w.at, missing.length ? `missing ${missing.join(", ")}` : "");
  } else if (w.kind === "other") {
    record("heredoc files", "skip", w.at, "no validator for this file type");
  }
}

// ---------------------------------------------------------------- brew

if (!has("brew")) {
  for (const [key, at] of brewTokens) record("brew packages", "skip", `${at} (${key})`, "brew not found");
} else {
  const env = { ...process.env, HOMEBREW_NO_AUTO_UPDATE: "1", HOMEBREW_NO_ANALYTICS: "1" };
  for (const [key, at] of brewTokens) {
    const [type, name] = key.split(":");
    const args = ["info", "--json=v2", ...(type === "cask" ? ["--cask"] : []), name];
    const r = run("brew", args, { env });
    let ok = false;
    if (r.ok) {
      const { formulae = [], casks = [] } = JSON.parse(r.stdout);
      ok = type === "cask" ? casks.length > 0 : type === "formula" ? formulae.length > 0 : formulae.length + casks.length > 0;
    }
    const label = type === "any" ? name : `${type} ${name}`;
    record("brew packages", ok ? "pass" : "fail", `${at} (${label})`, ok ? "" : r.out.split("\n")[0]);
  }
}

// ---------------------------------------------------------------- links

async function probe(url) {
  const attempt = async (method) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), URL_TIMEOUT_MS);
    try {
      const res = await fetch(url, { method, redirect: "follow", signal: ctrl.signal, headers: { "user-agent": USER_AGENT } });
      await res.body?.cancel().catch(() => {});
      return { status: res.status };
    } catch (e) {
      return { error: e.name === "AbortError" ? `timeout after ${URL_TIMEOUT_MS / 1000}s` : e.cause?.code ?? e.message };
    } finally {
      clearTimeout(timer);
    }
  };
  let r = await attempt("HEAD");
  // Some hosts reject HEAD; ask again with GET before calling it broken.
  if (r.error || [403, 405, 501].includes(r.status)) r = await attempt("GET");
  if (r.status === 429) {
    await new Promise((ok) => setTimeout(ok, 3000));
    r = await attempt("GET");
  }
  return r;
}

async function checkLinks() {
  const queue = [...urls];
  const worker = async () => {
    while (queue.length) {
      const [url, at] = queue.shift();
      const r = await probe(url);
      const ok = r.status >= 200 && r.status < 400;
      record("links", ok ? "pass" : "fail", `${at} ${url}`, ok ? "" : r.error ?? `HTTP ${r.status}`);
    }
  };
  await Promise.all(Array.from({ length: URL_CONCURRENCY }, worker));
}
await checkLinks();

// ---------------------------------------------------------------- report

let failed = 0;
let passed = 0;
let skipped = 0;
console.log(`verify-guides: ${files.length} Markdown files, ${items.length} code blocks, ${urls.size} unique URLs\n`);
for (const check of CHECKS) {
  const rows = results.get(check);
  const n = (s) => rows.filter((r) => r.status === s).length;
  const [p, f, s] = [n("pass"), n("fail"), n("skip")];
  passed += p;
  failed += f;
  skipped += s;
  const mark = f ? "FAIL" : rows.length === 0 ? "none" : "ok  ";
  console.log(`${mark}  ${check.padEnd(15)} ${p} passed, ${f} failed, ${s} skipped`);
  for (const r of rows.filter((r) => r.status !== "pass")) {
    const tag = r.status === "fail" ? "  x" : "  -";
    console.log(`${tag} ${r.where}${r.detail ? `\n      ${r.detail.split("\n").join("\n      ")}` : ""}`);
  }
}
console.log(`\n${passed} passed, ${failed} failed, ${skipped} skipped`);

fs.rmSync(TMP, { recursive: true, force: true });
process.exit(failed ? 1 : 0);
