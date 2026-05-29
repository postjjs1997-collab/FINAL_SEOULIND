# Brainall QA Checklist

## Viewports

- Desktop: 1440 x 900
- Desktop wide: 1920 x 1080
- Tablet: 820 x 1180
- Mobile: 390 x 844
- Reduced motion: enable `prefers-reduced-motion: reduce`

## Scroll Checkpoints

- Top: dark navy hero fills the viewport; header is transparent/white; `All`, brain video, `Brain`, tagline, and scroll cue are visible.
- Early hero scroll: header becomes white and hides on downward scroll; quick menu appears; left/right characters exit outward while the brain scales and travels.
- Mid hero scroll: brain fades out and the center `Brainall` interstitial appears with letter-spacing closing.
- Late hero scroll: `Brainall` exits upward; Korean fill-text resolves line by line.
- Reverse scroll: scrolling back upward reverses fill-text, center logo, brain travel, and initial typography because the hero uses scrubbed ScrollTrigger.
- Highlight: section transitions from dark to light; active text slides in; image panel wipes with `clip-path`; progress bar fills and autoplay advances.
- Marquee: blue brand strip loops smoothly without jumps.
- One Stop Solution: tabs and arrows update active slide; active slide scales up while neighbors shrink and fade.
- Product lineup: cards enter from the right with blur and opacity clearing; pointer follower appears on desktop hover.
- Data/global: metric cards reveal, numbers count up, global text fills on scroll, year resolves to 2026, and partner rows marquee in two directions.
- Family/media/inquiry: family cards loop and show blue hover overlay; media rows and inquiry form remain readable.

## Interaction Checks

- Desktop nav hover/focus opens the appropriate mega menu.
- Search icon opens full-screen search overlay; Escape and close button dismiss it.
- Mobile menu icon opens the drawer; drawer links close it.
- Quick menu top button scrolls back to the top.
- Highlight image can be swiped/dragged left or right to change slides.
- Solution tabs and arrows are keyboard/click reachable and maintain active styling.

## Responsive Checks

- At 390px, hero words, brain object, and tagline do not overflow the viewport.
- Mobile bottom quick menu stays fixed and does not cover primary content after body bottom padding.
- Header hides desktop nav and quote pill on mobile.
- Media rows stack cleanly with no horizontal overflow.
- Product row scrolls horizontally instead of shrinking cards into unreadable columns.

## Verification Run

- `npm run typecheck`
- `npm run build`
- Open `http://127.0.0.1:4173/`
- Open `index.html` directly and confirm it redirects to `standalone/index.html`
- Check console for React, GSAP, and runtime errors.
