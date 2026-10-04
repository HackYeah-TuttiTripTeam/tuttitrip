# Co wrzucić na stronę konkursową (poza pitchem i filmem)

Wszystkie pliki są w dwóch językach. Ścieżki poniżej są względne wobec katalogu `out/` w paczce; `{pl,en}` oznacza dwie wersje tego samego obrazu.

## Zanim wrzucisz

- **Makiety i zrzuty to dwie różne rzeczy.** `01-plansze`, `02-ekrany-ui` i `03-dodatkowe` to makiety zbudowane na tokenach, krojach i ikonach naszego design systemu, na danych przykładowych (rodzina w Gdańsku). Wyglądają jak produkcja i odwzorowują frontend z `develop`, ale dwa elementy nie mają jeszcze ekranu w aplikacji: miara sprawiedliwości i przeplanowanie po nagłym zdarzeniu (to drugie jest w budowie). `04-prawdziwa-aplikacja` to zrzuty z działającego frontendu na danych testowych (MSW). Opisy w formularzu mówią to wprost, więc jury nie poczuje się wprowadzone w błąd.
- **Gdańsk jest przykładem.** Katalog ze sprawdzonymi cenami ma Warszawę, Kraków, Berlin i Londyn. Makiety pokazują Gdańsk jak pitch deck; jeśli ktoś zapyta, mów „dane przykładowe”.
- **Rozmiary.** Plansze mają 1920×1080, ekrany telefonu 1170×2532 (iPhone 3×), ekrany desktopu 2880×1888 (2×). Jeśli platforma ma limit wagi, przepuść PNG przez TinyPNG albo zapisz jako JPG 85%.

## Kolejność w galerii (rekomendacja: 10 obrazów)

Jury ocenia pomysł (30%), związek z kategorią AI (20%), użyteczność (20%), design (20%) i kompletność (10%). Kolejność prowadzi przez te kryteria. Kategoria AI ma teraz dwie mocne plansze: „Gdzie pracuje AI” i „Tech stack i architektura”.

| # | Plik | Kryterium | Podpis PL | Caption EN |
| --- | --- | --- | --- | --- |
| 1 | `01-plansze/{pl,en}/01-hero.png` | design, pomysł | Plan, po którym nikt nie czuje, że przegrał. Planer wyjazdów rodzinnych i grupowych na telefon i laptop. | A trip plan nobody feels they lost on. A family and group trip planner for phone and laptop. |
| 2 | `01-plansze/{pl,en}/02-problem.png` | problem | Plan z czatbota: 3 problemy na 5 punktów. Plan TuttiTrip dla tej samej rodziny: 0. | A chatbot plan: 3 issues in 5 items. The TuttiTrip plan for the same family: 0. |
| 3 | `01-plansze/{pl,en}/13-ai.png` | kategoria AI | Gdzie pracuje AI: wywiad głosem i kartami AG-UI, modele decyzyjne, nagłe zdarzenia, uzasadnienia, MCP, mapy i kalendarz. Wszystko na Pydantic AI. | Where AI does the work: voice interview with AG-UI cards, decision models, sudden events, explanations, MCP, maps and calendar. All on Pydantic AI. |
| 4 | `01-plansze/{pl,en}/03-interview.png` | użyteczność, AI | Wywiad jednym zdaniem albo głosem. Asystent pyta kartami, a fakty trafiają do panelu „Co już wiem”. | An interview in one sentence or by voice. The assistant asks with cards and facts land in “What I know so far”. |
| 5 | `01-plansze/{pl,en}/04-fairness.png` | pomysł | Najmniej zadowolona osoba: 58 punktów zamiast 22. | Least happy person: 58 points instead of 22. |
| 6 | `01-plansze/{pl,en}/05-decision.png` | pomysł, użyteczność | Organizator widzi koszt decyzji, zanim ją wymusi. | The organiser sees the cost of a decision before forcing it. |
| 7 | `01-plansze/{pl,en}/08-vote.png` | użyteczność | Babcia głosuje z linku albo kodu QR, bez konta. | Grandma votes from a link or QR code, without an account. |
| 8 | `01-plansze/{pl,en}/07-settle.png` | użyteczność | Wydatek zdaniem albo zdjęciem paragonu, saldo każdej osoby i najmniej przelewów. | An expense as a sentence or a receipt photo, each person’s balance and the fewest transfers. |
| 9 | `01-plansze/{pl,en}/14-stack.png` | kompletność, AI | Tech stack i architektura: frontend PWA, FastAPI, PostgreSQL, worker DBOS, modele na własnym GPU. | Tech stack and architecture: PWA frontend, FastAPI, PostgreSQL, DBOS worker, models on our own GPU. |
| 10 | `01-plansze/{pl,en}/10-devices.png` | design, kompletność | PWA na telefon i laptop, PL i EN, jasny i ciemny motyw, serwer MCP. | A PWA for phone and laptop, Polish and English, light and dark, an MCP server. |

