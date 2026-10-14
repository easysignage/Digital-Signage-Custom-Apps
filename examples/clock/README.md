# Clock

A full-screen clock and date using the screen's local time. Works fully offline.

**[⬇ Download clock.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/clock.zip)**, ready to upload to EasySignage.

## Put it on a screen

1. Download **clock.zip** (link above).
2. In EasySignage, upload it under **Media**.
3. Add it to a **playlist** and assign the playlist to a **screen**.
4. Optional: add these tags to the player to customise it.

| Tag | What it does |
|---|---|
| `clock_format` | `12` or `24` (default `24`) |
| `greeting` | Text under the date, e.g. `Welcome to Level 3` |
| `accent` | Colour of the time, e.g. `#ff6a00` |

## Preview in a browser

Open `index.html` from this folder with test values in the URL:

```
index.html?tags.clock_format=12&tags.greeting=Welcome%20to%20Level%203&tags.accent=%23ff6a00
```

If your browser doesn't pick up the values, serve the folder with
`python3 -m http.server 8000` and open `http://localhost:8000/?tags.clock_format=12&tags.greeting=Welcome%20to%20Level%203&tags.accent=%23ff6a00`.

## Customise it

Edit the styles in `index.html` and the formatting in `clock.js`.

To repackage after editing, run this from the repo root:

```bash
./scripts/package.sh examples/clock
```

That creates `dist/clock.zip`.
