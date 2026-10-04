# TuttiTrip: teksty do formularza HackTribe

Każde pole jest w dwóch wersjach: po polsku i po angielsku. Regulamin dopuszcza oba języki. Jeśli formularz ma jedno pole na tekst, wklej wersję angielską, a polską daj w PDF albo w opisie projektu (jury jest z Polski, ale część mentorów pisze po angielsku).

Liczby w tekstach pochodzą z danych demonstracyjnych i z repozytoriów (stan na 4.10.2026). Nie dopisuj nowych liczb bez sprawdzenia.

---

## Tytuł projektu / Project title

**PL:** TuttiTrip: plan wyjazdu, po którym nikt w grupie nie czuje, że przegrał

**EN:** TuttiTrip: a group trip plan nobody feels they lost on

## Nazwa zespołu / Team name

HackYeah-TuttiTripTeam

## Członkowie / Team members

| Imię i nazwisko | Rola PL | Role EN |
| --- | --- | --- |
| Łukasz Gęborys | lider zespołu, produkt, AI | team lead, product, AI |
| Cyprian Gburek | architektura, backend, frontend, DevOps | architecture, backend, frontend, DevOps |
| Angelika Korcz | cyberbezpieczeństwo | cybersecurity |
| Michał Sadrzak | UI, AI, aplikacja webowa | UI, AI, web app |
| Tomasz Florczak | inne technologie (uzupełnij) | other technologies (fill in) |

> Role wziąłem z tabeli „Zespół” w README repozytorium `tuttitrip`. Sprawdź je z Angeliką i Tomaszem przed wysłaniem.

## Strona / Website

https://tuttitrip.gburek.app

Pitch dla jury: https://tuttitrip-decks.gburek.app/TuttiTrip_pitch_jury

---

## Krótki opis (1–2 zdania, do listy projektów)

**PL:** TuttiTrip to planer wyjazdów rodzinnych i grupowych. Każda osoba mówi, czego chce, a plan układa i sprawdza kod, więc widać, kto ile dostał i ile kosztuje każda decyzja.

**EN:** TuttiTrip is a planner for family and group trips. Everyone says what they want, then code builds and checks the plan, so you can see what each person got and what every decision costs.

---

## What problem are you solving with the idea?

### PL

Wyjazd rodzinny albo ze znajomymi zwykle planuje jedna osoba. Dziecko chce na plac zabaw, nastolatek chce czegoś ze znajomymi, babcia muzeum i odpoczynek, a ktoś inny pilnuje budżetu. Organizator próbuje to pogodzić w głowie albo w czacie grupowym i ktoś prawie zawsze wraca z poczuciem, że jego potrzeby się nie liczyły.

Czatboty AI szybko piszą plan, który dobrze brzmi. Model językowy przewiduje jednak tekst i niczego nie liczy, więc taki plan często nie przechodzi zwykłego sprawdzenia. W naszym teście czatbot zaplanował poniedziałek w Gdańsku z muzeum, które w poniedziałki jest zamknięte, 9 km spaceru z babcią, która daje radę przejść 3 km dziennie, i kolacją, która przekroczyła budżet dnia o 240 zł. W pięciu punktach planu były trzy błędy.

Czatbot nie pokazuje też, kto na planie zyskał, a kto stracił. W tym samym planie babcia dostała 22 punkty zadowolenia na 100. Kiedy w trakcie wyjazdu zaczyna padać albo trzeba rozliczyć wydatki, zaczyna się ręczne przeliczanie i kłótnie.

### EN

A family trip, or a trip with friends, is usually planned by one person. The child wants a playground, the teenager wants something with friends, grandma wants a museum and a rest, and someone else is watching the budget. The organiser tries to fit all of that together in their head or in a group chat, and someone almost always comes home feeling their needs didn’t count.

AI chatbots write a plan that sounds good in seconds. A language model predicts text and doesn’t compute anything, so the plan often fails a basic check. In our test a chatbot planned a Monday in Gdańsk with a museum that is closed on Mondays, a 9 km walk with a grandmother who can manage 3 km a day, and a dinner that went 240 zł over the day’s budget. Three of the five items were wrong.

A chatbot also doesn’t show who gained and who lost. In that same plan grandma got 22 satisfaction points out of 100. And when it starts to rain mid-trip, or when it’s time to split the costs, the group is back to recalculating by hand and arguing.

---

## What is your solution?

### PL

TuttiTrip dzieli pracę między model językowy i zwykły kod. Model prowadzi rozmowę i pisze uzasadnienia. Wszystkie liczby w planie (godziny, dojazdy, ceny, budżet, zadowolenie każdej osoby) liczy deterministyczny kod, więc te same dane zawsze dają ten sam plan z tym samym skrótem SHA-256.

