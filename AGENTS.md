# Instructions for AI coding agents

This repository shows how to build **EasySignage custom apps**: offline HTML5
apps packaged as a `.zip` (with `index.html` at the root) that play on digital
signage screens.

## When the user asks you to build or change a signage app

Read and follow **`skills/easysignage-custom-app/SKILL.md`**. It has the hard
rules (offline, relative paths, ES5, no secrets), the player attributes API,
the workflow and a review checklist.

For Broadsign creatives, read **`skills/easysignage-broadsign-migration/SKILL.md`**.

## Repository layout

| Path | What it is |
|---|---|
| `sdk/easysignage.js` | The official player-attributes reader. Source of truth; do not edit casually. |
| `templates/starter/` | Minimal app to copy for a new project. |
| `examples/` | Working apps: `clock`, `countdown`, `menu-board`, `zone-promo`, `player-info`. |
| `skills/` | Agent skills (also published as a Claude Code plugin via `.claude-plugin/`). |
| `scripts/check.sh` | Lints an app folder for signage problems. |
| `scripts/package.sh` | Checks and zips an app folder into `dist/<name>.zip`. |
| `scripts/sync-reader.sh` | Copies `sdk/easysignage.js` into every app and the skill. |
| `docs/` | Human-readable guide. |

## Conventions

- Create new apps in their own folder (for example `apps/<name>/` or wherever
  the user asks), starting from a copy of `templates/starter/`.
- Every app folder contains its own copy of `easysignage.js`. If you change
  `sdk/easysignage.js`, run `./scripts/sync-reader.sh`.
- Run `./scripts/check.sh <folder>` after changes and fix all errors.
- Never commit secrets, API keys, customer data or real player IDs. This is a
  public repository.
- Keep examples small, commented, ES5 and dependency-free.
