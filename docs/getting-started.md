# Getting started

Build your first EasySignage custom app in about five minutes. No build tools
or frameworks are needed: just HTML, CSS and JavaScript.

## 1. Copy the starter

```bash
git clone https://github.com/easysignage/Digital-Signage-Custom-Apps.git
cd Digital-Signage-Custom-Apps
cp -R templates/starter my-app
```

Or download the repository as a ZIP from GitHub and copy `templates/starter`.

You now have:

```
my-app/
  index.html       entry point (must stay at the top level)
  easysignage.js   reads player attributes; copy it unchanged
  app.js           your code
  style.css        your styles
```

## 2. Edit it

Change `app.js` and `style.css`. To show different content on different
screens, read a **tag** you set on each player in EasySignage:

```js
var panel = EasySignage.read();
var zone = (panel.tags && panel.tags.zone) || "default";
```

See [player attributes](../skills/easysignage-custom-app/references/player-attributes.md)
for every field you can read.

## 3. Preview in a browser

Open `my-app/index.html` with test values in the URL:

```
my-app/index.html?name=Lobby&resolution=1920x1080&tags.zone=north
```

If your browser blocks local files, serve the folder instead:

```bash
cd my-app
python3 -m http.server 8000
```

Then open `http://localhost:8000/?name=Lobby&tags.zone=north`. Resize the
window to check landscape and portrait.

## 4. Check and package

```bash
./scripts/package.sh my-app
```

This runs `scripts/check.sh` (which catches problems that break apps on
screens) and creates `dist/my-app.zip` with `index.html` at the root.

Packaging by hand: zip the folder's **contents**, not the folder itself.

- macOS / Linux: `cd my-app && zip -r ../my-app.zip . -x '.DS_Store'`
- Windows (PowerShell): `Compress-Archive -Path my-app\* -DestinationPath my-app.zip`

## 5. Put it on a screen

1. In EasySignage, upload the `.zip` under **Media**.
2. Add the media item to a **playlist**.
3. Assign the playlist to a **screen**.
4. If your app reads tags, add them to each player (for example `zone` = `north`).

The app is stored on the device, so it keeps playing when the internet drops.

## Next steps

- Read the [best practices](best-practices.md) before building something big.
- Browse the [examples](../examples/).
- Let an AI agent build it for you: [AI agents guide](ai-agents.md).
- Official docs: https://easysignage.com/help/custom-apps/digital-signage-custom-apps/
