# Signage theme guide

How content should look on a screen, and the ready-made theme that does it
for you. People read signage from across a room, at an angle, often while
walking past, and they include people with low vision. This guide turns
signage research into concrete defaults.

**The short version:** start from [`sdk/theme.css`](../sdk/theme.css). It
already applies the rules below. Change the colours to match your brand, keep
the sizes, and keep each screen to one short message.

## Using the theme

Every example and the starter template use the theme. To add it to an app:

```html
<link rel="stylesheet" href="theme.css" />   <!-- first -->
<link rel="stylesheet" href="style.css" />   <!-- your overrides -->
...
<script src="easysignage.js"></script>
<script src="theme.js"></script>
<script>
  var panel = EasySignage.read();
  EasySignageTheme.apply(panel);   // reads the theme and accent tags
</script>
```

Copy `theme.css`, `theme.js` and the `fonts/` folder from `sdk/` into your
app folder.

### Player tags

| Tag | Values | Effect |
|---|---|---|
| `theme` | `dark` (default), `light`, `contrast` | Colour scheme for this screen |
| `accent` | Hex colour, e.g. `#ff6a00` | Highlight colour (headlines, prices, badges) |

`theme.js` also adds `is-portrait` or `is-landscape` to `<html>` so you can
adjust layouts.

### Building blocks

| Class | Use |
|---|---|
| `.screen` | Full-screen container with the safe-area margin |
| `.center` | Centre content (with `.screen`) |
| `.row`, `.grow` | Flex row; fill remaining space |
| `.display` | Hero text: clocks, prices, big numbers |
| `.label` | Short uppercase label above a heading |
| `.muted`, `.accent`, `.small` | Secondary colour, highlight colour, smaller text |
| `.card` | Panel on the surface colour |
| `.badge` | Small pill, e.g. "New", "Vegan" |
| `.banner` | Full-width call-out bar |
| `.fade-in` | Gentle entrance animation (off for reduced motion) |

### Branding

Override variables in your own CSS. Leave the size variables alone.

```css
:root:not(.theme-light):not(.theme-contrast) {
  --bg: #1b1410;
  --surface: #2a201a;
  --text: #f6efe7;
  --muted: #c9b8a3;
  --accent: #e8b06a;     /* your brand colour */
  --on-accent: #1b1410;  /* text on the brand colour */
}
```

