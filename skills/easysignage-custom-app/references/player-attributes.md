# EasySignage player attributes reference

Source: https://easysignage.com/help/custom-apps/digital-signage-custom-apps/

## Delivery channels

EasySignage delivers the same player object to a custom app in two ways.
`EasySignage.read()` (from `easysignage.js`) picks whichever is available.

1. **Global object.** A script injected into `index.html` defines
   `window.easysignage` before your scripts run.
2. **URL query string.** The same values are appended to the page URL on every
   render, e.g.
   `index.html?player_id=PL-abc123&name=Main%20Lobby&display_unit_id=SC-9&tags.zone=north`.
   Keys prefixed `tags.` are rebuilt into a `tags` object. This channel is
   always present, so it still works when a strict Content-Security-Policy
   blocks the injected inline script.

`EasySignage.usedGlobal()` returns `true` when the data came from the global
(handy for diagnostics). `EasySignage.parseQuery(search)` is exposed too.

## Fields

| Field | Aliases (Broadsign-compatible) | Example |
|---|---|---|
| `player_id` | | `"PL-abc123"` |
| `name` | | `"Main Lobby"` |
| `screen_id` | `display_unit_id` | `"SC-9"` |
| `resolution` | `display_unit_resolution`, `frame_resolution` | `"1920x1080"` |
| `playlist_id` | `campaign_id` | `"PLY-42"` |
| `display_unit_lat_long` | | `"-33.8688,151.2093"` (only when location is known) |
| `tags` | | `{ "zone": "north", "store": "112" }` |

## Value rules

- Every field is a string. Parse numbers yourself (`parseInt(x, 10)`).
- Unknown values are `""`. Keys are never missing, except
  `display_unit_lat_long`, which is only present when the location is known.
- `tags` is always an object, possibly empty.
- `tags.all` is a comma-separated `key:value` string, e.g. `"zone:north,store:112"`.
- Tag keys are case-sensitive. Up to 20 tags are sent to the device.

## Not delivered

Device serials, OS and hardware details, orientation, and playlist or media
names are not passed to the app.

## Typical uses

```js
var panel = EasySignage.read();
var tags = panel.tags || {};

// Per-screen content
var zone = tags.zone || "default";

// Orientation
var parts = (panel.resolution || "").split("x");
var w = parseInt(parts[0], 10) || window.innerWidth;
var h = parseInt(parts[1], 10) || window.innerHeight;
var portrait = h > w;

// Location (optional)
var latLong = panel.display_unit_lat_long ? panel.display_unit_lat_long.split(",") : null;
```

## Testing without a player

Open `index.html` with query parameters:

```
index.html?player_id=TEST&name=Lobby&display_unit_id=SC-1&resolution=1080x1920&tags.zone=north
```
