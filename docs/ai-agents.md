# Build custom apps with AI agents

This repository ships **agent skills**: instructions that teach AI coding
agents the rules of EasySignage custom apps. With a skill installed, the agent
produces apps that work offline and on older players, read player tags
correctly, and contain no secrets.

| Skill | Use it to |
|---|---|
| [`easysignage-custom-app`](../skills/easysignage-custom-app/SKILL.md) | Build, fix, review and package a custom app |
| [`easysignage-broadsign-migration`](../skills/easysignage-broadsign-migration/SKILL.md) | Convert a Broadsign HTML5 creative to EasySignage |

## Claude Code

**Option A: install as a plugin (recommended).** Run these in Claude Code:

```
/plugin marketplace add easysignage/Digital-Signage-Custom-Apps
/plugin install easysignage-custom-apps@easysignage
```

The skills are then available in every project. Just describe what you want,
for example "build an EasySignage menu board for my cafe".

**Option B: work inside this repo.** Clone it and run `claude` in the folder.
Claude Code reads `CLAUDE.md`, which points it to the skills, examples and
scripts.

**Option C: copy the skill.** Copy `skills/easysignage-custom-app/` to
`~/.claude/skills/` (all projects) or `.claude/skills/` (one project).

## Codex, Cursor, GitHub Copilot and other agents

Clone this repository and open it in your agent. Agents that read
`AGENTS.md` (Codex, Cursor, GitHub Copilot and many others) get the
instructions automatically. For agents that use their own file (for example
`GEMINI.md`), point that file at `AGENTS.md`.

To use the skill in another project, copy `skills/easysignage-custom-app/`
into it and add a line to that project's `AGENTS.md` (or rules file):

```
When building EasySignage custom apps, follow skills/easysignage-custom-app/SKILL.md.
```

## ChatGPT, Claude.ai and other chat assistants

Upload or paste
[`skills/easysignage-custom-app/SKILL.md`](../skills/easysignage-custom-app/SKILL.md)
and [`sdk/easysignage.js`](../sdk/easysignage.js) into the chat, then ask for
your app. On Claude.ai you can also zip the `easysignage-custom-app` folder
and add it as a custom skill.

## Example prompts

Copy one, change the details, and go.

> Build an EasySignage custom app for a cafe menu board. Breakfast and lunch
> menus, chosen per screen with a `menu` tag. Warm colours, works in portrait
> and landscape. Package it as a zip.

> Make an EasySignage welcome screen for our office lobby. Show the time, the
> date and a greeting from the `greeting` tag. Our brand colour is #0057b8.

> Create an EasySignage app that shows a different promotion per store zone
> using the `zone` tag (north, south, food-court). Use the images in
> ./promo-images.

> Build a countdown to our store opening on 1 December at 9am, with the
> event name and date set from player tags.

> Here is our Broadsign HTML5 creative in ./old-creative. Migrate it to an
> EasySignage custom app and tell me which tags to set on each player.

> Review ./my-app for problems that would stop it working on EasySignage
> screens, fix them, and package it.

## What the agent hands back

A good result includes:

1. An app folder that passes `./scripts/check.sh`.
2. A `.zip` with `index.html` at the root.
3. The tags to set on each player, with example values.
4. A preview URL, for example `index.html?tags.zone=north`.
5. The upload steps: Media, then playlist, then screen.

Always review generated code before putting it on screens, and never give an
agent real API keys or passwords to embed in an app.
