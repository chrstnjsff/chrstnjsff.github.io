# chrstnjsff.github.io

Personal site with how-to guides and a contact form: <https://christianaquino.dev/>

## Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) 7 (static output, zero client framework) |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4 via `@tailwindcss/vite` (CSS-first, no `tailwind.config.js`) |
| Type | Geist, Geist Mono and Space Grotesk for display (self-hosted, Fontsource) |
| Icons | Lucide-style line icons in `src/components/Icon.astro`; brand marks from [Simple Icons](https://simpleicons.org) at build time |
| Hosting | [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) static assets, deployed by Workers Builds on every push to `main` (`wrangler.jsonc`) and daily through a deploy hook (`.github/workflows/rebuild.yml`); the old `chrstnjsff.github.io` address redirects here (`.github/workflows/pages-redirect.yml`) |

Every font and asset is self-hosted.
The one third-party request at runtime is the contact form on `/contact/`, which posts to [Web3Forms](https://web3forms.com).

## Content

| Path | What |
|---|---|
| `src/config/site.ts` | Name, links, navigation, and the Web3Forms access key (public by design) |
| `src/data/portfolio.ts` | Site content: employer logos, projects, every role with its CV points, certifications, stack, reviews, resources and gear |
| `src/pages/index.astro` | Home page layout; styles in `src/styles/home.css` |
| `src/pages/experience/index.astro` | Full history: every role with its points, then education and certifications |
| `src/components/ProjectShot.astro` | The drawn project thumbnails (no company names) |
| `public/resume.pdf` | The CV from `~/job-hunt/cv-builder`, with the phone number replaced by the site link; CV links open it in a new tab |
| `src/content/howto/<guide>/index.md` | A how-to guide's metadata and intro |
| `src/content/howto/<guide>/NN-<anchor>.md` | One collapsible step; `NN` orders it, `<anchor>` is its deep link |

Guide commands are checked with `npm run verify:guides` (macOS only: it uses `zsh`, `tmux`, `ghostty`, `nvim` and `brew info`).

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run check    # type-check .astro and .ts files
npm run preview  # serve the production build
```

## Theming

Colours live in `src/styles/global.css` under `:root` (light) and `.dark` (Tokyo Night Storm, as translucent glass over a glow wallpaper).
The RGB triplets are surfaced to Tailwind through `@theme inline`; the full colours beside them serve the shell and the home page.
The type scale (`text-caption` through `text-large`) lives in the same file.
Light is the default.
Dark mode is a `.dark` class on `<html>`, set before first paint by an inline script in `src/layouts/Base.astro` when the visitor turned it on, so there is no flash of the wrong theme.

## Open graph image

`public/og.png` is generated from `scripts/og/og.html`; see `scripts/og/README.md`.
