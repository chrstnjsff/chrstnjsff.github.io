// Guide page behaviour: copy buttons, deep links into collapsed steps,
// and expand/collapse all. Everything here is an enhancement; without
// JavaScript the steps still open and the code can be selected by hand.

const liveRegion = document.getElementById("howto-status");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const steps = Array.from(document.querySelectorAll<HTMLDetailsElement>("details.disclosure"));

function announce(message: string) {
  if (!liveRegion) return;
  // Clear first so repeating the same message is announced again.
  liveRegion.textContent = "";
  window.setTimeout(() => (liveRegion.textContent = message), 50);
}

// ---- copy buttons ----------------------------------------------------
for (const button of document.querySelectorAll<HTMLButtonElement>("button[data-copy]")) {
  button.hidden = false;
  let reset: number | undefined;
  button.addEventListener("click", async () => {
    const code = button.closest(".code-frame")?.querySelector("pre code");
    const text = code?.textContent ?? "";
    // Clipboard access needs a secure context and a user gesture; both
    // hold on the live site. If it is refused, say so rather than fail silently.
    let ok = true;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      ok = false;
    }
    button.textContent = ok ? "Copied" : "Select and copy";
    announce(ok ? "Copied to clipboard" : "Copy failed. Select the code and copy it manually.");
    window.clearTimeout(reset);
    reset = window.setTimeout(() => (button.textContent = "Copy"), 1800);
  });
}

// ---- deep links: /how-to/<guide>/#<step> -----------------------------
function openFromHash(moveFocus: boolean) {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  for (let d = target.closest("details"); d; d = d.parentElement?.closest("details") ?? null) {
    d.open = true;
  }
  requestAnimationFrame(() => {
    target.scrollIntoView({ block: "start", behavior: reduceMotion.matches ? "auto" : "smooth" });
    if (moveFocus) target.querySelector("summary")?.focus({ preventScroll: true });
  });
}

window.addEventListener("hashchange", () => openFromHash(true));
openFromHash(false);

// Opening a step by hand puts its link in the address bar, ready to
// share. Listening to the summary click (Enter and Space fire it too)
// rather than `toggle` ignores programmatic opens like "Expand all".
for (const step of steps) {
  step.querySelector("summary")?.addEventListener("click", () => {
    // The click's default action opens a closed step right after this.
    if (!step.open && step.id) history.replaceState(null, "", `#${step.id}`);
  });
}

// ---- expand / collapse all -------------------------------------------
const toggleAll = document.querySelector<HTMLButtonElement>("button[data-toggle-all]");
if (toggleAll && steps.length) {
  const allOpen = () => steps.every((s) => s.open);
  const render = () => {
    toggleAll.textContent = allOpen() ? "Collapse all" : "Expand all";
    toggleAll.setAttribute("aria-expanded", String(allOpen()));
  };
  toggleAll.hidden = false;
  render();
  toggleAll.addEventListener("click", () => {
    const open = !allOpen();
    for (const s of steps) s.open = open;
    render();
  });
  for (const s of steps) s.addEventListener("toggle", render);
}

export {};
