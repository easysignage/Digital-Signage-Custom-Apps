# Signage design rules (theme reference)

Apply these to every app. `assets/theme.css` implements them; build on it
rather than restyling from scratch. Full guide with sources:
https://github.com/easysignage/Digital-Signage-Custom-Apps/blob/main/docs/theme-guide.md

## Setup

Copy `assets/theme.css`, `assets/theme.js` and `assets/fonts/` into the app
folder, next to `easysignage.js`.

```html
<html lang="en">
<link rel="stylesheet" href="theme.css" />   <!-- first -->
<link rel="stylesheet" href="style.css" />   <!-- app overrides -->
<script src="easysignage.js"></script>
<script src="theme.js"></script>
<script src="app.js"></script>
```

```js
var panel = EasySignage.read();
EasySignageTheme.apply(panel); // theme + accent tags, is-portrait/is-landscape on <html>
```

Tags: `theme` = `dark` (default) | `light` | `contrast`; `accent` = hex colour.

## Tokens (use these, don't hard-code sizes)

Unit: `--u` = 1% of the shorter screen side (1vh landscape, 1vw portrait),
about 10.8px on 1080p.

| Variable | Size | ~px | Use |
|---|---|---|---|
| `--text-2xl` | 13u | 140 | hero numbers, clocks, prices |
| `--text-xl` | 8.5u | 92 | `h1` |
| `--text-lg` | 6u | 65 | `h2` |
| `--text-md` | 4.4u | 48 | body (default) |
| `--text-sm` | 3.2u | 35 | captions |
| `--text-xs` | 2.6u | 28 | minimum, labels only |

Space: `--space-1/2/3/4/6/8` (1u to 8u). Safe area: `--safe-x` (5vw),
`--safe-y` (5vh). Radius: `--radius`. Motion: `--duration-fast` (250ms),
`--duration` (600ms), `--ease`.

Colour: `--bg`, `--surface`, `--line`, `--text`, `--muted`, `--accent`,
`--on-accent`, `--success`, `--warning`, `--danger`, `--overlay`.

Classes: `.screen` (full screen with safe margins), `.center`, `.row`,
`.grow`, `.display`, `.label`, `.muted`, `.accent`, `.small`, `.card`,
`.badge`, `.banner`, `.fade-in`.

## Branding

Override colours only, scoped so the `theme` tag still works:

```css
:root:not(.theme-light):not(.theme-contrast) {
  --bg: #1b1410; --surface: #2a201a; --text: #f6efe7;
  --muted: #c9b8a3; --accent: #e8b06a; --on-accent: #1b1410;
}
```

Verify each new pair: text and muted at least 4.5:1 against `--bg` and
`--surface` (target 7:1); accent at least 4.5:1 if used for text.

Brand font: bundle files in `fonts/`, add `@font-face` with a relative
`url()`, set `--font` (and `--font-display` for headings). Plain sans-serif
only.

## Rules

**Typography**
- Plain sans-serif. No script, italic, decorative, condensed or thin (100 to 300) faces.
- At most 2 fonts and 3 levels of hierarchy.
- Body text at least `--text-md`; nothing below `--text-xs`.
- Distance: about 1 inch of letter height per 10 ft. Further viewing means
  bigger text and fewer words; don't shrink.
- Mixed case. ALL CAPS only for short labels (`.label`).
- Bold (700) for headlines, prices and numbers; regular (400) for body.
- Use `font-variant-numeric: tabular-nums` for changing numbers (clocks,
  timers) so they don't jitter.

**Words**
- 3×5 rule: up to 3 lines of 5 words. At most 30 to 40 words per screen.
- One message per screen; rotate rather than cram.
- On screen at least 5 to 10 s, about 1 s per word.

**Colour**
- Dark background, off-white text by default. Use the light theme only for a
  brand or bright room; use contrast for wayfinding or low vision.
- Contrast at least 4.5:1 (target 7:1 or more; prices and key info 7:1).
- Never colour alone: add a word or icon.
- Avoid red on white, red/blue and red/green pairs, and text directly on
  photos (use an `--overlay` or a gradient).

**Layout**
- Everything inside the 5% safe area (`.screen`).
- One hero element plus at most two supporting ones.
- Works in landscape and portrait (`is-portrait` class).
- QR code width at least scan distance ÷ 10, never under 2 cm.
- Menu boards: about 6 to 8 items on a 32" screen, 12 to 16 on a 55".

**Motion**
- Nothing flashes more than 3 times per second.
- Slow fades (250 to 600 ms), no spinning or bouncing; keep key info still.
- No fast tickers; if scrolling, about 10 to 15 characters per second.
- Animations off under `prefers-reduced-motion` (theme.css does this).
- Avoid bright static elements in the same place for hours (burn-in).

**Semantics**
- `<html lang>` set, real headings, `alt` text on meaningful images,
  `alt=""` on decorative ones. Captions on video.
