# Diagramy

Trzy diagramy projektu TuttiTrip w formacie draw.io (diagrams.net). Każdy
diagram ma plik `.drawio` i edytowalny PNG (`.drawio.png`) z osadzonym
diagramem: diagrams.net otwiera taki PNG do edycji tak samo jak `.drawio`.

| Plik | Co pokazuje |
| --- | --- |
| `mapa-pojec.drawio`, `mapa-pojec.drawio.png` | Mapa pojęć: 46 haseł ze słownika pojęć w 7 grupach (Konta i role, Podróże i członkostwo, Preferencje i wywiad, Planowanie, Miejsca noclegi i transport, Wydatki, Architektura). Strzałki to relacje wynikające z definicji w słowniku. |
| `architektura.drawio`, `architektura.drawio.png` | Architektura: urządzenia, Cloudflare, własny host (backend z podziałem S1, S2 i S3, PostgreSQL, worker DBOS, modele na GB10) i usługi zewnętrzne (Auth0, OpenAI Realtime, Google Maps, OpenRouter). Opis decyzji: [docs/architektura.md](../architektura.md). |
| `mapa-przypadkow-uzycia.drawio`, `mapa-przypadkow-uzycia.drawio.png` | Mapa przypadków użycia (UML): aktorzy z generalizacją, legenda i 8 domen z dokumentu, w tej samej kolejności. Przypadki z istniejących user stories są pełne, nowe stories ze słownika jaśniejsze i przerywane. |
| `przypadki-uzycia/<domena>.drawio`, `przypadki-uzycia/<domena>.drawio.png` | Ta sama mapa pocięta na domeny, do wstawiania do dokumentu po jednej. |

## Edycja w diagrams.net

Otwórz plik prosto z GitHuba:

- [Mapa pojęć](https://app.diagrams.net/#HHackYeah-TuttiTripTeam%2Ftuttitrip%2Fmain%2Fdocs%2Fdiagramy%2Fmapa-pojec.drawio)
- [Architektura](https://app.diagrams.net/#HHackYeah-TuttiTripTeam%2Ftuttitrip%2Fmain%2Fdocs%2Fdiagramy%2Farchitektura.drawio)
- [Mapa przypadków użycia](https://app.diagrams.net/#HHackYeah-TuttiTripTeam%2Ftuttitrip%2Fmain%2Fdocs%2Fdiagramy%2Fmapa-przypadkow-uzycia.drawio)

Format linku: `https://app.diagrams.net/#H` plus zakodowana ścieżka
`HackYeah-TuttiTripTeam/tuttitrip/main/docs/diagramy/<plik>.drawio`. Można też
w diagrams.net wybrać Plik → Otwórz z → GitHub. Zapis z diagrams.net do GitHuba
tworzy commit, więc w tym repozytorium lepiej pobrać plik, zmienić go na
gałęzi i otworzyć PR.

Lokalnie pliki `.drawio` i `.drawio.png` otwiera draw.io desktop albo
rozszerzenie Draw.io Integration (`hediet.vscode-drawio`) w VS Code.

## Po zmianie: eksport PNG

PNG nie aktualizuje się sam. Po każdej zmianie pliku `.drawio` wyeksportuj PNG
ponownie z osadzonym diagramem:

```bash
./docs/diagramy/render.sh
```

Skrypt wymaga draw.io desktop (polecenie `drawio`, ścieżkę można podać w
zmiennej `DRAWIO`). Ręcznie: Plik → Eksportuj jako → PNG, zaznaczona opcja
„Dołącz kopię diagramu”, nazwa `<plik>.drawio.png`.

## Skąd się wzięły

- `architektura.py` generuje `architektura.drawio` (`python3 architektura.py`, potem `render.sh`). Układ i kolory (zieleń marki dla S1 i modeli lokalnych, przerywany obrys dla tego, co jest poza naszą infrastrukturą) są w skrypcie; to nadpisuje ręczne zmiany w pliku.
- `przypadki_uzycia.py` generuje `mapa-przypadkow-uzycia.drawio` i pliki w
  `przypadki-uzycia/`. Przy dużych zmianach (nowe przypadki, nowa domena)
  łatwiej poprawić dane w skrypcie i uruchomić go ponownie
  (`python3 przypadki_uzycia.py`, potem `render.sh`). Uwaga: to nadpisuje
  ręczne zmiany w tych plikach.
- Mapa pojęć powstała z `mapa-pojec.mmd` (Mermaid, układ ELK):
  `mermaid2drawio.py` przenosi do draw.io układ z SVG wyrenderowanego przez
  `@mermaid-js/mermaid-cli`
  (`npx -p @mermaid-js/mermaid-cli@12.0.0 mmdc -i mapa-pojec.mmd -o /tmp/mapa.svg`,
  potem `python3 mermaid2drawio.py mapa-pojec.mmd /tmp/mapa.svg mapa-pojec.drawio`).
  Mapę pojęć edytuje się teraz w draw.io, a
  `mapa-pojec.mmd` zostaje jako zapis relacji.
