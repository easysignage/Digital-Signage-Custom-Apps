# Menu Board

A cafe menu board with items and prices from a local data file. Each screen can show a different menu (for example breakfast or lunch).

**[⬇ Download menu-board.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/menu-board.zip)**, ready to upload to EasySignage.

## Put it on a screen

1. Download **menu-board.zip** (link above).
2. In EasySignage, upload it under **Media**.
3. Add it to a **playlist** and assign the playlist to a **screen**.
4. Optional: add these tags to the player to customise it.

| Tag | What it does |
|---|---|
| `menu` | Which menu to show: `breakfast` or `lunch` (default: the first menu) |
| `special` | Optional banner at the bottom, e.g. `Free cookie with any coffee` |

## Preview in a browser

Open `index.html` from this folder with test values in the URL:

```
index.html?tags.menu=lunch&tags.special=Free%20cookie%20with%20any%20coffee
```

If your browser doesn't pick up the values, serve the folder with
`python3 -m http.server 8000` and open `http://localhost:8000/?tags.menu=lunch&tags.special=Free%20cookie%20with%20any%20coffee`.

## Customise it

Edit items, prices and menus in `menu-data.js`, then re-zip and re-upload. The data is a `.js` file rather than `.json` because many players can't `fetch()` local files.

To repackage after editing, run this from the repo root:

```bash
./scripts/package.sh examples/menu-board
```

That creates `dist/menu-board.zip`.
