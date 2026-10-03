# AGENTS.md

Repozytorium zbiorcze TuttiTrip: README i submoduły `frontend`, `backend` i
`worker`. Kod, reguły architektury i polecenia każdej części są w jej
własnym repozytorium i jej pliku AGENTS.md.

## Zgłoszenia i PR

Zasady są wspólne dla całej organizacji, pełny opis jest w
[CONTRIBUTING.md](https://github.com/HackYeah-TuttiTripTeam/.github/blob/main/CONTRIBUTING.md).

Zgłoszenia (issues):

- Tytuł zaczyna się od `feat:`, `docs:`, `chore:` albo `bug:`, opcjonalnie
  z zakresem, np. `feat(pitch): Eksport planu do PDF`. Regex:
  `^(feat|docs|chore|bug)(\([a-z0-9-]+\))?: \S.{3,}`.
- Treść ma sekcje `###` i żadna wymagana nie może być pusta. W `feat`,
  `docs` i `chore` są to Opis, Dlaczego, Kryteria akceptacji, Definition of
  Done i Obszar (w `feat` można dodać Poza zakresem). W `bug` są to Opis,
  Kroki do odtworzenia, Oczekiwane zachowanie, Faktyczne zachowanie,
  Środowisko, Dlaczego, Kryteria akceptacji, Definition of Done i Obszar.
- `.github/workflows/issue-format.yml` sprawdza każde nowe i edytowane
  zgłoszenie. Złe zamyka jako "not planned", dodaje etykietę
  `invalid-format` i pisze w komentarzu, co poprawić. Po poprawce otwiera je
  ponownie. Ustawia też etykietę `type:*`.
- Z terminala (skill `new-issue` przygotuje treść i założy zgłoszenie):

  ```bash
  gh issue create --title "feat(pitch): Eksport planu do PDF" --body-file - <<'MD'
  ### Opis
  Organizator pobiera gotowy plan jako PDF.

  ### Dlaczego
  W podróży plan musi być dostępny offline, a nie każdy instaluje PWA.

  ### Kryteria akceptacji
  - [ ] Given gotowy plan, When kliknę "Pobierz PDF", Then dostanę plik z planem dzień po dniu

  ### Definition of Done
  - [ ] CI zielone (lint, typy, testy, testy architektury)
  - [ ] PR zmergowany do `develop` i sprawdzony na wdrożeniu develop

  ### Obszar
  Pitch
  MD
  ```

Pull requesty:

- To repozytorium ma tylko gałąź `main`, więc PR idzie z krótkiej gałęzi
  prosto do `main`.
- Tytuł PR: `feat:`, `docs:`, `chore:` albo `bugfix:` (w PR nie `bug:`),
  opcjonalnie z zakresem. Opis po polsku według szablonu: `## Co i
  dlaczego`, `## Powiązane issue`, `## Lista zmian`, `## Jak przetestować`,
  `## Zrzuty ekranu`, `## Checklista`.
- `.github/workflows/pr-format.yml` oznacza check na czerwono i komentuje,
  gdy tytuł albo sekcje są złe. Czerwony check nie blokuje merge'a (darmowy
  plan), więc nie mergujemy z czerwonym.
- Bez dopisków o AI w commitach, PR i zgłoszeniach.
