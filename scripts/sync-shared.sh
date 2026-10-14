#!/usr/bin/env bash
# Copies the shared files from sdk/ into every app folder and the agent skill,
# so all copies stay identical. Run after changing anything in sdk/.
#
#   easysignage.js            -> every app
#   theme.css, theme.js, fonts -> apps whose index.html uses theme.css

set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SDK="$ROOT/sdk"

for app in "$ROOT"/templates/*/ "$ROOT"/examples/*/; do
  rel="${app#$ROOT/}"
  cp "$SDK/easysignage.js" "$app/easysignage.js"
  if grep -q 'theme.css' "$app/index.html" 2>/dev/null; then
    cp "$SDK/theme.css" "$SDK/theme.js" "$app/"
    rm -rf "$app/fonts" && cp -R "$SDK/fonts" "$app/fonts"
    echo "Updated ${rel}: easysignage.js, theme.css, theme.js, fonts/"
  else
    echo "Updated ${rel}: easysignage.js"
  fi
done

SKILL="$ROOT/skills/easysignage-custom-app/assets"
cp "$SDK/easysignage.js" "$SDK/theme.css" "$SDK/theme.js" "$SKILL/"
rm -rf "$SKILL/fonts" && cp -R "$SDK/fonts" "$SKILL/fonts"
echo "Updated skills/easysignage-custom-app/assets"
