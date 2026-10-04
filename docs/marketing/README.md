# TuttiTrip: materiały marketingowe na HackYeah 2026

Paczka do strony konkursowej HackTribe (kategoria Sztuczna inteligencja). Wszystko jest po polsku i po angielsku.

## Co jest w środku

| Katalog | Zawartość |
| --- | --- |
| `content/01-formularz-hacktribe.md` | nowe teksty do każdego pola formularza: tytuł, zespół, problem, rozwiązanie, co zrobione i cel, dłuższy opis, związek z kategorią AI |
| `content/02-co-wrzucic-na-strone.md` | które obrazy wrzucić, w jakiej kolejności, z podpisami i tekstami alternatywnymi |
| `content/03-krotkie-teksty.md` | hasło, jedno zdanie, pitch na 30 sekund, posty PL/EN, instrukcja dla jury |
| `out/01-plansze/{pl,en}/` | 14 plansz marketingowych 1920×1080 w stylu pitch decku (plus wersja ciemna okładki), w tym `13-ai` (gdzie pracuje AI) i `14-stack` (tech stack i architektura) |
| `out/02-ekrany-ui/telefon/` | 11 ekranów aplikacji na telefon, 1170×2532, PL/EN × jasny/ciemny |
| `out/02-ekrany-ui/desktop/` | 7 ekranów aplikacji na desktop w oknie przeglądarki, 2880×1888, PL/EN × jasny/ciemny |
| `out/03-dodatkowe/{pl,en}/` | okładka, obraz do udostępniania 1200×630, post kwadratowy 1080×1080, „jak to działa”, porównanie z czatbotem, „co znaczą liczby”, zestaw urządzeń |
| `out/04-prawdziwa-aplikacja/` | zrzuty działającego frontendu na danych testowych (MSW), telefon i desktop |
| `out/TuttiTrip_galeria_{PL,EN}.pdf` | 10 plansz w jednym PDF, gdyby trzeba było dołączyć materiał graficzny osobno od pitcha |
| `src/` | źródła makiet: jeden plik `mock.html` na tokenach, krojach, ikonach i logo z design systemu |

## Makiety a działająca aplikacja

Plansze i ekrany w `01`–`03` są makietami. Zbudowałem je z tokenów (`theme.css`), krojów (Funnel Display, Atkinson Hyperlegible Next), ikon Keyline i logo „Horyzont” z design systemu TuttiTrip. Układ odwzorowuje frontend z gałęzi `develop` z 4 października: pięć zakładek wyjazdu (Wywiad, Osoby, Członkowie, Plan, Wydatki), ikonę pomocy, wywiad AG-UI z kartami i panelem „Co już wiem” (z oznaczeniami „ustalił asystent” i „poprawione”), rozmowę głosową z napisami, tworzenie wyjazdu głosem, członków z potwierdzaniem udziału oraz wydatki z rozliczeniem (przelewy, saldo, „Pobierz listę”). Dwie rzeczy nie mają jeszcze ekranu w aplikacji: miara sprawiedliwości i przeplanowanie po nagłym zdarzeniu. Teksty w formularzu mówią to otwarcie.

Katalog `04` to prawdziwy frontend z `develop` uruchomiony przez `pnpm dev:mock` (MSW, scenariusze `family-warsaw`, `interview-empty`, `needs-approval`, `vote-with-link`, `join-valid`). W zrzutach zamieniłem tylko nazwę konta testowego („Ola Testowa” na „Ola Nowak”) i źródło `example.com` na „arkusz zespołu”, oraz schowałem przyciski devtools. Odpowiedzi asystenta w wywiadzie pochodzą z danych testowych MSW i w wersji EN są po polsku.

## Jak wygenerować obrazy od nowa

```bash
cd docs/marketing/src
# podgląd w przeglądarce: index.html (lista ekranów) albo mock.html?s=mob-plan&lang=en&theme=dark
npx http-server . -p 8080
```

Obrazy powstają w Chromium przez Playwright (zrzut elementu `#root`): plansze w skali 1,2, telefon 3, desktop 2. Ikony (`icons.js`) i kody QR (`qr.js`) są wyrenderowane z `@keyline-icons/react` i `qrcode.react` z frontendu.

## Przegląd designu (krytyka i poprawki)

Nowe plansze i ekrany (`13-ai`, `14-stack`, wywiad, głos, członkowie, wydatki, rozliczenie) przeszły detektor `impeccable` (`npx impeccable detect`, w trybie URL). Poprawiłem to, co znalazł: warstwę z połączeniami diagramu, która przykrywała nagłówki, za długą linię leadu, kontrast opisu na ciemnym pasku Pydantic AI, przeskoki poziomów nagłówków i „cienką ramkę z szerokim cieniem” na ramce przeglądarki i karcie do przesuwania. Zostało jedno zgłoszenie „0px padding” przy polu wiadomości. To fałszywy alarm, bo tekst jest wyśrodkowany w polu o stałej wysokości 52px. Ostatni przebieg detektora nie zgłosił nic więcej.

Przeszedłem każdą planszę według zasad z README design systemu. Co znalazłem i co zostało:

- **Jedna kartka na poziom.** Panele leżą płasko z włoskowym obrysem, bez cieni; cień ma tylko dok w telefonie i ramki urządzeń. Bez gradientów, szkła i efektów z rejestrów.
- **Pełne = fakt, przerywane = niepewne.** Konsekwentnie: „Kultowe, ale nie Twoje”, „Cena niezweryfikowana”, niepewny paragon i pozycje „przeniesione na niedzielę” mają przerywany obrys; kropki przerywane na wykresie sprawiedliwości to pozycje z planu czatbota.
- **Decyzja ma cenę.** Przycisk „Wymuś mimo to” jest w kolorze atramentu z kosztem w etykiecie, zieleń zostaje dla „chcę” i bezpiecznego kroku.
- **Liczba, potem zdanie.** Każdy panel z wynikiem ma liczbę w kroju display i jedno zdanie obok („Najmniej zadowolony: Kuba, 58.”).
- **Poprawione w trakcie:** telefon nachodził na stopkę na pięciu planszach (zmniejszony), nagłówek telefonu dziedziczył rozmiar nagłówka planszy, awatary w wierszu głosów gubiły litery, okładka zasłaniała hasło telefonem, a na planszy rozliczenia było naciągane „3 przelewy zamiast 12” (jest „zamiast 6”, bo przy 4 osobach każda para to najwyżej jeden przelew).
- **Do decyzji zespołu:** plansze mają dużo tekstu jak na galerię. Jeśli platforma pokazuje miniatury, najlepiej czytają się `01-hero`, `04-fairness`, `05-decision` i `08-vote`. Rodzina i Gdańsk to dane przykładowe z pitch decku (katalog ze sprawdzonymi cenami obejmuje Warszawę, Kraków, Berlin i Londyn); ciocia Zosia zastąpiła dziecko, żeby rozliczenie wyglądało realnie.

## Zdjęcia

Gdańsk, Kraków, Berlin, Warszawa: Unsplash (licencja Unsplash, autorzy w `tuttitrip-frontend/src/assets/photos/CREDITS.md`). Okładka i obraz OG używają zdjęcia Długiego Targu autorstwa Daryi Tryfanavej; podpis jest na okładce.