Jeśli galeria przyjmie więcej: `06-replan.png` (deszcz), `09-code.png` (kod liczy, model pisze), `11-proof.png` (liczby), `12-close.png` (kod QR), `03-dodatkowe/{pl,en}/how.png`, `compare.png`, `fair-explained.png`.

Obraz okładkowy / miniatura projektu: `03-dodatkowe/{pl,en}/cover.png`. Do udostępniania linku: `og.png` (1200×630). Do mediów społecznościowych: `social.png` (1080×1080).

`TuttiTrip_galeria_{PL,EN}.pdf` ma te same 10 plansz w tej kolejności.

## Ekrany interfejsu (gdy platforma ma osobną sekcję „snapshots”)

Makiety odwzorowują frontend z gałęzi `develop` (stan z 4 października): pięć zakładek wyjazdu, ikonę pomocy, wywiad AG-UI z panelem „Co już wiem”, rozmowę głosową z napisami, członków, wydatki i rozliczenie. Najmocniejsze pojedyncze ekrany:

| Plik | Co pokazuje |
| --- | --- |
| `02-ekrany-ui/desktop/{pl,en}-light/02-interview.png` | wywiad: zdanie hosta, odpowiedź asystenta, karta „Rozdaj 10 kropek”, panel „Co już wiem” ze źródłem każdego faktu |
| `02-ekrany-ui/telefon/{pl,en}-light/02-interview.png` | karta tak/nie dla miejsca w wywiadzie |
| `02-ekrany-ui/telefon/{pl,en}-light/03-voice.png` | rozmowa głosowa z napisami i informacją, że mówi AI |
| `02-ekrany-ui/desktop/{pl,en}-light/03-plan.png` | plan dnia z werdyktami i uzasadnieniem od modelu, miara sprawiedliwości, koszt dnia, skrót planu |
| `02-ekrany-ui/telefon/{pl,en}-light/05-decision.png` | propozycja zmiany i decyzja z ceną |
| `02-ekrany-ui/telefon/{pl,en}-light/06-rain.png` | deszcz od 11:00: model rozpoznał zdarzenie, solver przeliczył dzień |
| `02-ekrany-ui/desktop/{pl,en}-light/07-expenses.png` | wydatki, przelewy i saldo każdej osoby |
| `02-ekrany-ui/desktop/{pl,en}-light/06-members.png` | członkowie z rolami i potwierdzeniem udziału, zaproszenie z kodem QR |
| `02-ekrany-ui/telefon/{pl,en}-light/10-vote.png` | głosowanie z linku bez konta |
| `02-ekrany-ui/telefon/{pl,en}-dark/04-plan.png` | ciemny motyw |

Pełny zestaw: 11 ekranów telefonu i 7 ekranów desktopu, każdy w 4 wariantach (PL/EN × jasny/ciemny).

## Zrzuty z działającej aplikacji

