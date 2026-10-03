# Diagramy

Dwa diagramy projektu TuttiTrip. Źródłem są pliki Mermaid (`.mmd`), a pliki PNG
renderuje z nich skrypt `render.sh`.

| Plik | Co pokazuje |
| --- | --- |
| `mapa-pojec.mmd`, `mapa-pojec.png` | Mapa pojęć: 46 haseł ze słownika pojęć w 7 grupach (Konta i role, Podróże i członkostwo, Preferencje i wywiad, Planowanie, Miejsca noclegi i transport, Wydatki, Architektura). Strzałki to relacje wynikające z definicji w słowniku. |
| `przypadki-uzycia/*.mmd`, `mapa-przypadkow-uzycia.png` | Mapa przypadków użycia (UML). Jeden plik to jedna domena systemu albo aktorzy lub legenda. Przypadki z istniejących user stories są pełne, a nowe stories ze słownika jaśniejsze i przerywane. |
| `mapa-pojec.css`, `przypadki-uzycia.css` | Wygląd diagramów (pogrubione tytuły ramek, etykiety «include» i «extend», kolory aktorów). |
| `render.sh`, `compose.py` | Renderowanie PNG (szerokość 2000 px, białe tło). |

## Jak edytować

1. Zmień plik `.mmd` w dowolnym edytorze. Podgląd na żywo daje
   [mermaid.live](https://mermaid.live) (wklej treść pliku) albo w VS Code
   rozszerzenie z podglądem Mermaid. Przypadki użycia korzystają z diagramu
   `usecase-beta` z Mermaid 12, a mapa pojęć z układu ELK. Podgląd na GitHubie
   może ich jeszcze nie obsługiwać, dlatego aktualny obraz jest w plikach PNG.
2. Wyrenderuj PNG ponownie:

   ```bash
   ./docs/diagramy/render.sh
   ```

   Skrypt potrzebuje Node.js 20+ (pobiera przez `npx`
   `@mermaid-js/mermaid-cli@12.0.0`) oraz Pythona 3 z biblioteką Pillow
   (`pip install pillow`). Nadpisuje oba pliki PNG.
3. Zacommituj razem zmienione `.mmd` i PNG. PNG bez ponownego renderowania nie
   pokaże zmian.

Nową domenę przypadków użycia dodaje się jako kolejny plik
`przypadki-uzycia/NN-nazwa.mmd` i wpisuje jej nazwę (część po myślniku) do
listy `rest` w `compose.py`.
