# Readability and accessibility for signage

Signage is read from a distance, at an angle, often in passing, by people of
all ages and abilities. These guidelines follow WCAG 2.1 AA where it applies
to non-interactive screens, plus common signage practice. Everything here
works on older players (Chromium ~53): no `clamp()`, grid or `gap`.

## Contrast

- Text: at least **4.5:1** against its background; aim for **7:1**.
- Large headlines (above about 6vh): at least 3:1, though higher is better.
- Text over images: put a solid or gradient overlay behind the text
  (e.g. `linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,0))`), or place
  it on a solid panel.
- Pure white on pure black can glare on bright LED panels; `#f5f5f5` on
  `#0f1115` reads more comfortably.

## Size

Use viewport units so text scales with the screen:

| Element | Minimum | Approx. on 1080p |
|---|---|---|
| Body text | 3vh | 32px |
| Secondary / captions | 2.4vh | 26px |
| Headlines | 6vh | 65px |

Rule of thumb: about 2.5cm (1 inch) of letter height per 3m (10ft) of viewing
distance. In portrait, size from width (`vw`), because height is plentiful.

Prefer plain sans-serif fonts at regular or medium weight. Thin weights
(100 to 300) disappear at a distance unless very large.

## Amount of text

- At most about 7 lines, or about 30 to 40 words, per screen.
- One message per screen. Rotate instead of cramming.
- Keep each message on screen long enough to be read twice (about 1 second
  per 3 words, minimum 8 seconds).

## Colour

- Never use colour as the only signal: add text or an icon.
- Avoid red/green as the only distinction (about 1 in 12 men are colour-blind).

## Motion and flashing

- **Nothing may flash more than 3 times per second** (WCAG 2.3.1, seizure risk).
- Keep motion slow and purposeful; avoid constant scrolling tickers for key
  information.
- Respect reduced motion. Older players ignore the query, which is harmless:

  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
  ```

  ```js
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  ```

## Semantics

- `<html lang="en">` (or the content language) so screen readers and
  translation tools pronounce it correctly.
- Real structure: one `<h1>`, then `<h2>` and so on; `<main>` around content.
- `alt` text on meaningful images; `alt=""` on decorative ones.
- Don't put essential text only inside images. If you must, repeat it in
  `alt`.
