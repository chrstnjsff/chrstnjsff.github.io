# OG image regeneration

`og.html` is the source for `public/og.png` (1200×630). It is kept OUT of `public/`
so its helper font copies never ship.

To regenerate:

1. Stage the source + fonts into `public/` temporarily:
   ```sh
   cp scripts/og/og.html public/__og.html
   cat node_modules/@fontsource-variable/geist/index.css \
       node_modules/@fontsource-variable/geist-mono/index.css \
       node_modules/@fontsource-variable/source-serif-4/index.css \
       node_modules/@fontsource-variable/source-serif-4/wght-italic.css > public/_fonts.css
   mkdir -p public/_f
   cp node_modules/@fontsource-variable/*/files/*.woff2 public/_f/
   sed -i '' 's#\./files/#/_f/#g' public/_fonts.css
   ```
2. Serve `public/` statically (the dev server's live-reload socket stalls headless Chrome) and
   capture exactly 1200×630 with headless Chrome. Do NOT crop afterwards with `sips`; it crops
   from the centre.
   ```sh
   (cd public && python3 -m http.server 4399) &
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
     --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 \
     --virtual-time-budget=3000 --screenshot=public/og.png http://localhost:4399/__og.html
   kill %1
   ```
3. Remove the staged files:
   ```sh
   rm -rf public/__og.html public/_fonts.css public/_f
   ```
