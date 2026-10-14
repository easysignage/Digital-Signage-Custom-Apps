# Best practices

Signage players aren't desktop browsers. Many run older webviews (Tizen, webOS,
BrightSign) that load your app from `file://`, often offline, and run it for
days without a reload. These rules keep your app working on every screen.
`./scripts/check.sh` checks most of them for you.

## Packaging

- Put `index.html` at the **top level** of the zip.
- Bundle every asset (images, fonts, CSS, JS) inside the package.
- Use **relative paths**: `images/logo.png`, not `/images/logo.png`.
- Don't load from CDNs or Google Fonts. Download the files and bundle them.
- Keep packages small. Every screen downloads the whole zip. Compress
  images and prefer SVG for graphics.

## JavaScript

- Load scripts with a plain `<script src="...">`, never `type="module"`.
- Load `easysignage.js` **before** your own code.
- Write **ES5**: `var`, `function () {}`, string concatenation. Avoid arrow
  functions, template literals, `let`/`const`, classes, `async`/`await`, `?.`
  and `??`. Some players predate ES2015.
- Don't `fetch()` or XHR local files. Many players block it under `file://`.
  Put data in a script instead, as in [menu-board](../examples/menu-board/):
  ```html
  <script src="data.js"></script>   <!-- window.APP_DATA = { ... } -->
  ```
- Format dates by hand. `Intl` support is incomplete on older players.
- Apps can run for days. Use one `setInterval`, don't keep adding DOM
  nodes or listeners, and clean up anything you create repeatedly.

## CSS

- Use flexbox, absolute positioning, `vw`/`vh`/px units and CSS variables.
- Avoid CSS grid, `clamp()` and flex `gap` (use margins), which older
  webviews don't support.
- Use `overflow: hidden` and `cursor: none`. A screen never scrolls.
- Keep about 40px of padding at the edges, because some TVs crop the edges
  (overscan).
- Size text for reading across a room, and design for both **landscape and
  portrait**. Detect portrait from `panel.resolution` or the window size.

## Content and data

- **Use tags for per-screen settings.** Upload one package and configure each
  screen with player tags such as `zone`, `menu` or `event_date`.
- Always fall back to a sensible default when a tag is missing. Never show a
  blank or broken screen.
- Render tag and data values with `textContent`, not `innerHTML`.
- Tag keys are case-sensitive, and at most 20 tags reach the device.

## Security: never ship secrets

A custom app is copied onto every screen it plays on. Anyone with access to a
device, or to the media library, can unzip it and read every file.

- **Don't put API keys, tokens, passwords or private URLs in an app.**
- If you need live data, use a public, read-only endpoint that needs no key,
  or a small proxy you control that adds the key on the server side. Cache the
  last good response and show it when the screen is offline.
- If the content is a live web page anyway, consider a regular website/URL
  media item instead (see
  [Website Dynamic URL Variables](https://easysignage.com/help/apps/digital-signage-website-dynamic-url-variables/)).

## Migrating from Broadsign

EasySignage uses Broadsign-compatible field names (`display_unit_id`,
`frame_resolution`, `campaign_id`, ...), but **`window.BroadSignObject` was
removed**. Replace it with:

```js
var panelVariables = EasySignage.read();
```

The [migration skill](../skills/easysignage-broadsign-migration/SKILL.md)
walks through the full process.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Blank screen | `index.html` not at the zip root, a script error from modern JS syntax, or a `type="module"` script |
| Images or fonts missing | Absolute (`/...`) or remote URLs; asset not included in the zip |
| Works on my laptop, not on the screen | Modern JS/CSS unsupported by the player's webview; `fetch()` of a local file |
| Player values are empty | The `easysignage.js` script tag is missing, or loaded after your code; a typo in a tag key (keys are case-sensitive) |
| Shows default content on every screen | The tag isn't set on the player, or the key doesn't match |

Use [player-info](../examples/player-info/) on a real screen to see exactly
what that player delivers.
