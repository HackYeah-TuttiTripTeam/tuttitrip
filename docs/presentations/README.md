# Prezentacje

Wszystko z tego katalogu trafia na https://tuttitrip-decks.gburek.app. Pod `/` jest lista prezentacji, a każda prezentacja ma własny adres, np. https://tuttitrip-decks.gburek.app/TuttiTrip_pitch_deck.

Workflow `.github/workflows/decks.yml` buduje i wdraża prezentacje po każdym pushu, który je zmienia:

| Gałąź | Adres |
| --- | --- |
| `main` | https://tuttitrip-decks.gburek.app |
| inna, np. `feature/decks` | https://tuttitrip-decks-feature-decks.gburek.app |

Wdrożenie gałęzi znika razem z gałęzią.

## Dodanie prezentacji

Nazwy zaczynające się od `_` albo `.` są pomijane, a `index` i `404` są zajęte przez listę i stronę błędu. Tytuł na liście to `<title>` strony, a opis to `<meta name="description">`, jeśli strona go ma.

- **Jeden plik HTML** (np. eksport z Claude, Google Slides czy Keynote): wrzuć `nazwa.html`. Adres: `/nazwa` (`/nazwa.html` przekierowuje na `/nazwa`). Obrazki i fonty muszą być wewnątrz pliku albo pod pełnymi adresami.
- **Gotowy statyczny katalog** (np. reveal.js bez builda): `nazwa/index.html` plus pliki obok. Adres: `/nazwa/`.
- **Projekt ze skryptem build** (Slidev, Marp, reveal.js z Vite): katalog `nazwa/` z `package.json` i lockfile'em (`package-lock.json` albo `pnpm-lock.yaml`). CI uruchamia `npm ci` i `npm run build` (albo ich odpowiedniki w pnpm) z dwiema zmiennymi:
  - `DECK_OUT`: katalog, do którego build ma zapisać stronę z `index.html`,
  - `DECK_BASE`: ścieżka, pod którą będzie strona (`/nazwa/`), potrzebna do linków do zasobów.

  Przykładowe skrypty `build`:

  ```jsonc
  // Slidev
  "build": "slidev build slides.md --base $DECK_BASE --out $DECK_OUT"
  // Marp (jeden plik HTML)
  "build": "marp slides.md --html -o $DECK_OUT/index.html"
  // reveal.js z Vite
  "build": "vite build --base $DECK_BASE --outDir $DECK_OUT --emptyOutDir"
  ```

  Rodzaj na liście (Slidev, Marp, reveal.js) wynika z zależności w `package.json`.

## Lokalnie

```bash
node docs/presentations/_site/build.mjs                   # buduje do _site/dist
cd docs/presentations/_site && npx wrangler@4.146.0 dev   # http://localhost:8787
```

## Jak to działa

Pliki w `_site/`:

- `build.mjs` znajduje prezentacje, buduje projekty i generuje listę (`explorer.html` to jej szablon) oraz stronę 404,
- `wrangler.jsonc` to Worker Cloudflare z samymi plikami statycznymi, bez kodu,
- `target.sh` wylicza nazwę Workera i domenę z nazwy gałęzi,
- `check-custom-domain.mjs` (kopia z frontendu) zatrzymuje wdrożenie, gdy domena albo rekord DNS należy do czegoś innego,
- `cleanup.mjs` usuwa Workery gałęzi, których już nie ma. Uruchamia go każde wdrożenie i workflow `Decks cleanup`.

CI potrzebuje sekretu `CLOUDFLARE_API_TOKEN` i zmiennej `CLOUDFLARE_ACCOUNT_ID` w tym repozytorium, takich samych jak we frontendzie. Bez nich buduje prezentacje, ale nie wdraża ich i zostawia ostrzeżenie.
