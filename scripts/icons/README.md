# Site icons

`public/favicon.svg` is the source icon: a `>_` shell prompt that echoes the `> whoami` wordmark and flips colours in dark mode.
The PNGs are rendered from SVG with `rsvg-convert` (`brew install librsvg`):

```sh
rsvg-convert -w 32 -h 32 public/favicon.svg -o public/favicon-32.png
rsvg-convert -w 180 -h 180 scripts/icons/apple-touch-icon.svg -o public/apple-touch-icon.png
```

`favicon-32.png` is the fallback for browsers without SVG favicons; `apple-touch-icon.png` is the iOS home-screen icon (full-bleed, no transparency).