1. **Rozmowa zamiast formularza.** Organizator opisuje wyjazd jednym zdaniem, głosem albo tekstem, np. „Gdańsk, trzy dni, Kuba 13 lat i babcia, która nie da rady dużo chodzić”. Asystent dopytuje tylko o to, co najbardziej zmienia plan. Pozostałe osoby organizator dodaje jako profile, więc dziecko i babcia nie potrzebują kont.
2. **Głos każdej osoby.** Każdy ocenia miejsca: chcę, obojętnie albo nie chcę, a przy „nie chcę” podaje powód („za drogo”, „za daleko”, „nie mój klimat”). Babcia dostaje link albo kod QR i głosuje bez konta i bez instalowania aplikacji. Może też zgłosić weto.
3. **Plan z solvera.** Solver sprawiedliwości maksymalizuje dobrobyt Nasha z wagami osób, z twardymi ograniczeniami (weto, godziny otwarcia, budżet) i z podłogą zadowolenia dla każdej osoby. Każdy widzi, jaki procent tego, co dostałby planując sam, dostaje w planie grupy. W naszym przykładzie najmniej zadowolona osoba ma 58 punktów; w planie z czatbota miała 22.
4. **Sprawdzenie planu.** Kod sprawdza godziny otwarcia, dystanse, tempo najwolniejszej osoby, przerwy, budżet i wymagania noclegowe (np. parking i winda). Działa też na planie wklejonym z czatbota albo z notatek.
5. **Decyzja z ceną.** Organizator może nadpisać werdykt, ale zanim to zrobi, widzi koszt: spadek sprawiedliwości, ile punktów traci konkretna osoba i ile złotych dochodzi do budżetu. Przekroczenie budżetu wymaga jego zgody i pokazuje cenę za punkt zadowolenia.
6. **W trakcie i po wyjeździe.** Gdy pada, plan przelicza się od nowa i pokazuje tylko to, co się zmieniło. Wydatki zasilają budżet, a rozliczenie podaje najmniejszą liczbę przelewów. Niepewny odczyt paragonu czeka na potwierdzenie.

Ceny i godziny mają źródło i datę sprawdzenia. To, czego nie zweryfikowaliśmy, jest wyraźnie oznaczone, a solver dolicza do niezweryfikowanych cen 15% zapasu.

### EN

TuttiTrip splits the work between a language model and ordinary code. The model runs the conversation and writes the explanations. Every number in the plan (hours, travel, prices, budget, each person’s satisfaction) comes from deterministic code, so the same input always gives the same plan with the same SHA-256 hash.

1. **A conversation instead of a form.** The organiser describes the trip in one sentence, by voice or text, for example “Gdańsk, three days, Kuba is 13 and grandma can’t walk much”. The assistant only asks about what changes the plan most. The organiser adds the others as profiles, so a child or a grandparent doesn’t need an account.
2. **Everyone has a say.** Each person rates places as want, don’t mind or don’t want, and gives a reason for “don’t want” (“too expensive”, “too far”, “not my vibe”). Grandma gets a link or a QR code and votes without an account or an app. She can also veto a place.
3. **A plan from a solver.** The fairness solver maximises Nash welfare with per-person weights, hard constraints (vetoes, opening hours, budget) and a satisfaction floor for everyone. Each person sees what share of their solo optimum they get in the group plan. In our example the least happy person has 58 points; in the chatbot plan they had 22.
4. **A plan check.** Code checks opening hours, distances, the slowest person’s pace, breaks, budget and accommodation requirements (say, parking and a lift). It also works on a plan pasted from a chatbot or from notes.
5. **Decisions with a price.** The organiser can override a verdict, but first sees what it costs: the drop in fairness, how many points a specific person loses and how much money it adds. Going over budget needs their explicit consent and shows the price per satisfaction point.
6. **During and after the trip.** When it rains, the plan is recalculated and shows only what changed. Expenses feed the budget, and the settlement uses the fewest bank transfers. An uncertain receipt reading waits for confirmation.

Prices and opening hours carry a source and the date they were checked. Anything unverified is marked as such, and the solver adds a 15% margin to unverified prices.

---

## What’s done so far and goal of your project

### PL

Wszystko powstało podczas HackYeah 2026, w 24 godziny. Wcześniej nie mieliśmy kodu.

Działa dziś:

- aplikacja webowa (PWA) po polsku i po angielsku, z jasnym i ciemnym motywem: https://tuttitrip.gburek.app; jury wchodzi na przygotowane konto demo jednym linkiem,
- wyjazdy i jednodniowe wyjścia, profile osób bez kont, zaproszenia dla członków grupy, role host, co-host i członek,
- linki do głosowania z kodem QR dla osób bez konta i zbiorczy wynik głosów z oznaczeniem źródła (aplikacja, link, host),
- plan dnia z godzinami, cenami ze źródłem i znacznikiem weryfikacji, skrótem planu i wydrukiem do PDF,
- w backendzie: solver sprawiedliwości, sprawdzenie planu, kontrakt noclegu, ceny z zapasem dla niezweryfikowanych pozycji, rozliczenie wydatków, wywiad; ponad 970 testów, w tym testy architektury, które pilnują, żeby ta logika nie zależała od frameworka, bazy ani modeli AI,
- worker z trwałymi zadaniami (DBOS i Pydantic AI): czytanie wklejonego planu z cytatem, dane miejsc z OpenStreetMap, embeddingi; modele działają na naszym GPU (GB10), a OpenRouter jest zapasem,
- katalog miejsc dla Warszawy, Krakowa, Berlina i Londynu z cenami i godzinami sprawdzonymi ręcznie,
- serwer MCP, przez który dane wyjazdu można podłączyć do Claude, ChatGPT i Claude Code.

