---
name: easysignage-custom-app
description: Build, fix, review or restyle an EasySignage custom app (an offline HTML5 app packaged as a .zip with index.html at the root, formerly "Offline HTML") for digital signage screens. Use when the user wants signage content, a screen app, a menu board, a lobby/welcome screen, a clock, a countdown, per-screen or per-location content driven by player tags, or asks how to read EasySignage player attributes (player_id, name, screen_id, resolution, playlist_id, tags) or package an app for EasySignage, or asks how signage content should look (fonts, colours, text size, layout).
---

# EasySignage custom app

An EasySignage custom app is a self-contained website zipped up and played on
screens like any other media. Everything is stored on the device, so it keeps
playing when the internet drops. Your job is to produce a folder that works
offline on old signage webviews, then a `.zip` the user uploads.

## Hard rules

1. **`index.html` at the top level of the zip.** Not inside a sub-folder.
2. **Everything bundled, relative paths only.** `images/logo.png`, never
   `/images/logo.png` or a CDN URL. No Google Fonts links: bundle font files
   and use `@font-face` with a relative `url()`.
3. **Classic scripts, ES5 JavaScript.** `<script src="app.js"></script>`, never
   `type="module"`. Use `var` and `function () {}`; no arrow functions,
   template literals, `let`/`const`, classes, `async`/`await`, `?.`, `??` or
   spread. Fleets include older Tizen, webOS and BrightSign webviews, some
   around Chromium 53 and some older; ES5 is the safe baseline. Relax this
   only if the user confirms every screen runs a modern player.
4. **Conservative CSS.** Flexbox, absolute positioning, `vw`/`vh`/px, CSS
   variables. No CSS grid, `clamp()`, or flex `gap` (use margins).
5. **No `fetch()` / XHR of local files.** It fails under `file://` on many
   players. Ship data as a JS file that sets a global
   (`window.APP_DATA = {...}`) and load it with a `<script>` tag.
6. **No secrets.** The zip is copied to every screen and anyone with device
   access can read it. Never embed API keys, tokens or passwords. If the user
   wants live data from a private API, tell them to expose a public,
   read-only, key-free endpoint (or proxy) and handle offline gracefully, or
   to use a regular EasySignage website/URL media item instead.
7. **Built for a screen, not a browser.** Full-screen, no scrolling
   (`overflow: hidden`), no hover or click interactions, `cursor: none`,
   everything inside a 5% overscan-safe margin (`.screen` in theme.css).
   Support both landscape and portrait.
8. **Use the signage theme and its design rules.** Build on
   `assets/theme.css` and `assets/theme.js` and follow
   `references/design.md`. In short:
   - **Type:** the bundled Atkinson Hyperlegible font (or a plain
     sans-serif brand font), body text at least `--text-md` (about 48px on
     1080p), nothing below `--text-xs`, no thin weights, mixed case.
   - **Words:** at most 30 to 40 per screen (3×5 rule), one message per
     screen.
   - **Colour:** dark background by default, contrast at least 4.5:1 (target
     7:1), colour never the only signal.
   - **Layout and motion:** everything inside the 5% safe area, nothing
     flashing more than 3 times per second, slow fades only,
     `<html lang>` and `alt` text.

## Reading player attributes

Copy `assets/easysignage.js` (next to this file) into the app folder unchanged
and load it before your code:

```html
<script src="easysignage.js"></script>
<script src="app.js"></script>
```

```js
var panel = EasySignage.read();   // never throws; always returns an object
var tags = panel.tags || {};
var zone = tags.zone || "";       // per-screen value set on the player in EasySignage
```

`EasySignage.read()` uses the injected global `window.easysignage` and falls
back to the URL query string (`?player_id=...&tags.zone=north`) when a strict
CSP blocks the injected script. Do not reimplement it.

Fields (all **strings**; unknown values are `""`, keys are never missing):

| Field | Aliases | Notes |
|---|---|---|
| `player_id` | | Unique player GUID |
| `name` | | Player/screen display name |
| `screen_id` | `display_unit_id` | Screen identifier |
| `resolution` | `display_unit_resolution`, `frame_resolution` | `"WIDTHxHEIGHT"`, e.g. `"1920x1080"` |
| `playlist_id` | `campaign_id` | Playlist the content plays in |
| `display_unit_lat_long` | | `"lat,long"`; **only present** when location is known |
| `tags` | | Object of custom key/value labels; may be `{}` |

