#!/usr/bin/env bash
# Copies sdk/easysignage.js into every app folder and the agent skill, so all
# copies stay identical. Run after updating sdk/easysignage.js.

set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/sdk/easysignage.js"

for dest in "$ROOT"/templates/*/ "$ROOT"/examples/*/ "$ROOT/skills/easysignage-custom-app/assets/"; do
  cp "$SRC" "$dest/easysignage.js"
  echo "Updated ${dest#$ROOT/}easysignage.js"
done
