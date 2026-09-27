# chrstnjsff.github.io

Personal site with how-to guides and a contact form: <https://chrstnjsff.github.io/>

## Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) 7 (static output, zero client framework) |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4 via `@tailwindcss/vite` (CSS-first, no `tailwind.config.js`) |
| Type | Geist / Geist Mono / Source Serif 4 (self-hosted, Fontsource) + Geist Pixel for display |
| Hosting | GitHub Pages via GitHub Actions |

Every font and asset is self-hosted.
The one third-party request at runtime is the contact form on `/contact/`, which posts to [Web3Forms](https://web3forms.com).

## Content

| Path | What |
|---|---|
| `src/config/site.ts` | Name, links, navigation, and the Web3Forms access key (public by design) |
| `src/pages/index.astro` | Home page and its data (experience, selected work, reviews, resources) |
| `src/content/howto/<guide>/index.md` | A how-to guide's metadata and intro |
| `src/content/howto/<guide>/NN-<anchor>.md` | One collapsible step; `NN` orders it, `<anchor>` is its deep link |

Guide commands are checked with `npm run verify:guides` (macOS only: it uses `zsh`, `tmux`, `ghostty` and `brew info`).

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run check    # type-check .astro and .ts files
npm run preview  # serve the production build
```

## Theming

Colours live as RGB triplets in `src/styles/global.css` under `:root` and `.dark`,
surfaced to Tailwind through `@theme inline`.
The type scale (`text-caption` through `text-large`) lives in the same file.
Dark mode is a `.dark` class on `<html>`, set before first paint by an inline script in `src/layouts/Base.astro`, so there is no flash of the wrong theme.

## Open graph image

`public/og.png` is generated from `scripts/og/og.html`; see `scripts/og/README.md`.
