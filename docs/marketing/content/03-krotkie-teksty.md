# Krótkie teksty: hasła, pitch na 30 sekund, posty

## Hasło

- PL: Plan, po którym nikt nie czuje, że przegrał.
- EN: A trip plan nobody feels they lost on.

Hasło jest stałe (design system), nie zmieniaj jego brzmienia.

## Jedno zdanie

- PL: TuttiTrip pyta każdą osobę z grupy, czego chce, i układa plan wyjazdu, w którym kod pilnuje godzin, budżetu i tego, żeby nikt nie został z niczym.
- EN: TuttiTrip asks everyone in the group what they want and builds a trip plan where code keeps track of opening hours, the budget and making sure nobody is left with nothing.

## Pitch na 30 sekund (do nagrania albo na scenę)

**PL:** Na wyjeździe rodzinnym każdy chce czegoś innego, a plan robi jedna osoba. Czatbot napisze go w kilka sekund, ale w naszym teście trzy z pięciu punktów były błędne: zamknięte muzeum, 9 km spaceru z babcią, przekroczony budżet. W TuttiTrip AI tylko rozmawia. Pyta każdą osobę, także babcię przez link bez konta, a plan liczy kod: sprawdza godziny i dystanse i dzieli zadowolenie tak, żeby nikt nie spadł poniżej minimum. Gdy organizator chce coś wymusić, widzi, ile to kosztuje innych.

**EN:** On a family trip everyone wants something different, and one person makes the plan. A chatbot writes it in seconds, but in our test three of five items were wrong: a closed museum, a 9 km walk with grandma, a blown budget. In TuttiTrip the AI only talks. It asks every person, grandma included through a link without an account, and code computes the plan: it checks hours and distances and shares satisfaction so nobody falls below a minimum. When the organiser wants to force something, they see what it costs the others.

## Post (LinkedIn / Facebook), PL

Przez 24 godziny HackYeah 2026 w Krakowie budowaliśmy TuttiTrip, planer wyjazdów rodzinnych i grupowych.

Zaczęło się od pytania, które zna każdy organizator: jak ułożyć plan, z którego zadowolone będą i dziecko, i nastolatek, i babcia? Czatboty piszą ładne plany, ale ich nie liczą. Sprawdziliśmy jeden: muzeum zamknięte w poniedziałek, 9 km pieszo z babcią i budżet przekroczony o 240 zł.

W TuttiTrip model językowy prowadzi rozmowę i tłumaczy decyzje. Plan układa solver sprawiedliwości, a sprawdzenie planu wyłapuje to, czego nie da się zrobić. Babcia głosuje z linku, bez konta. A kiedy organizator chce coś przeforsować, widzi, ile punktów traci przez to reszta.

Zespół: Łukasz Gęborys, Cyprian Gburek, Angelika Korcz, Michał Sadrzak, Tomasz Florczak.
Wypróbuj: https://tuttitrip.gburek.app

## Post, EN

We spent 24 hours at HackYeah 2026 in Kraków building TuttiTrip, a planner for family and group trips.

It started with a question every organiser knows: how do you make a plan the kid, the teenager and grandma are all happy with? Chatbots write nice plans, but they don’t compute them. We checked one: a museum closed on Monday, a 9 km walk with grandma and a budget 240 zł over.

In TuttiTrip the language model runs the conversation and explains decisions. A fairness solver builds the plan, and a plan check catches what can’t be done. Grandma votes from a link, no account needed. And when the organiser wants to push something through, they see how many points it costs everyone else.

Team: Łukasz Gęborys, Cyprian Gburek, Angelika Korcz, Michał Sadrzak, Tomasz Florczak.
Try it: https://tuttitrip.gburek.app

## Jak jury może sprawdzić aplikację (do opisu)

- PL: Otwórz https://tuttitrip.gburek.app na telefonie albo w przeglądarce. Link do konta demo z przygotowanymi wyjazdami (`/demo#t=…`) wpisz tutaj przed wysłaniem. Aplikację można dodać do ekranu głównego. Dokumentacja API: https://tuttitrip-api.gburek.app/api/v1/docs.
- EN: Open https://tuttitrip.gburek.app on a phone or in a browser. Paste the demo account link with prepared trips (`/demo#t=…`) here before submitting. You can add the app to your home screen. API docs: https://tuttitrip-api.gburek.app/api/v1/docs.

> Link demo zawiera token i nie ma go w repozytorium. Wklej go tylko do materiałów dla jury, nie do publicznych postów.
