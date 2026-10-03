# TuttiTrip

TuttiTrip to planer wyjazdów rodzinnych i grupowych, który układa plan, po którym nikt w grupie nie czuje, że przegrał. Projekt powstaje na hackathonie HackYeah 2026.

To repozytorium zbiera trzy części aplikacji jako submoduły gita: frontend, backend i workera. Kod każdej części żyje w osobnym repozytorium, a tutaj jest opis całości i instrukcja uruchomienia.

## Problem

W grupie zwykle jedna osoba planuje cały wyjazd. Każdy chce czegoś innego: dziecko park rozrywki, nastolatek coś ze znajomymi, babcia muzeum i odpoczynek, partner tanio i blisko. Plany z czatbotów brzmią dobrze, ale często pomijają godziny otwarcia, odległości, tempo najwolniejszej osoby i wymagania co do noclegu.

## Co robi TuttiTrip

- Organizator opisuje wyjazd jednym zdaniem („Gdańsk, trzy dni, dzieci 6 i 13 lat, babcia”), a asystent dopytuje tylko o to, co najbardziej zmienia plan. Odpowiedzi zbiera kartami i suwakami. Pozostałych uczestników organizator dodaje jako profile, więc nie muszą zakładać kont.
- Dla każdego miejsca każda osoba ma „chcę”, „nie chcę” albo „obojętnie”, a przy „nie chcę” podaje powód. Aplikacja pokazuje werdykt z uzasadnieniem. Organizator może go nadpisać i widzi, ile to kosztuje (sprawiedliwość, budżet, czas).
- Plan układa deterministyczny solver, który dzieli zadowolenie między osoby możliwie po równo, z uwzględnieniem wag i budżetu grupy.
- Linter planu sprawdza godziny otwarcia, dystanse, tempo, przerwy, budżet i wymagania noclegowe. Działa też na planie z innego narzędzia, np. wklejonym z czatbota.
- Wymagania wobec noclegu (basen, kuchnia, parking, konkretna platforma) są kontraktem sprawdzanym dla każdej nocy.
- Wydatki zasilają budżet planu i rozliczenie. W trakcie wyjazdu plan można przeliczyć, gdy pada deszcz albo dziecko jest zmęczone.

Nowe jest to, że model językowy prowadzi rozmowę i pisze uzasadnienia, ale o planie decyduje zwykły kod (solver, linter, reguły cenowe, rozliczenie). Te same dane wejściowe dają ten sam plan, a liczbę naruszeń reguł da się policzyć i porównać z planem z czatbota. Testy architektury w backendzie pilnują, żeby ta logika nie zależała od frameworka webowego, agentów AI ani bazy.

## Środowiska

| Środowisko | Aplikacja | API (Swagger) |
| --- | --- | --- |
| produkcja (`main`) | https://tuttitrip.gburek.app | https://tuttitrip-api.gburek.app/docs |
| develop | https://tuttitrip-develop.gburek.app | https://tuttitrip-api-develop.gburek.app/docs |

Aplikacja to PWA, więc na telefonie można ją dodać do ekranu głównego.

## Repozytoria

| Katalog | Repozytorium | Co zawiera |
| --- | --- | --- |
| [`frontend/`](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-frontend) | `tuttitrip-frontend` | aplikacja webowa (PWA) |
| [`backend/`](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-backend) | `tuttitrip-backend` | API, baza danych, solver i linter |
| [`worker/`](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-worker) | `tuttitrip-worker` | zadania w tle: agenci AI, embeddingi, przeliczenia |

> Uwaga: repozytoria z kodem są na razie prywatne. Zostaną upublicznione po hackathonie, a wcześniej udostępniamy je jury na prośbę. Do tego czasu linki do submodułów mogą zwracać 404, a `git clone --recurse-submodules` nie pobierze ich zawartości bez dostępu do organizacji.

## Architektura

```mermaid
flowchart LR
    user["Organizator<br/>(telefon lub przeglądarka)"]
    fe["frontend<br/>React + Vite, PWA<br/>Cloudflare Workers"]
    be["backend<br/>FastAPI"]
    db[("PostgreSQL 18<br/>+ pgvector<br/>+ kolejki DBOS")]
    wk["worker<br/>DBOS + Pydantic AI"]
    llm["Modele językowe<br/>OpenRouter i modele lokalne"]
    auth["Auth0"]

    user --> fe
    fe -- "REST (typy z OpenAPI)" --> be
    fe -. logowanie .-> auth
    be -- "dane, zlecanie zadań" --> db
    wk -- "pobiera zadania, zapisuje wyniki" --> db
    wk --> llm
```