- `tags.all` is a comma-separated `key:value` string of all tags.
- Tag keys are case-sensitive; at most 20 tags reach the device.
- Not available: device serial, OS/hardware, orientation, playlist or media
  names. Derive orientation from `resolution` or `window.innerWidth/Height`.

Full details: `references/player-attributes.md`.

**Use tags for per-screen configuration.** One package, many screens: read
settings such as `tags.zone`, `tags.menu`, `tags.event_date` and fall back to
sensible defaults when a tag is missing. Tell the user exactly which tags to
add to each player in EasySignage.

## Workflow

1. **Clarify** what the screen should show, orientation(s), and what should
   vary per screen (becomes tags). Make reasonable assumptions rather than
   asking many questions.
2. **Scaffold** a folder:
   ```
   my-app/
     index.html        entry point (top level), <html lang="en">
     easysignage.js    copied from assets/, unchanged
     theme.css         copied from assets/; load before style.css
     theme.js          copied from assets/; call EasySignageTheme.apply(panel)
     fonts/            copied from assets/ (Atkinson Hyperlegible + OFL.txt)
     app.js            your code (ES5)
     style.css         app styles: use theme variables, override colours to brand
     data.js           optional: window.APP_DATA = {...}
     images/           optional: bundled assets
   ```
   If this repository is available, start from `templates/starter/` and look
   at `examples/` for patterns (clock, countdown, menu-board, zone-promo,
   player-info).
3. **Build** following the hard rules. Lay out with `.screen` and the theme
   classes, size text with the `--text-*` variables, and brand by
   overriding colour variables only (see `references/design.md`). Support
   the `theme` and `accent` tags (theme.js does it). Write user-visible strings with
   `textContent`, not `innerHTML`, when they come from tags or data. Make
   missing tags degrade to a sensible default, never a blank or broken screen.
   For timers, use one `setInterval`; avoid memory growth since apps can run
   for days.
4. **Preview** by opening `index.html?name=Lobby&resolution=1920x1080&tags.zone=north`
   in a browser. If the browser blocks local scripts, serve the folder with
   `python3 -m http.server` and open `http://localhost:8000/?...`. Check
   landscape and portrait.
5. **Check and package.** In this repo: `./scripts/package.sh path/to/my-app`
   (runs `scripts/check.sh`, writes `dist/my-app.zip`). Otherwise zip the
   folder's **contents**:
   - macOS/Linux: `cd my-app && zip -r ../my-app.zip . -x '.DS_Store'`
   - Windows PowerShell: `Compress-Archive -Path my-app\* -DestinationPath my-app.zip`
6. **Hand off** with: what you built, the tags to set on each player (with
   example values), the preview URL, and the upload steps: upload the `.zip`
   under **Media**, add it to a **playlist**, assign the playlist to a
   **screen**.

## Review checklist

Before finishing, confirm every item:

- [ ] `index.html` at zip root; `easysignage.js` loaded before app code
- [ ] No `type="module"`, no ES2015+ syntax, no grid/`clamp()`/`gap`
- [ ] No absolute (`/...`) or remote (`http`, `//cdn`) URLs
- [ ] No local `fetch()`/XHR; data in a `.js` file
- [ ] No keys, tokens, passwords or private URLs anywhere in the package
- [ ] Works with no tags at all and with `tags = {}`
- [ ] Fits landscape and portrait with no scrolling or clipped text
- [ ] Tag/data strings rendered with `textContent`
- [ ] Built on theme.css; text sized with `--text-*`, nothing below `--text-xs`
- [ ] At most 30 to 40 words per screen; no thin weights; caps only for labels
- [ ] Brand colours checked: contrast at least 4.5:1 (target 7:1)
- [ ] Nothing flashes; motion slow; `<html lang>` and `alt` set
- [ ] No `window.BroadSignObject` (removed; use `EasySignage.read()`)

Docs: https://easysignage.com/help/custom-apps/digital-signage-custom-apps/
