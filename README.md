# chrstnjsff.github.io

Personal one-page site — <https://chrstnjsff.github.io/>

## Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) 7 (static output, zero client framework) |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4 via `@tailwindcss/vite` (CSS-first, no `tailwind.config.js`) |
| Type | Geist / Geist Mono / Source Serif 4 (self-hosted, Fontsource) + Geist Pixel for display |
| Hosting | GitHub Pages via GitHub Actions |

No third-party requests at runtime — every font and asset is self-hosted.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Theming

Colours live as RGB triplets in `src/styles/global.css` under `:root` and `.dark`,
surfaced to Tailwind through `@theme inline`. Dark mode is a `.dark` class on `<html>`,
set before first paint by an inline script in `src/layouts/Base.astro` so there is no
flash of the wrong theme.

## Open graph image

`public/og.png` is generated from `scripts/og/og.html` — see `scripts/og/README.md`.