`04-prawdziwa-aplikacja/{desktop,telefon}/{pl,en}-{light,dark}/` to zrzuty prawdziwego frontendu z gałęzi `develop` uruchomionego w trybie `pnpm dev:mock`. Dane podaje MSW, a w zrzutach podmieniliśmy tylko nazwę konta testowego („Ola Testowa” na „Ola Nowak”) i adres źródła `example.com`. Dobre jako dowód, że aplikacja istnieje:

- `05-wywiad-karty.png`: wywiad po pierwszym zdaniu, karta budżetu i panel „Co już wiem” z oznaczeniem „ustalił asystent”,
- `03-utworz-glosowo.png`: zakładanie wyjazdu głosem,
- `08-plan.png` i `09-plan-zgoda-budzet.png`: plan ze znacznikami weryfikacji cen, skrótem planu i zgodą na przekroczenie budżetu,
- `10-wydatki.png` i `11-rozliczenie.png`: wydatki, przelewy i saldo każdej osoby,
- `07-czlonkowie.png`: członkowie z rolami i statusem udziału,
- `12-glosowanie-z-linku.png`: strona `/glos` dla osoby bez konta, z wetem.

Najlepiej wrzucić 2–3 z nich obok makiet z podpisem „Zrzut z działającej aplikacji, dane testowe” / “Screenshot of the running app, test data”.

## Teksty alternatywne (alt) dla najważniejszych obrazów

| Plik | Alt PL | Alt EN |
| --- | --- | --- |
| 01-hero | Strona TuttiTrip z hasłem „Plan, po którym nikt nie czuje, że przegrał”, polem do wpisania pierwszego zdania oraz planem wyjazdu do Gdańska na laptopie i telefonie. | TuttiTrip page with the line “A trip plan nobody feels they lost on”, a field for the first sentence, and a Gdańsk trip plan on a laptop and a phone. |
| 02-problem | Plan poniedziałku z czatbota z trzema problemami: muzeum zamknięte w poniedziałek, 9 km pieszo z babcią, budżet przekroczony o 240 zł. Obok wynik sprawdzenia: 3 problemy kontra 0 w planie TuttiTrip. | A chatbot’s Monday plan with three issues: a museum closed on Mondays, a 9 km walk with grandma, budget over by 240 zł. Next to it the check result: 3 issues versus 0 in the TuttiTrip plan. |
| 04-fairness | Wykres zadowolenia pięciu osób w skali 0–100 z podłogą 40 punktów. W planie TuttiTrip najniższy wynik ma Kuba, 58; w planie z czatbota babcia miała 22. | A chart of five people’s satisfaction on a 0–100 scale with a 40-point floor. In the TuttiTrip plan Kuba has the lowest score, 58; in the chatbot plan grandma had 22. |
| 05-decision | Telefon z propozycją przeniesienia Westerplatte na sobotę i kartą „Czeka na Twoją decyzję”: sprawiedliwość 0,87 na 0,71, Kuba 58 na 34, budżet plus 80 zł. | A phone showing a proposal to move Westerplatte to Saturday and a “Waiting for your decision” card: fairness 0.87 to 0.71, Kuba 58 to 34, budget plus 80 zł. |
| 08-vote | Strona głosowania dla babci Heli otwarta z linku: oceny „Chcę”, „Obojętnie”, „Nie chcę” i weto, obok kod QR. | Voting page for grandma Hela opened from a link: “Want”, “Don’t mind”, “Don’t want” and a veto, with a QR code next to it. |
| 13-ai | Sześć kart pokazujących, gdzie w TuttiTrip pracuje AI, ze statusem „Działa”, „W budowie” albo „W planach” i nazwami modeli, pod spodem pasek o frameworku Pydantic AI. | Six cards showing where AI works in TuttiTrip, each marked “Live”, “In progress” or “Planned” with model names, and a strip about the Pydantic AI framework below. |
| 14-stack | Diagram architektury w czterech kolumnach: ludzie, aplikacja, backend oraz worker i modele, połączone kropkowanymi liniami, pod nim lista technologii. | An architecture diagram in four columns: people, app, backend, and worker and models, joined by dotted lines, with the list of technologies below. |
