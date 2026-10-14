# Countdown

Counts down the days, hours, minutes and seconds to an event. Each screen can count down to a different event.

**[⬇ Download countdown.zip](https://github.com/easysignage/Digital-Signage-Custom-Apps/raw/main/downloads/countdown.zip)**, ready to upload to EasySignage.

## Put it on a screen

1. Download **countdown.zip** (link above).
2. In EasySignage, upload it under **Media**.
3. Add it to a **playlist** and assign the playlist to a **screen**.
4. Optional: add these tags to the player to customise it.

| Tag | What it does |
|---|---|
| `event_name` | Heading, e.g. `Grand Opening` |
| `event_date` | Target in screen local time, `YYYY-MM-DDTHH:MM`, e.g. `2026-12-01T09:00` |
| `done_text` | Shown when the time is reached (default `It's here!`) |

## Preview in a browser

Open `index.html` from this folder with test values in the URL:

```
index.html?tags.event_name=Grand%20Opening&tags.event_date=2026-12-01T09:00
```

If your browser doesn't pick up the values, serve the folder with
`python3 -m http.server 8000` and open `http://localhost:8000/?tags.event_name=Grand%20Opening&tags.event_date=2026-12-01T09:00`.

## Customise it

Change colours in `style.css`. Without an `event_date` tag the screen shows a hint telling you to set it.

To repackage after editing, run this from the repo root:

```bash
./scripts/package.sh examples/countdown
```

That creates `dist/countdown.zip`.
