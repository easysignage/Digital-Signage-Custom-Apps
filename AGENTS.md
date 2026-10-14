# Instructions for AI coding agents

This repository shows how to build **EasySignage custom apps**: offline HTML5
apps packaged as a `.zip` (with `index.html` at the root) that play on digital
signage screens.

## When the user asks you to build or change a signage app

Read and follow **`skills/easysignage-custom-app/SKILL.md`**. It has the hard
rules (offline, relative paths, ES5, no secrets), the player attributes API,
the workflow and a review checklist. For anything visual (fonts, colours,
sizes, layout, motion) follow `skills/easysignage-custom-app/references/design.md`
and build on the signage theme in `sdk/`.

For Broadsign creatives, read **`skills/easysignage-broadsign-migration/SKILL.md`**.

## Repository layout

| Path | What it is |
|---|---|
| `sdk/easysignage.js` | The official player-attributes reader. Source of truth; do not edit casually. |
| `sdk/theme.css`, `sdk/theme.js`, `sdk/fonts/` | The signage theme: design tokens, bundled font, `theme`/`accent` tags. |
| `docs/theme-guide.md` | Design rules with sources (typography, colour, layout, motion). |
| `templates/starter/` | Minimal app to copy for a new project. |
| `examples/` | Working apps: `clock`, `countdown`, `menu-board`, `zone-promo`, `player-info`. |
| `skills/` | Agent skills (also published as a Claude Code plugin via `.claude-plugin/`). |
| `scripts/check.sh` | Lints an app folder for signage problems. |
| `scripts/package.sh` | Checks and zips an app folder into `dist/<name>.zip`. |
| `scripts/build-downloads.sh` | Rebuilds the committed `downloads/*.zip` for every example and the starter. |
| `downloads/` | Ready-to-upload zips linked from the READMEs. Never edit by hand. |
| `scripts/sync-shared.sh` | Copies `sdk/` files (reader, theme, fonts) into every app and the skill. |
| `docs/` | Human-readable guide. |

## Conventions

- Create new apps in their own folder (for example `apps/<name>/` or wherever
  the user asks), starting from a copy of `templates/starter/`.
- Every app folder contains its own copy of `easysignage.js` (and, if it uses
  the theme, `theme.css`, `theme.js` and `fonts/`). Edit only the copies in
  `sdk/`, then run `./scripts/sync-shared.sh`.
- Style apps with theme variables (`--text-*`, `--space-*`, colours). Brand
  by overriding colour variables; don't hard-code font sizes.
- Run `./scripts/check.sh <folder>` after changes and fix all errors.
- After changing anything in `examples/` or `templates/starter/`, run
  `./scripts/build-downloads.sh` and commit the updated zips.
- Never commit secrets, API keys, customer data or real player IDs. This is a
  public repository.
- Keep examples small, commented, ES5 and dependency-free.
