# Zone Promo

One package, different content on every screen: each screen shows the promotion and image for its zone.

**[⬇ Download zone-promo.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/zone-promo.zip)**, ready to upload to EasySignage.

## Put it on a screen

1. Download **zone-promo.zip** (link above).
2. In EasySignage, upload it under **Media**.
3. Add it to a **playlist** and assign the playlist to a **screen**.
4. Optional: add these tags to the player to customise it.

| Tag | What it does |
|---|---|
| `zone` | `north`, `south` or `east`. Anything else, or no tag, shows the default promo. |
| `accent` | Colour of the accent bar, e.g. `#ff6a00` |

## Preview in a browser

Open `index.html` from this folder with test values in the URL:

```
index.html?tags.zone=north
```

If your browser doesn't pick up the values, serve the folder with
`python3 -m http.server 8000` and open `http://localhost:8000/?tags.zone=north`.

## Customise it

Edit the `PROMOS` table in `promo.js` and put your own images in `images/` (relative paths only).

To repackage after editing, run this from the repo root:

```bash
./scripts/package.sh examples/zone-promo
```

That creates `dist/zone-promo.zip`.
