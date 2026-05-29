# Brainall Motion Audit

Reference: `https://brainall.kr/`

This rebuild follows the visible scroll and interaction architecture from the reference site. The implementation is a new React/TypeScript build, with reference-matched motion roles, editable data, and replaceable media URLs.

## Scene Map

| Area | Reference behavior | Implementation |
| --- | --- | --- |
| Fixed header | Transparent white header over the navy hero, then white header with dark text after scroll. Header hides while scrolling down and returns on upward scroll. Desktop nav exposes grouped submenus. | `Header.tsx` tracks fill and direction state, renders desktop mega menu, mobile drawer, and full-screen search overlay. |
| Hero | `550svh` sticky navy scene. `All` and `Brain` split into characters and load from `translateY(100%)`. On scroll the left/right characters exit outward, subtitle slides right, the brain video moves left/top and fades, then `Brainall` appears with letter-spacing closing from `10vw` to `0`. Final Korean statement reveals through text-fill. | `BrainallPage.tsx` uses one scrubbed GSAP timeline that reverses when scrolling back up. Timing values live in `motionConfig`. |
| Floating quick menu | Desktop vertical blue quick-action rail appears after initial scroll. Mobile has a fixed bottom blue action bar with a separate top button. | `QuickMenu.tsx` switches desktop rail visibility after a small threshold and renders the mobile bottom bar. |
| Highlight slider | Dark-to-light transition as hero exits. Left text slides/fades by active slide, right image uses a `clip-path` wipe, and pagination bars fill over the autoplay interval. | `HighlightSlider` uses active state, swipe/pointer navigation, interval autoplay, clip-path transitions, and ScrollTrigger brightness fade. |
| Brand marquee | Blue horizontal strip repeats the English brand message and Brainall logo over a long continuous marquee. | `BrandMarquee` uses an 80s CSS marquee, matching the slow reference cadence. |
| One Stop Solution | Tabs, active underline, centered carousel slides. Active slide scales to 1, side slides shrink to 0.8, and only active slide metadata is visible. | `SolutionSection` uses a responsive carousel track, 3s autoplay, arrow controls, tab sync, and active slide scale/opacity transitions. |
| Product lineup | Product cards enter from the right with opacity 0 and blur, then settle into a horizontal row. Hover uses a custom pointer. | `LineupSection` uses IntersectionObserver-triggered blur/translate reveal, staggered delays, fixed card dimensions, product imagery, and a `VIEW` pointer follower. |
| AI/Data | Data section reveal plus delayed count-up metrics. | `DataSection` starts count-up 800ms after entering view and eases over 1800ms. |
| Global partnership | Fill-text scrub, large year counter, video/globe visual, two partner logo marquee rows. | `GlobalSection` uses ScrollTrigger for text fill and year count, plus dual-direction partner rails. |
| Family / media / inquiry | Family carousel cards with image hover overlay, media rows, and quote inquiry form. | `FamilySection`, `MediaSection`, and `InquirySection` mirror the reference hierarchy, with family cards looping horizontally and revealing a blue blurred overlay on hover. |

## Motion Decisions

- The hero is the highest-priority scene, so it uses one sticky viewport and a scrubbed GSAP timeline instead of normal section reveals.
- Hero reverse playback is handled by ScrollTrigger scrub, not by one-way class toggles.
- Media-heavy areas use replaceable URLs in `src/data/brainall.ts` so imagery can be swapped without changing component motion.
- Blur/y/opacity reveals are applied to secondary sections through `[data-reveal]` and ScrollTrigger.
- Mobile keeps the same scene order with shorter hero scroll length, smaller type, bottom quick menu, and no desktop mega menu.

## Main Files

- `src/components/BrainallPage.tsx`: page scenes, GSAP hero timeline, sliders, count-up, and section behavior.
- `src/components/Header.tsx`: fixed header, mega menu, mobile drawer, search overlay.
- `src/components/QuickMenu.tsx`: desktop rail and mobile bottom quick menu.
- `src/components/BrainallLogo.tsx`: local Brainall-style mark and wordmark.
- `src/data/brainall.ts`: editable navigation, media URLs, highlights, solutions, products, partners, family sites, and media rows.
- `src/motion/config.ts`: scroll lengths, durations, delays, offsets, and easing values.
- `src/styles/layout.css`: visual system, responsive layout, and scene styling.
- `src/styles/motion.css`: scroll cue, marquee, progress bars, hover, and reduced-motion rules.
