# Player Info

Shows every attribute this screen sends to custom apps: player ID, name, screen ID, resolution, playlist, location and tags. Put it on a screen first to check your tags, or whenever a custom app shows the wrong content.

**[⬇ Download player-info.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/player-info.zip)**, ready to upload to EasySignage.

## Put it on a screen

1. Download **player-info.zip** (link above).
2. In EasySignage, upload it under **Media**.
3. Add it to a **playlist** and assign the playlist to a **screen**.
4. Optional: add these tags to the player to customise it.

| Tag | What it does |
|---|---|
| `any` | Every tag set on the player is listed on screen. |

## Preview in a browser

Open `index.html` from this folder with test values in the URL:

```
index.html?player_id=TEST&name=Lobby&display_unit_id=SC-1&resolution=1920x1080&tags.zone=north
```

If your browser doesn't pick up the values, serve the folder with
`python3 -m http.server 8000` and open `http://localhost:8000/?player_id=TEST&name=Lobby&display_unit_id=SC-1&resolution=1920x1080&tags.zone=north`.

## Customise it

This is EasySignage's official sample. `demo.js` is display code only; the integration is the single `EasySignage.read()` call.

To repackage after editing, run this from the repo root:

```bash
./scripts/package.sh examples/player-info
```

That creates `dist/player-info.zip`.
