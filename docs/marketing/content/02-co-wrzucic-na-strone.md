# Co wrzucić na stronę konkursową (poza pitchem i filmem)

Wszystkie pliki są w dwóch językach. Ścieżki poniżej są względne wobec katalogu `out/` w paczce; `{pl,en}` oznacza dwie wersje tego samego obrazu.

## Zanim wrzucisz

- **Makiety i zrzuty to dwie różne rzeczy.** `01-plansze`, `02-ekrany-ui` i `03-dodatkowe` to makiety zbudowane na tokenach, krojach i ikonach naszego design systemu, na danych przykładowych (rodzina w Gdańsku). Wyglądają jak produkcja, ale część ekranów (miara sprawiedliwości w aplikacji, przeplanowanie przy deszczu, rozliczenie, wydatki) ma dziś logikę tylko w backendzie. `04-prawdziwa-aplikacja` to zrzuty z działającego frontendu na danych testowych (MSW). Opisy w formularzu mówią to wprost, więc jury nie poczuje się wprowadzone w błąd.
- **Gdańsk jest przykładem.** Katalog ze sprawdzonymi cenami ma Warszawę, Kraków, Berlin i Londyn. Makiety pokazują Gdańsk jak pitch deck; jeśli ktoś zapyta, mów „dane przykładowe”.
- **Rozmiary.** Plansze mają 1920×1080, ekrany telefonu 1170×2532 (iPhone 3×), ekrany desktopu 2880×1888 (2×). Jeśli platforma ma limit wagi, przepuść PNG przez TinyPNG albo zapisz jako JPG 85%.

## Kolejność w galerii (rekomendacja: 10 obrazów)

Jury ocenia pomysł (30%), związek z kategorią AI (20%), użyteczność (20%), design (20%) i kompletność (10%). Kolejność prowadzi przez te kryteria.

| # | Plik | Kryterium | Podpis PL | Caption EN |
| --- | --- | --- | --- | --- |
| 1 | `01-plansze/{pl,en}/01-hero.png` | design, pomysł | Plan, po którym nikt nie czuje, że przegrał. Planer wyjazdów rodzinnych i grupowych na telefon i laptop. | A trip plan nobody feels they lost on. A family and group trip planner for phone and laptop. |
| 2 | `01-plansze/{pl,en}/02-problem.png` | problem | Plan z czatbota: 3 problemy na 5 punktów. Plan TuttiTrip dla tej samej rodziny: 0. | A chatbot plan: 3 issues in 5 items. The TuttiTrip plan for the same family: 0. |
| 3 | `01-plansze/{pl,en}/09-code.png` | kategoria AI | Model językowy rozmawia i tłumaczy, a plan liczy deterministyczny kod. | The language model talks and explains; deterministic code computes the plan. |
| 4 | `01-plansze/{pl,en}/03-interview.png` | użyteczność, AI | Wywiad jednym zdaniem, głosem albo tekstem. Każdy ocenia miejsca z powodem. | An interview in one sentence, by voice or text. Everyone rates places with a reason. |
| 5 | `01-plansze/{pl,en}/04-fairness.png` | pomysł | Najmniej zadowolona osoba: 58 punktów zamiast 22. | Least happy person: 58 points instead of 22. |
| 6 | `01-plansze/{pl,en}/05-decision.png` | pomysł, użyteczność | Organizator widzi koszt decyzji, zanim ją wymusi. | The organiser sees the cost of a decision before forcing it. |
| 7 | `01-plansze/{pl,en}/08-vote.png` | użyteczność | Babcia głosuje z linku albo kodu QR, bez konta. | Grandma votes from a link or QR code, without an account. |
| 8 | `01-plansze/{pl,en}/06-replan.png` | użyteczność | Deszcz od 11:00: plan przeliczony w kilka sekund, 0 problemów. | Rain from 11:00: the plan is recalculated in seconds, 0 issues. |
| 9 | `01-plansze/{pl,en}/10-devices.png` | design, kompletność | PWA na telefon i laptop, PL i EN, jasny i ciemny motyw, serwer MCP. | A PWA for phone and laptop, Polish and English, light and dark, an MCP server. |
| 10 | `01-plansze/{pl,en}/11-proof.png` | kompletność | Liczby, które da się sprawdzić: testy, skrót planu, sprawdzone ceny. | Numbers you can check: tests, the plan hash, checked prices. |

Jeśli galeria przyjmie więcej: `07-settle.png` (rozliczenie), `03-dodatkowe/{pl,en}/how.png` (jak to działa), `compare.png` (porównanie z czatbotem), `arch.png` (architektura), `fair-explained.png` (co znaczą liczby).

Obraz okładkowy / miniatura projektu: `03-dodatkowe/{pl,en}/cover.png`. Do udostępniania linku: `og.png` (1200×630). Do mediów społecznościowych: `social.png` (1080×1080).

`01-plansze/{pl,en}/12-close.png` z kodem QR do aplikacji nadaje się na ostatni obraz albo na stoisko.