- Frontend ([tuttitrip-frontend](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-frontend)): React 19, TypeScript, Vite, TanStack Router i Query, shadcn/ui na Tailwind v4. Działa jako PWA na Cloudflare Workers. Typy zapytań generuje z `/openapi.json` backendu, więc niezgodność z API wychodzi już przy kompilacji.
- Backend ([tuttitrip-backend](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-backend)): Python 3.14, FastAPI, Pydantic, SQLAlchemy i Alembic, PostgreSQL 18 z pgvector, logowanie przez Auth0. Domeny (wyjazdy, profile, wywiad, planowanie, noclegi, wydatki) są osobnymi modułami. Solver sprawiedliwości, linter i rozliczenie to czysta logika bez zależności od frameworka. Długich operacji backend nie wykonuje sam, tylko zleca je workerowi przez kolejkę DBOS i odczytuje ich stan.
- Worker ([tuttitrip-worker](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-worker)): trwałe workflowy [DBOS](https://docs.dbos.dev/) z agentami [Pydantic AI](https://ai.pydantic.dev/). Postęp zapisuje w Postgresie, więc po restarcie kończy zadanie od ostatniego kroku i nie powtarza udanych wywołań modelu. Korzysta z modeli przez OpenRouter albo z lokalnego endpointu zgodnego z API OpenAI, a embeddingi liczy lokalnie (Ollama, `nomic-embed-text`). Backend i worker łączy wersjonowany kontrakt, który CI sprawdza w obu repozytoriach.

## Klonowanie

```bash
git clone --recurse-submodules https://github.com/HackYeah-TuttiTripTeam/tuttitrip.git
cd tuttitrip
```

Jeśli repozytorium jest już sklonowane bez submodułów albo chcesz pobrać najnowsze `main` każdej części:

```bash
git submodule update --init --remote
```

Submoduły śledzą gałąź `main`. W tym repozytorium zapisany jest konkretny commit każdej części. Żeby przesunąć go na aktualne `main`:

```bash
git submodule update --remote
git add frontend backend worker
git commit -m "Aktualizacja submodułów"
git push
```

Do pracy nad kodem lepiej klonować repozytoria części osobno. Każde ma własne CI, gałąź `develop` i podglądy dla gałęzi.

## Uruchomienie lokalne

Wymagania:

- Docker z Docker Compose (lokalny Postgres z pgvector),
- [uv](https://docs.astral.sh/uv/) dla backendu i workera (sam pobierze Pythona 3.14),
- Node.js 22+ i pnpm (przez `corepack`) dla frontendu,
- opcjonalnie: klucz OpenRouter albo lokalny model zgodny z API OpenAI dla agentów oraz [Ollama](https://ollama.com) z `nomic-embed-text` dla embeddingów. Testy nie potrzebują żadnego z nich.

Backend startuje pierwszy, bo do niego należą schemat bazy, migracje i tabele DBOS.

### 1. Backend

API wystartuje na http://localhost:8000.

```bash
cd backend
uv sync
cp .env.example .env
docker compose up -d --wait db
uv run alembic upgrade head
uv run dbos migrate -s postgresql://tuttitrip:tuttitrip@localhost:5432/tuttitrip
uv run uvicorn tuttitrip.main:app --reload
```

### 2. Worker

W drugim terminalu:

```bash
cd worker
uv sync
cp .env.example .env    # domyślne wartości pasują do bazy z compose backendu
uv run tuttitrip-worker
```

Czy backend i worker się widzą, sprawdzisz tak:

```bash
curl -X POST localhost:8000/jobs/ping          # zwraca workflow_id
curl localhost:8000/jobs/ping/<workflow_id>    # status SUCCESS
```

### 3. Frontend

W trzecim terminalu. Aplikacja wystartuje na http://localhost:5173.

```bash
cd frontend
corepack enable
pnpm install
cp .env.example .env.local
pnpm api:sync    # typy API z lokalnego backendu
pnpm dev
```

Bez zmiennych `VITE_AUTH0_*` aplikacja działa z wyłączonym logowaniem. Frontend można też podłączyć do wdrożonego API: `VITE_API_URL=https://tuttitrip-api-develop.gburek.app`.

Szczegóły (zmienne środowiskowe, port bazy inny niż 5432, uruchamianie w kontenerach, testy i lint, zasady architektury) są w README każdej części:

- [frontend/README.md](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-frontend/blob/main/README.md)
- [backend/README.md](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-backend/blob/main/README.md)
- [worker/README.md](https://github.com/HackYeah-TuttiTripTeam/tuttitrip-worker/blob/main/README.md)

## Jak pracujemy

Zadania prowadzimy w projekcie GitHub organizacji. Pracę nad zadaniem zaczynamy na gałęzi `feature/...` od `develop` i otwieramy PR do `develop`. Wydanie to PR z `develop` do `main`. Każda gałąź dostaje własny podgląd frontendu i API.

## Zespół

| Osoba | Rola |
| --- | --- |
| _imię i nazwisko_ | _rola_ |
| _imię i nazwisko_ | _rola_ |
| _imię i nazwisko_ | _rola_ |
| _imię i nazwisko_ | _rola_ |
| _imię i nazwisko_ | _rola_ |
