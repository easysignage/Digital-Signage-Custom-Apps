---
name: easysignage-broadsign-migration
description: Convert an existing Broadsign HTML5 creative (or any HTML package that reads window.BroadSignObject, BroadSignPlay, or Broadsign display_unit_* / frame_* variables) into a working EasySignage custom app. Use when the user mentions Broadsign, BroadSignObject, migrating creatives to EasySignage, or an HTML5 package that stopped showing player data after moving to EasySignage.
---

# Migrate a Broadsign HTML5 creative to EasySignage

EasySignage uses Broadsign-compatible key names, so most field names carry
over unchanged. The main break: **`window.BroadSignObject` was removed.**
Creatives must read `EasySignage.read()` (or `window.easysignage`) instead.

Also follow the `easysignage-custom-app` skill's hard rules (offline, relative
paths, ES5, no secrets, `index.html` at zip root).

## Steps

1. **Inventory.** Search the package for `BroadSignObject`, `BroadSignPlay`,
   `display_unit_`, `frame_`, `campaign_id`, and any `JSON.parse` of the
   Broadsign object. List every field the creative reads.
2. **Add the reader.** Copy `easysignage.js` (from
   `skills/easysignage-custom-app/assets/` or `sdk/` in this repo) next to
   `index.html` and load it with a classic `<script src>` before the
   creative's own scripts.
3. **Replace the object source.** Broadsign often exposes `BroadSignObject` as
   a JSON string; EasySignage returns an object directly:

   ```js
   // Before
   var panelVariables = JSON.parse(window.BroadSignObject);

   // After
   var panelVariables = EasySignage.read();
   ```

   Keep the existing variable name so the rest of the code is untouched.
4. **Map fields.** These keys work as-is:
   `player_id`, `display_unit_id`, `display_unit_resolution`,
   `frame_resolution`, `campaign_id`, `display_unit_lat_long`.
   Native equivalents: `screen_id`, `resolution`, `playlist_id`.
   Everything is a string; `""` when unknown.
5. **Handle what is not delivered.** Device serials, OS/hardware details,
   orientation, playlist and media names, and any other Broadsign-only
   variables are not passed. Replace them with tags (`panel.tags.<key>`, set
   per player in EasySignage) or derive them (orientation from `resolution`).
   Tell the user which tags to create.
6. **Replace `BroadSignPlay()` start hooks.** If the creative waits for
   `BroadSignPlay()` to start animations, start on `DOMContentLoaded` /
   `window.onload` instead, keeping `BroadSignPlay` defined as a harmless
   alias if other code calls it.
7. **Make it self-contained.** Bundle any remote assets, fix absolute paths,
   remove secrets. Run `./scripts/check.sh <folder>` if this repo is present.
8. **Test** with the query string:
   `index.html?player_id=TEST&display_unit_id=SC-1&display_unit_resolution=1920x1080&tags.zone=north`
9. **Package** with `index.html` at the zip root and hand off: changes made,
   tags to set, upload steps (Media, then playlist, then screen).

Docs: https://easysignage.com/help/custom-apps/digital-signage-custom-apps/
