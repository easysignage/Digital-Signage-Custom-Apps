# EasySignage Custom Apps

Examples, a starter template and **AI agent skills** for building
[EasySignage](https://easysignage.com) custom apps: offline HTML5 apps that
play on your digital signage screens.

A custom app is a small website packaged as a `.zip`. Upload it once and it
plays on every screen like any other media. It's stored on the device, so it
keeps playing when the internet drops. Each screen can show different content
through **player tags**.

> **Let AI build it for you.** Install the skill in Claude Code, or use
> Codex, Cursor or Copilot in this repo, then just describe the screen you
> want. [Jump to AI agents ↓](#build-with-ai-agents)

---

## Quick start

**Just want to try it?** Download [player-info.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/player-info.zip),
upload it under **Media** in EasySignage, and play it on a screen. It shows
everything that screen sends to custom apps. More ready-made apps are in
[Examples](#examples).

**Build your own:**

```bash
git clone https://github.com/easysignage/Digital-Signage-Custom-Apps.git
cd Digital-Signage-Custom-Apps
cp -R templates/starter my-app       # 1. copy the starter
                                     # 2. edit my-app/app.js and style.css
./scripts/package.sh my-app          # 3. check and zip it -> dist/my-app.zip
```

4. In EasySignage, upload `dist/my-app.zip` under **Media**, add it to a
   **playlist**, and assign the playlist to a **screen**.

Step by step: [Getting started](docs/getting-started.md).

## How it works

```
my-app.zip
├── index.html       ← entry point, must be at the top level
├── easysignage.js   ← reads player attributes (copy unchanged)
├── app.js
├── style.css
└── images/          ← bundle every asset, use relative paths
```

Your code reads the screen it's running on:

```html
<script src="easysignage.js"></script>
<script>
  var panel = EasySignage.read();
  var zone = (panel.tags && panel.tags.zone) || "default";
  // panel.player_id, panel.name, panel.screen_id, panel.resolution,
  // panel.playlist_id, panel.tags ...
</script>
```

Preview in a browser by passing test values in the URL:

```
index.html?name=Lobby&resolution=1920x1080&tags.zone=north
```

Full field list: [player attributes](skills/easysignage-custom-app/references/player-attributes.md).

## Examples

Each example is a complete app. **Download the zip and upload it to
EasySignage as-is**, with no coding or zipping needed. Each one's README has
setup and preview steps.

| Example | What it shows | Tags it reads | Download |
|---|---|---|---|
| [player-info](examples/player-info/) | Every attribute the player sends. Use it to debug a screen. | all | [⬇ player-info.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/player-info.zip) |
| [clock](examples/clock/) | Full-screen clock and date, fully offline | `clock_format`, `greeting`, `accent` | [⬇ clock.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/clock.zip) |
| [countdown](examples/countdown/) | Countdown to an event set per screen | `event_name`, `event_date`, `done_text` | [⬇ countdown.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/countdown.zip) |
| [menu-board](examples/menu-board/) | Menu from a local data file, chosen per screen | `menu`, `special` | [⬇ menu-board.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/menu-board.zip) |
| [zone-promo](examples/zone-promo/) | Different promo and image per store zone | `zone` | [⬇ zone-promo.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/zone-promo.zip) |
| [starter](templates/starter/) | Minimal template to build your own app | `zone` | [⬇ starter.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/starter.zip) |

To use one: download the zip, upload it under **Media** in EasySignage, add
it to a playlist, and assign the playlist to a screen. Then add the tags
listed to each player to customise it.

To change an example, edit its folder and repackage it with
`./scripts/package.sh examples/<name>`.

## Build with AI agents

This repo includes agent skills that teach AI coding agents the rules of
EasySignage custom apps (offline, older players, player tags, no secrets), so
what they build works on real screens.

**Claude Code** (install once, use in any project):

```
/plugin marketplace add easysignage/Digital-Signage-Custom-Apps
/plugin install easysignage-custom-apps@easysignage
```

**Codex, Cursor, GitHub Copilot and others:** open this repo in your agent.
It reads [`AGENTS.md`](AGENTS.md) automatically.

**ChatGPT / Claude.ai:** paste
[`SKILL.md`](skills/easysignage-custom-app/SKILL.md) into the chat.

Then ask, for example:

> Build an EasySignage menu board for my cafe with breakfast and lunch menus
> chosen per screen by a `menu` tag. Package it as a zip.

| Skill | Use it to |
|---|---|
| [easysignage-custom-app](skills/easysignage-custom-app/SKILL.md) | Build, fix, review and package a custom app |
| [easysignage-broadsign-migration](skills/easysignage-broadsign-migration/SKILL.md) | Convert a Broadsign HTML5 creative |

More setups and prompts: [AI agents guide](docs/ai-agents.md).

## Rules that keep apps working

- `index.html` at the zip root, all assets bundled, relative paths only.
- Plain `<script src>` tags (no `type="module"`), ES5 JavaScript, flexbox CSS.
  Many players run older webviews.
- No `fetch()` of local files. Put data in a `.js` file.
- **Never put API keys, tokens or passwords in an app.** It's copied to
  every screen.

`./scripts/check.sh <folder>` checks all of these. Details:
[Best practices](docs/best-practices.md).

## Repository layout

```
docs/          guides: getting started, best practices, AI agents
downloads/     ready-to-upload zips of every example
examples/      complete example apps
templates/     starter app to copy
sdk/           easysignage.js, the player-attributes reader
skills/        AI agent skills (also a Claude Code plugin)
scripts/       check.sh, package.sh, build-downloads.sh, sync-reader.sh
```

## Links

- [Custom apps documentation](https://easysignage.com/help/custom-apps/digital-signage-custom-apps/)
- [Upload media](https://easysignage.com/help/apps/digital-signage-upload-media/)
- [Website dynamic URL variables](https://easysignage.com/help/apps/digital-signage-website-dynamic-url-variables/)

## Contributing

Issues and pull requests are welcome: new examples, fixes, and skill
improvements. Keep examples small, ES5, dependency-free, and run
`./scripts/check.sh` on them. After changing an example, run
`./scripts/build-downloads.sh` and commit the updated zips. Please don't include real player IDs, customer
data or credentials.

## License

[MIT](LICENSE)
