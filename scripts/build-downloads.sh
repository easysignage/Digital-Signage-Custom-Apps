#!/usr/bin/env bash
# Rebuilds every zip in downloads/: the examples, the starter template and the
# agent skills. Run after changing any of them, and commit the results.

set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/downloads"

for app in "$ROOT"/examples/*/ "$ROOT"/templates/starter/; do
  name="$(basename "$app")"
  "$ROOT/scripts/package.sh" "$app" "$ROOT/downloads/$name.zip" >/dev/null
  echo "Built downloads/$name.zip"
done

# Agent skills, zipped with the skill folder at the root of the archive, the
# layout Claude.ai expects when uploading a skill.
for skill in "$ROOT"/skills/*/; do
  name="$(basename "$skill")"
  out="$ROOT/downloads/$name-skill.zip"
  rm -f "$out"
  (cd "$ROOT/skills" && zip -r -q -X "$out" "$name" -x '*.DS_Store')
  echo "Built downloads/$name-skill.zip"
done