Część ekranów, które pokazujemy w materiałach (miara sprawiedliwości w aplikacji, przeplanowanie przy deszczu, rozliczenie), ma już logikę w backendzie, a interfejs jest na etapie makiet.

Cel: dokończyć te ekrany, przetestować TuttiTrip z kilkoma rodzinami na prawdziwych wyjazdach, a potem dodać dowolne miasto na żądanie i tryb offline w podróży.

### EN

Everything was built during HackYeah 2026, in 24 hours. We had no code before.

Working today:

- a web app (PWA) in Polish and English, light and dark: https://tuttitrip.gburek.app; the jury gets into a prepared demo account with one link,
- trips and one-day outings, profiles for people without accounts, invitations for group members, host, co-host and member roles,
- voting links with a QR code for people without an account, and a vote summary that shows where each vote came from (app, link, host),
- a day plan with times, prices with a source and a verified mark, a plan hash and a print/PDF view,
- in the backend: the fairness solver, the plan check, the accommodation contract, pricing with a margin for unverified items, expense settlement and the interview; more than 970 tests, including architecture tests that keep this logic independent of the web framework, the database and AI models,
- a worker with durable jobs (DBOS and Pydantic AI): reading a pasted plan with quotes, place data from OpenStreetMap, embeddings; models run on our own GPU (GB10) with OpenRouter as a fallback,
- a place catalogue for Warsaw, Kraków, Berlin and London with prices and opening hours checked by hand,
- an MCP server that connects trip data to Claude, ChatGPT and Claude Code.

Some screens in our materials (the fairness meter in the app, rain replanning, the settlement view) already have their logic in the backend, while the interface is still at the mock-up stage.

Goal: finish those screens, test TuttiTrip with a few families on real trips, then add any city on demand and an offline mode for the road.

---

## Dłuższy opis projektu / Project description (jeśli jest osobne pole)

### PL

Na wyjeździe rodzinnym każdy chce czegoś innego, a plan zwykle układa jedna osoba. TuttiTrip zbiera głos każdego uczestnika, także dziecka i babci bez konta, i układa plan, w którym nikt nie spada poniżej ustalonego minimum zadowolenia.

AI robi w TuttiTrip to, w czym jest dobre: rozmawia głosem i tekstem, rozumie, co ktoś powiedział, czyta wklejone plany i oferty noclegów, pisze uzasadnienia. Plan liczy kod. Solver sprawiedliwości dzieli zadowolenie po równo, sprawdzenie planu odrzuca to, czego nie da się zrobić, a każda decyzja organizatora pokazuje, ile kosztuje innych. Dlatego TuttiTrip potrafi powiedzieć, dlaczego plan wygląda tak, a nie inaczej, i za każdym razem da ten sam wynik dla tych samych danych.

### EN

On a family trip everyone wants something different, and one person usually makes the plan. TuttiTrip collects every participant’s voice, including a child’s and a grandparent’s without an account, and builds a plan where nobody falls below an agreed minimum of satisfaction.

AI does what it is good at in TuttiTrip: it talks by voice and text, understands what someone said, reads pasted plans and accommodation offers, and writes explanations. Code computes the plan. The fairness solver shares satisfaction evenly, the plan check rejects what can’t be done, and every decision the organiser makes shows what it costs the others. That is why TuttiTrip can explain why the plan looks the way it does, and it gives the same result for the same input every time.

---

## Jak to pasuje do kategorii „Sztuczna inteligencja” (do opisu albo PDF)

**PL:** Projekt pokazuje, gdzie AI pomaga, a gdzie trzeba ją ograniczyć. Modele (Qwen3 na naszym GPU, modele decyzyjne, rozmowa głosowa w czasie rzeczywistym) prowadzą wywiad, wyciągają fakty z mowy i tekstu, czytają wklejone plany i oferty z dosłownym cytatem jako dowodem i piszą uzasadnienia werdyktów. Każda liczba, którą model mógłby zmyślić, pochodzi z kodu, który da się przetestować. To odpowiedź na najczęstszy zarzut wobec planerów AI: że zgadują.

**EN:** The project shows where AI helps and where it needs limits. Models (Qwen3 on our own GPU, decision models, real-time voice) run the interview, pull facts out of speech and text, read pasted plans and offers with a verbatim quote as evidence, and write the reasons behind verdicts. Every number a model could make up comes from code that can be tested. That answers the most common complaint about AI trip planners: that they guess.
