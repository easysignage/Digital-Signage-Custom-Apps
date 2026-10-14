#!/usr/bin/env bash
# Rebuilds the ready-to-upload zips in downloads/ for every example and the
# starter template. Run after changing any of them, and commit the results.

set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/downloads"

for app in "$ROOT"/examples/*/ "$ROOT"/templates/starter/; do
  name="$(basename "$app")"
  "$ROOT/scripts/package.sh" "$app" "$ROOT/downloads/$name.zip" >/dev/null
  echo "Built downloads/$name.zip"
done
