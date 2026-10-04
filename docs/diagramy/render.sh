#!/usr/bin/env bash
# Eksportuje PNG z osadzonym diagramem (.drawio.png) z plików .drawio.
# Wymaga draw.io desktop (polecenie drawio; na Linuksie także AppImage).
# Uruchom po każdej zmianie pliku .drawio, inaczej PNG pokaże starą wersję.
set -euo pipefail
cd "$(dirname "$0")"
DRAWIO=${DRAWIO:-drawio}
export_png() { "$DRAWIO" -x -f png --embed-diagram -b 12 -s "$2" -o "$1.png" "$1"; }

export_png mapa-pojec.drawio 0.96
export_png architektura.drawio 0.9
export_png mapa-przypadkow-uzycia.drawio 0.95
for f in przypadki-uzycia/*.drawio; do export_png "$f" 1.9; done
