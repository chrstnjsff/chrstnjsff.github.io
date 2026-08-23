# Halftone portrait generation

`public/portrait.png` is generated from a photo with `halftone.swift`
(macOS only — uses Vision subject lift + CoreImage dot screen):

```sh
swift scripts/portrait/halftone.swift <photo.jpg> public/portrait.png \
  7     `# dot pitch in px` \
  0     `# screen angle, degrees` \
  1.02  `# contrast` \
  0.10  `# brightness` \
  0.68  `# gamma (lower = brighter midtones)` \
  768   `# output size in px (dot pitch scales with it: 6 at 768)`
```

Output is black dots on transparency; the site inverts it in dark mode.
