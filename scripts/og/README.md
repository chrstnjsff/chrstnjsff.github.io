# OG image regeneration

`og.html` is the source for `public/og.png` (1200×630). It is kept OUT of `public/`
so its helper font copies never ship.

To regenerate:

1. Stage the source + fonts into `public/` temporarily:
   ```sh
   cp scripts/og/og.html public/__og.html
   cat node_modules/@fontsource-variable/geist/index.css \
       node_modules/@fontsource-variable/geist-mono/index.css \
       node_modules/@fontsource-variable/source-serif-4/index.css > public/_fonts.css
   mkdir -p public/_f
   cp node_modules/@fontsource-variable/*/files/*.woff2 public/_f/
   sed -i '' 's#\./files/#/_f/#g' public/_fonts.css
   ```
2. `npm run dev`, then screenshot `http://localhost:4321/__og.html` clipped to exactly 1200×630
   (Chrome DevTools device toolbar at 1200×630, or CDP `Page.captureScreenshot` with a clip region —
   do NOT crop afterwards with `sips`, it crops from the centre).
3. Save to `public/og.png`, then remove the staged files:
   ```sh
   rm -rf public/__og.html public/_fonts.css public/_f
   ```