## Ekrany interfejsu (gdy platforma ma osobną sekcję „snapshots”)

Najmocniejsze pojedyncze ekrany, w kolejności:

| Plik | Co pokazuje |
| --- | --- |
| `02-ekrany-ui/desktop/{pl,en}-light/03-plan.png` | plan dnia z werdyktami, miara sprawiedliwości, koszt dnia, skrót planu |
| `02-ekrany-ui/telefon/{pl,en}-light/04-plan.png` | ten sam plan na telefonie |
| `02-ekrany-ui/desktop/{pl,en}-light/02-interview.png` | wywiad z panelem „Co już wiem” |
| `02-ekrany-ui/telefon/{pl,en}-light/02-interview.png` | ocena miejsca z powodem „Nie mój klimat” |
| `02-ekrany-ui/desktop/{pl,en}-light/04-check.png` | sprawdzenie planu wklejonego z czatbota |
| `02-ekrany-ui/telefon/{pl,en}-light/05-decision.png` | propozycja zmiany i decyzja z ceną |
| `02-ekrany-ui/telefon/{pl,en}-light/08-vote.png` | głosowanie z linku bez konta |
| `02-ekrany-ui/desktop/{pl,en}-light/05-people.png` | głosy na miejsca ze źródłem i weto, procent maksimum każdej osoby |
| `02-ekrany-ui/telefon/{pl,en}-dark/04-plan.png` | ciemny motyw |

Pełny zestaw: 9 ekranów telefonu i 6 ekranów desktopu, każdy w 4 wariantach (PL/EN × jasny/ciemny).

## Zrzuty z działającej aplikacji

`04-prawdziwa-aplikacja/{desktop,telefon}/{pl,en}-{light,dark}/` to zrzuty prawdziwego frontendu (aktualny kod z repozytorium) uruchomionego w trybie `pnpm dev:mock`. Dane podaje MSW, a w zrzutach podmieniliśmy tylko imię konta testowego i adres źródła z `example.com`. Dobre jako dowód, że aplikacja istnieje:

- `06-plan.png`: plan ze znacznikami „Cena zweryfikowana” i „Cena niezweryfikowana”, skrótem planu i wydrukiem do PDF,
- `07-plan-zgoda-budzet.png`: plan, który wymaga zgody na przekroczenie budżetu,
- `05-osoby.png`: profile z ograniczeniami (dystans, drzemka, schody, minimum zadowolenia),
- `08-glosowanie-z-linku.png`: strona `/glos` dla osoby bez konta, z wetem,
- `09-zaproszenie.png`: dołączanie do wyjazdu z linku.

Najlepiej wrzucić 2–3 z nich obok makiet z podpisem „Zrzut z działającej aplikacji, dane testowe” / “Screenshot of the running app, test data”.

## Teksty alternatywne (alt) dla najważniejszych obrazów

| Plik | Alt PL | Alt EN |
| --- | --- | --- |
| 01-hero | Strona TuttiTrip z hasłem „Plan, po którym nikt nie czuje, że przegrał”, polem do wpisania pierwszego zdania oraz planem wyjazdu do Gdańska na laptopie i telefonie. | TuttiTrip page with the line “A trip plan nobody feels they lost on”, a field for the first sentence, and a Gdańsk trip plan on a laptop and a phone. |
| 02-problem | Plan poniedziałku z czatbota z trzema problemami: muzeum zamknięte w poniedziałek, 9 km pieszo z babcią, budżet przekroczony o 240 zł. Obok wynik sprawdzenia: 3 problemy kontra 0 w planie TuttiTrip. | A chatbot’s Monday plan with three issues: a museum closed on Mondays, a 9 km walk with grandma, budget over by 240 zł. Next to it the check result: 3 issues versus 0 in the TuttiTrip plan. |
| 04-fairness | Wykres zadowolenia pięciu osób w skali 0–100 z podłogą 40 punktów. W planie TuttiTrip najniższy wynik ma Kuba, 58; w planie z czatbota babcia miała 22. | A chart of five people’s satisfaction on a 0–100 scale with a 40-point floor. In the TuttiTrip plan Kuba has the lowest score, 58; in the chatbot plan grandma had 22. |
| 05-decision | Telefon z propozycją przeniesienia Westerplatte na sobotę i kartą „Czeka na Twoją decyzję”: sprawiedliwość 0,87 na 0,71, Kuba 58 na 34, budżet plus 80 zł. | A phone showing a proposal to move Westerplatte to Saturday and a “Waiting for your decision” card: fairness 0.87 to 0.71, Kuba 58 to 34, budget plus 80 zł. |
| 08-vote | Strona głosowania dla babci Heli otwarta z linku: oceny „Chcę”, „Obojętnie”, „Nie chcę” i weto, obok kod QR. | Voting page for grandma Hela opened from a link: “Want”, “Don’t mind”, “Don’t want” and a veto, with a QR code next to it. |
