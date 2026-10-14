#!/usr/bin/env bash
# Zips an app folder into an EasySignage custom app package.
#
#   ./scripts/package.sh examples/clock          -> dist/clock.zip
#   ./scripts/package.sh my-app out/my-app.zip   -> out/my-app.zip
#
# The folder's contents go at the top level of the zip, so index.html sits at
# the root of the archive as EasySignage requires. Runs check.sh first.

set -eu

APP="${1:-}"
if [ -z "$APP" ] || [ ! -d "$APP" ]; then
  echo "Usage: $0 <app-folder> [output.zip]"
  exit 2
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$(cd "$APP" && pwd)"
NAME="$(basename "$APP")"
OUT="${2:-$ROOT/dist/$NAME.zip}"

"$ROOT/scripts/check.sh" "$APP"

mkdir -p "$(dirname "$OUT")"
OUT="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
rm -f "$OUT"

# Zip from inside the folder so paths are relative to it.
(cd "$APP" && zip -r -q -X "$OUT" . -x '.DS_Store' '*/.DS_Store' 'Thumbs.db' '.git/*' '__MACOSX/*' 'README.md')

echo "Created $OUT"
echo "Next: upload it under Media in EasySignage, add it to a playlist, assign the playlist to a screen."
