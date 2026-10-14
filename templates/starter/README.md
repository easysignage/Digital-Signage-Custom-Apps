# Starter Template

A minimal custom app to build your own from. It greets the screen by name and shows its `zone` tag.

**[⬇ Download starter.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/starter.zip)**, ready to upload to EasySignage.

## Put it on a screen

1. Download **starter.zip** (link above).
2. In EasySignage, upload it under **Media**.
3. Add it to a **playlist** and assign the playlist to a **screen**.
4. Optional: add these tags to the player to customise it.

| Tag | What it does |
|---|---|
| `zone` | Optional, shown under the heading |

## Preview in a browser

Open `index.html` from this folder with test values in the URL:

```
index.html?name=Main%20Lobby&tags.zone=north
```

If your browser doesn't pick up the values, serve the folder with
`python3 -m http.server 8000` and open `http://localhost:8000/?name=Main%20Lobby&tags.zone=north`.

## Customise it

Edit `app.js` and `style.css`. Keep `easysignage.js` unchanged and loaded first. Read the [best practices](../../docs/best-practices.md) before building something big.

To repackage after editing, run this from the repo root:

```bash
./scripts/package.sh templates/starter
```

That creates `dist/starter.zip`.
