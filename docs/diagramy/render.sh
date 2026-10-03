#!/usr/bin/env bash
# Renderuje mapa-pojec.png i mapa-przypadkow-uzycia.png z plików .mmd.
# Wymaga Node.js 20+ (npx) oraz Pythona 3 z biblioteką Pillow.
set -euo pipefail
cd "$(dirname "$0")"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
echo '{"args":["--no-sandbox"]}' > "$TMP/puppeteer.json"
mmdc() { npx -y -p @mermaid-js/mermaid-cli@12.0.0 mmdc -q -p "$TMP/puppeteer.json" -b white -s 2 "$@"; }

mmdc -C mapa-pojec.css -i mapa-pojec.mmd -o "$TMP/mapa-pojec.png"
mkdir -p "$TMP/uc"
for f in przypadki-uzycia/*.mmd; do
  mmdc -C przypadki-uzycia.css -i "$f" -o "$TMP/uc/$(basename "${f%.mmd}").png"
done
python3 compose.py "$TMP"