The `:not(...)` keeps the `light` and `contrast` tags working. See
[menu-board](../examples/menu-board/style.css) for a full example. Check
every new colour pair with a contrast checker (see [Colour](#colour)).

## Typography

### Font

The theme bundles **[Atkinson Hyperlegible](https://github.com/googlefonts/atkinson-hyperlegible)**
(SIL Open Font License, 400 and 700 weights, about 28 KB). The Braille
Institute designed it so that easily confused characters look different:
`I l 1`, `O 0`, `B 8`. It's bundled because signage players ship very
different system fonts. Some barely have any, so a font left to the player
looks different, or broken, from screen to screen.

To use a brand font instead, bundle its files in `fonts/`, add an
`@font-face`, and set `--font` (and `--font-display` for headings). Choose:

- A plain **sans-serif** with a large x-height and open shapes. Good
  open-licence choices: Inter, Roboto, Open Sans, Source Sans 3, Lato, Work
  Sans (body); Montserrat, Oswald (headings only). Check the licence before
  bundling.
- **No script, italic, decorative, condensed or thin faces.** The ADA
  standard for visual signs (section 703.5) excludes italic, script and
  decorative faces.
- **At most two fonts and three levels of hierarchy.**

### Weight

| Use | Weight |
|---|---|
| Headlines, prices, numbers | 700 (bold) |
| Body text | 400 (regular) |
| Avoid | 100 to 300 (thin, light): they disappear at a distance |

### Size

The theme measures size in `u`, where **1u = 1% of the screen's shorter
side**, so sizes match in landscape and portrait. On a 1080p screen, 1u is
about 10.8px.

| Variable | Size | ~px at 1080p | Use |
|---|---|---|---|
| `--text-2xl` | 13u | 140 | Hero numbers, clocks, prices |
| `--text-xl` | 8.5u | 92 | Page headline (`h1`) |
| `--text-lg` | 6u | 65 | Section heading (`h2`) |
| `--text-md` | 4.4u | 48 | **Body text (default)** |
| `--text-sm` | 3.2u | 35 | Captions, secondary text |
| `--text-xs` | 2.6u | 28 | **Minimum.** Labels and fine print only |

**Never go below `--text-xs`.** Body text of 48px is readable from about 8 to
10 ft (2.5 to 3 m) on a 55" 1080p screen.

**Sizing for distance.** A widely used rule is **1 inch of letter height for
every 10 ft** (about 1 cm per 1 m), and at least 3 inches for important
information. The United States Sign Council's research allows more (about 30
ft per inch for average eyesight), but low-vision readers need far more, so
the 1-in-10 rule is the safer default. A 55" 1080p screen has about 40 pixels
per inch, and capital letters are about 70% of the font size. So 1 inch of
capital-letter height is about 57px of font size.

| Viewing distance | Body text at least | Headline at least |
|---|---|---|
| 1.5 to 3 m (5 to 10 ft): lobby, counter, menu queue | `--text-md` | `--text-xl` |
| 3 to 6 m (10 to 20 ft): waiting room, corridor | `--text-lg` | `--text-2xl` |
| More than 6 m (20 ft): atrium, warehouse | Use fewer words at hero size | |

Smaller screens need larger units for the same distance (a 32" screen at 10
ft needs about 1.7× the 55" values).

### Spacing and case

- Line height: 1.35 for body (`--leading-body`), 1.1 for headings.
- **Mixed case**, not ALL CAPS. All-caps text needs about 15% taller letters
  to be as legible, and lower-case words read 12 to 15% better in sign
  studies. Use caps only for short labels (`.label`, which adds letter
  spacing).
- Left-align text blocks; centre only short headlines.

## Words and timing

- **3×5 rule:** up to 3 lines of 5 words, or 5 lines of 3. At most **30 to 40
  words** per screen.
- **One message per screen.** Rotate screens instead of cramming.
- **Display time:** about **1 second per word, and at least 5 to 10
  seconds** per message. Allow double for scrolling text.
- **Loop length** by how long people stay: walkways about 30 seconds,
  reception and queues 30 seconds to 2 minutes, offices and waiting rooms 2
  to 30 minutes.

## Colour

### Contrast

| Text | Minimum | Target |
|---|---|---|
| Body text | 4.5:1 (WCAG AA) | **7:1 or higher** |
| Large text (24px+, or 19px+ bold) | 3:1 | 4.5:1 |
| Prices and key information | 7:1 | |
| Icons and graphics | 3:1 | |

Research on light-emitting signs recommends even higher contrast (8:1 to
12:1), so aim high. All theme palettes meet these targets:

| Palette | Text | Muted | Accent |
|---|---|---|---|
| Dark (default) | 17.5:1 | 9.0:1 | 7.7:1 |
| Light | 16.8:1 | 7.2:1 | 5.9:1 |
| Contrast | 21:1 | 15.9:1 | 14.7:1 |

Check your own colours with the
[WebAIM contrast checker](https://webaim.org/resources/contrastchecker/).

### Dark backgrounds by default

- **Light text on a dark background** is the default. On LED and OLED
  panels a white background drives every pixel at full power: it glares,
  uses more energy and wears the panel. Light-on-dark also read 29% further
  away at night in one study.
- Use **off-white text** (`#f4f6fa`), not pure white, to reduce glare.
- Use the **light** theme when a brand demands it, or in very bright rooms.
  Use **contrast** (white and yellow on black) for wayfinding and low-vision
  audiences.

### Colours to avoid

- **Red text on white**, which appears to vibrate and bleed.
- **Red on blue, and red on green.** These pairs seem to jump in depth
  (chromostereopsis), and red-green is the most common colour-blindness:
  about 8% of men.
- **Colour as the only signal.** Pair it with a word or icon: "Open" /
  "Closed", not just green / red.
- **Text directly on photos.** Put a dark overlay or a solid panel behind
  it, as in [zone-promo](../examples/zone-promo/).

## Layout

- **Safe area:** keep everything 5% in from each edge (`.screen` does this).
  Some TVs crop the edges (overscan).
- **Hierarchy:** one hero element, at most two supporting ones. Put the most
  important information top-left, or centred for single messages.
- **Zones shrink text.** Splitting a screen into zones makes everything
  smaller and readable from less far away. Prefer one full-screen message.
- **Design for both orientations.** The theme's `u` unit and `is-portrait`
  class make this straightforward.
- **QR codes:** make the code at least **scan distance ÷ 10** wide (for
  example 30 cm for 3 m), or ÷ 8 in poor light. Never smaller than 2 cm.
- **Menu boards:** about 6 to 8 items on a 32" screen, 12 to 16 on a 55". One
  screen per category or meal.
- **Images:** 1920×1080 (landscape) or 1080×1920 (portrait), compressed to a
  few hundred KB each. Use SVG for logos and icons.

## Motion

- **Nothing may flash more than 3 times per second** (WCAG 2.3.1). It can
  trigger seizures.
- Keep motion **slow and subtle**: fades rather than spins, about 250 to 600
  ms (`--duration-fast`, `--duration`). These are our defaults; we found no
  research-based number.
- **Keep key information still.** Moving text takes longer to read. Avoid
  scrolling tickers for anything important; if you must, keep them slow
  (about 10 to 15 characters per second).
- The theme turns animations off for viewers who ask for reduced motion.
- **Avoid burn-in:** don't leave a bright logo or bar in the exact same
  place for hours. Rotate content and keep fixed elements small and dim.
  This matters most on OLED; LCDs can show temporary image retention.

## Accessibility checklist

- [ ] Contrast at least 4.5:1, ideally 7:1 or more
- [ ] Body text at least `--text-md`; nothing below `--text-xs`
- [ ] No thin weights; at most two fonts
- [ ] Mixed case except short labels
- [ ] At most 30 to 40 words; on screen long enough to read
- [ ] Colour never the only signal
- [ ] Nothing flashes more than 3 times per second
- [ ] `<html lang="...">` set; meaningful images have `alt` text
- [ ] Works in landscape and portrait, inside the safe area
- [ ] Videos have captions

Organisations such as Western Michigan University require **WCAG 2.1 AA**
for digital signage. ADA section 703 sets rules for fixed physical signs;
whether it applies to screens is unclear, so treat it as best practice.

## Sources

- WCAG 2.2: [contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum),
  [use of colour](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color),
  [three flashes](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold),
  [text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [ADA Standards, chapter 7 (703.5 visual characters)](https://www.access-board.gov/ada/chapter/ch07)
- [US Access Board: variable message sign legibility research](https://www.access-board.gov/research/communication/variable-message-signing/vms-legibility/)
- [United States Sign Council: on-premise sign guideline standards](https://usscfoundation.org/wp-content/uploads/2018/03/USSC-Guideline-Standards-for-On-Premise-Signs-2018.pdf)
- [Western Michigan University: accessible digital signage](https://wmich.edu/digital-accessibility/creating-accessible-content/digital-signage)
- [Texas A&M: digital signage best practices](https://marcomm.tamu.edu/digital-signage/best-practices)
- [Daktronics: brightness levels and background colours](https://www.daktronics.com/blog/brightness-levels-background-colors)
- [Rise Vision: digital signage design](https://www.risevision.com/blog/digital-signage-design)
- [ScreenCloud: rules for designing digital signage](https://screencloud.com/blog/rules-designing-digital-signage)
- [Mvix: recommended font and screen sizes](https://www.mvix.com/knowledgebase/recommended-font-and-screen-sizes)
- [Seen Labs: digital menu legibility](https://seenlabs.com/blog/digital-menu-legibility-typography-contrast-standards-for-qsr-signage)
- [Netflix: title safe and action safe](https://backlothelp.netflix.com/hc/en-us/articles/4406208331923-Title-Safe-and-Safe-Action-Best-Practices)
- [Atkinson Hyperlegible](https://github.com/googlefonts/atkinson-hyperlegible)

Sources disagree on exact pixel sizes (from 24px to 100px for similar
distances). The theme's sizes sit in the middle and follow the
1-inch-per-10-ft rule for body text at typical lobby distances.
