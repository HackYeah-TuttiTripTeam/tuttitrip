# AGENTS.md

Repozytorium zbiorcze TuttiTrip: README i submoduły `frontend`, `backend` i
`worker`. Kod, reguły architektury i polecenia każdej części są w jej
własnym repozytorium i jej pliku AGENTS.md.

## Design system

Skill `tuttitrip-design-system` (`.claude/skills/tuttitrip-design-system`) jest wspólny dla wszystkich
repozytoriów. Diagramy, slajdy i materiały do pitchu korzystają z jego kolorów, krojów, znaku i słownika
(nazwa produktu: tylko TuttiTrip).

## Praca agentów nad issues

Nad backlogiem pracuje równolegle kilku agentów AI i ludzi. Te zasady pilnują, żeby nikt nie wchodził
innym w drogę i żeby każda funkcja przeszła ten sam proces. Dotyczą też ludzi.

1. Wybór issue. Bierzesz tylko issue z tablicy
   [TuttiTrip](https://github.com/orgs/HackYeah-TuttiTripTeam/projects/1) ze statusem Todo, bez etykiety
   `in-progress` i bez przypisanej osoby. Linia „Zależy od:” w opisie wymienia issues, które muszą być
   zmergowane do `main`. Jeśli któreś nie jest, pracuj tylko na jego kontrakcie (np. stała odpowiedź z
   OpenAPI) i napisz to w komentarzu. Kolejność: najpierw P0, potem P1, w obrębie milestone'u.
2. Zajęcie issue, zanim napiszesz kod:
   - `gh issue edit <nr> --add-label in-progress`,
   - Status na tablicy: In Progress,
   - komentarz „Start” z nazwą gałęzi, ścieżką worktree i krótkim planem (pliki, które zmienisz).
   Etykieta `in-progress` znaczy „zajęte”. Nie bierz takiego issue i nie zmieniaj go bez zgody zespołu.
3. Worktree i gałąź. Nigdy nie pracuj w głównym klonie repozytorium. Jedno issue to jeden worktree, jedna
   gałąź i jeden PR do `main`:

   ```bash
   git -C ~/Documents/GitHub/tuttitrip fetch origin
   git -C ~/Documents/GitHub/tuttitrip worktree add -b docs/<nr>-<krotka-nazwa> \
     ~/Documents/GitHub/worktrees/tuttitrip/tuttitrip-<nr>-<krotka-nazwa> origin/main
   ```

   Kod backendu, workera i frontendu zmieniasz w ich repozytoriach według ich AGENTS.md.
4. Komentarze ze statusem w issue po każdym etapie: plan, implementacja z testami, wynik smoke testu,
   wynik review subagenta, link do PR. Krótko: co zrobione, co dalej, co blokuje. Gdy utkniesz: etykieta
   `blocked` i komentarz z powodem i tym, czego potrzebujesz.
5. Pliki wspólne, w których łatwo o konflikt, zmieniaj małymi krokami i przed PR rób
   `git fetch origin && git rebase origin/main`:
   - `README.md`, `AGENTS.md` i `docs/` (diagramy generuj skryptami z `docs/diagramy`).
6. Smoke test jest obowiązkowy dla KAŻDEGO zrealizowanego feature'a. Po pushu gałęzi poczekaj na
   wdrożenie podglądu i przejdź na żywo scenariusz z kryteriów akceptacji issue:
   - sprawdź, jak dokument wygląda na GitHubie (renderowanie, linki, diagramy).
   Wynik (kroki, odpowiedzi albo zrzuty ekranu) wpisz w komentarzu w issue. Bez zielonego smoke testu
   nie ma PR.
7. Review subagenta. Po zielonym smoke teście uruchom subagenta-recenzenta z diffem gałęzi, treścią
   issue i story źródłową. Sprawdza:
   - uproszczenie kodu i zbędną złożoność (skille `simplify` i `ponytail-review`),
   - złożoność logiki,
   - poprawność biznesową względem story, słownika z dokumentu architektonicznego i, przy logice
     planowania, specyfikacji algorytmu (`docs/algorytm.md` w tuttitrip-backend).
   Popraw to, co znalazł, i **powtórz smoke test**. Wynik review i drugiego smoke testu wpisz w komentarzu.
8. PR. Dopiero po tym otwórz PR do `main` skillem `open-pr` (`Closes #<nr>`) i ustaw Status: In
   Review. Po merge'u zdejmij `in-progress`, usuń worktree
   (`git -C ~/Documents/GitHub/<repo> worktree remove <ścieżka>`); issue zamyka `Closes`, Status: Done.

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
- PR mergujemy przez "Squash and merge", tytuł PR staje się commitem na
  `main`. Gałąź po merge'u usuwa workflow `Delete merged branch` (nigdy
  `main` ani `develop`). Gotowy szablon opisu ma skill `open-pr`.
- Bez dopisków o AI w commitach, PR i zgłoszeniach.

## Prezentacje

- `docs/presentations` wdraża workflow `Decks` (`.github/workflows/decks.yml`)
  na Worker Cloudflare: `main` na https://tuttitrip-decks.gburek.app, inne
  gałęzie na `https://tuttitrip-decks-<slug>.gburek.app`. Pod `/` jest lista
  prezentacji, generowana przez `docs/presentations/_site/build.mjs`.
- Prezentacja to plik `nazwa.html`, statyczny katalog `nazwa/index.html` albo
  projekt `nazwa/package.json`, którego `build` zapisuje stronę do `$DECK_OUT`
  z zasobami pod `$DECK_BASE`. Szczegóły:
  [docs/presentations/README.md](docs/presentations/README.md).
- Workflow działa na `[self-hosted, hackathon]` (Chrome do PDF instaluje
  `setup-chrome`) i tylko na push. Domeny nie przejmuje
  siłą (`check-custom-domain.mjs`), a Workery usuniętych gałęzi sprząta
  `cleanup.mjs`.

## Powiadomienia (Discord)

- `.github/workflows/discord-notify.yml` wysyła na Discord zespołu wyniki
  workflow `Delete merged branch`, `Issue format` i `PR format` tego
  repozytorium, ale tylko gdy się nie udały (sukcesy tych sprawdzeń są
  pomijane, `skipped` też). Logika jest wspólna, w repozytorium `.github`
  (`discord-notify.yml`). `workflow_run` działa tylko z kopii na `main`.
- Nowy workflow trzeba dopisać po nazwie (`name:`) do listy `workflows:`.
- Workflow działa na `[self-hosted, hackathon]`, jak wszystkie workflowy
  organizacji, nie pobiera kodu, a tytuły i nazwy gałęzi czyta tylko w github-script.
- Webhook to sekret repozytorium `DISCORD_WEBHOOK_URL`. Rotacja i pozostałe
  zasady: [CONTRIBUTING.md](https://github.com/HackYeah-TuttiTripTeam/.github/blob/main/CONTRIBUTING.md#powiadomienia-discord).
  URL-a webhooka nie wklejamy nigdzie.
