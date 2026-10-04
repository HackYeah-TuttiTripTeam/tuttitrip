/* Screens updated to tuttitrip-frontend develop + new AI and stack slides. Loaded after screens.js. */

/* ================= MOBILE ================= */
Object.assign(mob, {
  trips: (bare) => phone({ bare, app: true, body: `
    <div class="between"><h2 class="mttl" style="font-size:30px">${L('Wyjazdy', 'Trips')}</h2><span class="btn outline sm">${ic('Mic', 'sm')}${L('Utwórz głosowo', 'Create by voice')}</span></div>
    <div class="cap" style="margin:4px 0 14px">${L('3 wyjazdy · 1 czeka na Twoją decyzję', '3 trips · 1 is waiting for your decision')}</div>
    <div class="col" style="gap:12px">
      ${tripCard({ photo: 'gdansk-dlugi-targ-1600.webp', name: L('Gdańsk z rodziną', 'Gdańsk with the family'), city: 'Gdańsk', dates: L('9–11 paź', '9–11 Oct'), status: `${ic('Check')}${L('Plan, wersja 3', 'Plan, version 3')}`, statusCls: 'b-want', metric: num(0.87) })}
      ${tripCard({ photo: 'krakow-rynek-1600.webp', name: L('Kraków ze znajomymi', 'Kraków with friends'), city: 'Kraków', dates: L('6–8 lis', '6–8 Nov'), status: `${ic('MessageSquare')}${L('Wywiad: 4 z 6 osób', 'Interview: 4 of 6 people')}`, statusCls: 'b-warning', metric: '' })}
    </div>` }),
  interview: (bare) => phone({ bare, app: true, nav: false, body: mTrip(0, `
    <div class="bubble me" style="font-size:14px;line-height:20px">${L('Gdańsk, trzy dni. Ja, Tomek, Kuba (13), siostra Zosia i babcia, która nie da rady dużo chodzić.', 'Gdańsk, three days. Me, Tomek, Kuba (13), my sister Zosia and Grandma, who can’t walk much.')}</div>
    <div style="margin:10px 0">${aiMsg(L('Zapisałem cel, daty i 5 osób. Babcia: do 3 km dziennie. Teraz kilka miejsc dla Kuby.', 'Saved the destination, dates and 5 people. Grandma: up to 3 km a day. Now a few places for Kuba.'))}</div>
    ${swipeCard()}`),
    extra: `<div style="position:absolute;left:16px;right:16px;bottom:30px" class="row"><div class="composer" style="flex:1">${L('Dopisz, jeśli chcesz…', 'Add something if you like…')}<span class="mic">${ic('Mic')}</span></div></div>` }),
  voice: (bare) => phone({ bare, app: true, nav: false, body: mTrip(0, `
    <div class="sheet" style="padding:18px 16px;text-align:center"><div class="row" style="justify-content:center;gap:8px;color:var(--want-ink);font:650 15px/1 var(--font-display)"><span style="width:8px;height:8px;border-radius:9px;background:var(--primary)"></span>${L('Słucham', 'Listening')}</div>
    <div class="wave" style="margin:10px 0">${[14, 26, 40, 22, 48, 34, 18, 44, 28, 52, 30, 20, 38, 24, 12].map((h) => `<i style="height:${h}px"></i>`).join('')}</div>
    <div class="cap">${L('Rozmawiasz z głosem wygenerowanym przez AI.', 'You are talking to an AI-generated voice.')}</div></div>
    <div class="lbl" style="font-size:14px;margin:14px 0 6px">${L('Napisy rozmowy', 'Call captions')}</div>
    <div class="col" style="gap:8px;font-size:14px;line-height:20px">
      <div><b>${L('Asystent', 'Assistant')}:</b> ${L('Kto jedzie i na co macie ochotę?', 'Who is going and what do you feel like doing?')}</div>
      <div><b>${L('Ty', 'You')}:</b> ${L('Babcia lubi muzea, ale po obiedzie musi odpocząć.', 'Grandma likes museums, but she needs a rest after lunch.')}</div>
      <div class="muted"><b>${L('Asystent', 'Assistant')}:</b> ${L('Zapisuję przerwę po obiedzie. Ile babcia przejdzie dziennie?', 'Saving a break after lunch. How far can Grandma walk a day?')}</div></div>
    <div class="row" style="flex-wrap:wrap;gap:6px;margin-top:12px">${src()}<span class="badge b-neutral">${ic('Coffee')}${L('Przerwa po obiedzie', 'Break after lunch')}</span></div>`),
    extra: `<div style="position:absolute;left:16px;right:16px;bottom:34px"><span class="btn ink block">${ic('X', 'sm')}${L('Zakończ rozmowę', 'End the call')}</span></div>` }),
  plan: (bare) => phone({ bare, app: true, body: mTrip(3, `${summaryStrip()}<div style="margin:12px 0 14px">${dayTabs(1)}</div>${dayPlan()}`) }),
  decision: (bare) => phone({ bare, app: true, body: mTrip(3, `${proposal()}<div style="height:12px"></div>${approval()}`) }),
  rain: (bare) => phone({ bare, app: true, body: mTrip(3, `
    <div class="sheet" style="padding:10px 12px;margin-bottom:12px;background:var(--warning-soft);border-color:transparent"><div class="row lbl" style="color:var(--warning-ink)">${ic('CloudRain')}${L('Silny deszcz od 11:00', 'Heavy rain from 11:00')}</div><div class="row cap" style="gap:5px;color:var(--warning-ink)">${ic('Sparkles', 'xs')}${L('Model: „tylko pod dachem”. Solver przeliczył dzień.', 'Model: “indoors only”. The solver recalculated the day.')}</div></div>
    ${rainPlan()}
    <div class="dashed-box" style="margin-top:2px"><div class="lbl" style="font-size:14px">${L('Przeniesione na niedzielę', 'Moved to Sunday')}</div><div class="cap">${L('Park Oliwski, Molo w Sopocie', 'Oliwa Park, Sopot Pier')}</div></div>`) }),
  expenses: (bare) => phone({ bare, app: true, body: mTrip(4, `<div class="between" style="margin-bottom:10px">${expSeg(0)}<span class="btn primary sm" style="padding:0 12px">${ic('Plus', 'sm')}${L('Dodaj', 'Add')}</span></div>${expenses()}`) }),
  settle: (bare) => phone({ bare, app: true, body: mTrip(4, `<div style="margin-bottom:10px">${expSeg(1)}</div><div class="lbl" style="margin-bottom:10px">${L('Razem wydano:', 'Spent in total:')} ${zl(586, 2)}</div>${transfers()}${balances()}`) }),
  members: (bare) => phone({ bare, app: true, body: mTrip(2, members()) }),
});
for (const k of Object.keys(mob)) S['mob-' + k] = M(mob[k]);

/* ================= DESKTOP ================= */
const oldTripsFn = desk.trips[1];
Object.assign(desk, {
  trips: [desk.trips[0], () => oldTripsFn().replace(`<div class="row"><span class="composer"`, `<div class="row"><span class="btn outline sm">${ic('Mic', 'sm')}${L('Utwórz głosowo', 'Create by voice')}</span><span class="composer"`)],
  interview: ['tuttitrip.gburek.app/trips/gdansk?tab=interview', () => `${dhead()}<div class="dmain narrow">${tripTop(0)}
    <div class="grid2" style="margin-top:22px;grid-template-columns:minmax(0,1fr) 380px"><div class="col" style="gap:12px">
      <div class="bubble me" style="max-width:76%">${L('Gdańsk, trzy dni w październiku. Ja, Tomek, nasz Kuba (13), moja siostra Zosia i babcia Hela. Babcia nie da rady dużo chodzić.', 'Gdańsk, three days in October. Me, Tomek, our Kuba (13), my sister Zosia and Grandma Hela. Grandma can’t walk much.')}</div>
      ${aiMsg(L('Zapisałem cel, daty i pięć osób. Babcia: najwyżej 3 km dziennie. Teraz Kuba: co jest dla niego najważniejsze?', 'Saved the destination, dates and five people. Grandma: 3 km a day at most. Now Kuba: what matters most to him?'))}
      ${reasoning()}${voiceRow()}
      <div style="max-width:600px">${dotPool()}</div>
      <div class="composer">${L('Dopisz, jeśli chcesz…', 'Add something if you like…')}<span class="mic">${ic('Send')}</span></div></div>
      ${knowPanel({ compact: true })}</div></div>`],
  plan: ['tuttitrip.gburek.app/trips/gdansk?tab=plan', () => `${dhead()}<div class="dmain narrow">${tripTop(3)}
    <div class="grid2" style="margin-top:20px"><div>
      <div class="between"><div><div class="lbl">${L('Wersja 3', 'Version 3')}</div><div class="cap">${L('Skrót planu 9defef8adc3f. Te same dane dają ten sam plan.', 'Plan hash 9defef8adc3f. The same input gives the same plan.')}</div></div><span class="row"><span class="btn outline sm">${ic('Printer', 'sm')}PDF</span><span class="btn outline sm">${ic('RefreshCw', 'sm')}${L('Przelicz plan', 'Recalculate')}</span></span></div>
      <div style="margin:16px 0 18px;max-width:560px">${dayTabs(1, true)}</div>${dayPlan()}</div>
      <div class="col" style="gap:16px">${fairPanel({ big: 52, opts: { compact: true } })}
      <div class="panel" style="padding:20px 22px">${budgetBar()}</div></div></div></div>`],
  expenses: ['tuttitrip.gburek.app/trips/gdansk?tab=expenses', () => `${dhead()}<div class="dmain narrow">${tripTop(4)}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px;align-items:start">
      <div class="panel" style="padding:20px 22px"><div class="between">${expSeg(0)}<span class="btn primary sm">${ic('Plus', 'sm')}${L('Dodaj wydatek', 'Add expense')}</span></div><div style="margin-top:14px">${expenses()}</div></div>
      <div class="panel" style="padding:20px 22px">${transfers()}${balances()}<div class="cap" style="margin-top:10px">${L('Kwoty w euro przeliczamy po kursie NBP z dnia wydatku.', 'Amounts in euro are converted at the NBP rate of the day.')}</div></div></div></div>`],
  members: ['tuttitrip.gburek.app/trips/gdansk?tab=members', () => `${dhead()}<div class="dmain narrow">${tripTop(2)}
    <div class="grid2" style="margin-top:20px"><div>${members()}</div>
    <div class="panel" style="padding:22px;text-align:center"><div class="lbl" style="text-align:left">${L('Zaproś do wyjazdu', 'Invite to the trip')}</div><div class="cap" style="text-align:left;margin-bottom:14px">${L('Link działa 7 dni, do 10 osób.', 'The link works for 7 days, up to 10 people.')}</div><div class="qr">${QR.app}</div><div class="row" style="justify-content:center;gap:8px;margin-top:14px"><span class="btn outline sm">${ic('Copy', 'sm')}${L('Kopiuj link', 'Copy link')}</span><span class="btn primary sm">${ic('Share', 'sm')}${L('Udostępnij', 'Share')}</span></div></div></div></div>`],
});
for (const k of Object.keys(desk)) S['desk-' + k] = D(desk[k][0], desk[k][1]);

/* ================= NEW SLIDES ================= */
S['mk-13-ai'] = MK(() => {
  const st = (k) => ({ live: `<span class="st live">${ic('Check', 'xs')}${L('Działa', 'Live')}</span>`, build: `<span class="st build">${ic('Zap', 'xs')}${L('W budowie', 'In progress')}</span>`, plan: `<span class="st plan">${L('W planach', 'Planned')}</span>` }[k]);
  const cards = [
    ['MessagesSquare', L('Wywiad głosem i tekstem', 'Interview by voice and text'), L('Asystent rozmawia z hostem i członkami wyprawy. Pyta kartami, które model składa w locie przez AG-UI: suwak budżetu, kropki ważności, karty tak/nie. Głosem rozmawia na żywo, z napisami.', 'The assistant talks to the host and the trip members. It asks with cards the model assembles on the fly over AG-UI: a budget slider, importance dots, yes/no cards. By voice it talks live, with captions.'), 'live', ['Qwen3 · GB10', 'OpenAI Realtime', 'AG-UI']],
    ['BrainCircuit', L('Profil osoby z jednego zdania', 'A person’s profile from one sentence'), L('Model decyzyjny wybiera wartość z zamkniętej listy (dieta, ograniczenia ruchowe) i mówi, jak jest pewny. Poniżej progu host potwierdza ją na karcie.', 'A decision model picks a value from a closed list (diet, mobility limits) and says how sure it is. Below the threshold the host confirms it on a card.'), 'live', ['basal', 'Laya', 'JEV']],
    ['CloudRain', L('Nagłe zdarzenia w podróży', 'Sudden events on the trip'), L('„Silny deszcz od 11:00”, „demonstracja w centrum”: model zamienia komunikat na warunki dla solvera (tylko pod dachem, omiń obszar), a kod przelicza resztę dnia.', '“Heavy rain from 11:00”, “a protest in the centre”: the model turns the message into conditions for the solver (indoors only, avoid the area) and code recalculates the rest of the day.'), 'build', ['Qwen3 · GB10']],
    ['Sparkles', L('Dlaczego plan wygląda tak', 'Why the plan looks the way it does'), L('Model pisze z liczb algorytmu, co ucieszy daną osobę, a co ją zniechęci tego dnia bardziej niż innych. Zanim pokażemy tekst, kod sprawdza, czy zgadza się z liczbami.', 'The model writes, from the algorithm’s numbers, what will please a person and what will put them off more than the others that day. Before we show the text, code checks it matches the numbers.'), 'live', ['Qwen3 · GB10', L('walidator', 'validator')]],
    ['Plug', L('TuttiTrip w ChatGPT i Claude.ai', 'TuttiTrip in ChatGPT and Claude.ai'), L('Serwer MCP już udostępnia dane wyjazdu asystentom AI. Dalej: planowanie, głosy i decyzje bezpośrednio w czacie.', 'The MCP server already gives AI assistants the trip data. Next: planning, votes and decisions right in the chat.'), 'plan', ['MCP', 'FastMCP']],
    ['CalendarPlus', L('Mapy i kalendarz', 'Maps and calendar'), L('Podsumowanie opinii z Google Maps przy każdym miejscu i wpisy w Google Calendar każdego uczestnika, po jego zgodzie.', 'A summary of Google Maps reviews for every place, and entries in each participant’s Google Calendar, with their consent.'), 'plan', ['Google Maps', 'Google Calendar']],
  ];
  return `<div style="position:absolute;left:80px;top:64px;right:80px" class="between"><div><h2>${L('Gdzie pracuje AI', 'Where AI does the work')}</h2><p class="lead" style="margin-top:12px;max-width:900px">${L('Model rozmawia, rozpoznaje i tłumaczy. Liczby w planie liczy kod.', 'The model talks, recognises and explains. Code computes the numbers in the plan.')}</p></div>
  <div class="row" style="gap:8px;align-self:flex-end">${st('live')}${st('build')}${st('plan')}</div></div>
  <div style="position:absolute;left:80px;right:80px;top:224px;display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:216px;gap:16px">${cards.map(([i, h, p, s, m], k) => `<div class="panel aicard"><div class="between"><span class="row" style="gap:10px"><span class="aino">${k + 1}</span>${ic(i, 'lg')}</span>${st(s)}</div><h3 class="h4">${h}</h3><p>${p}</p><div class="mdl">${m.map((x) => `<span class="mchip">${x}</span>`).join('')}</div></div>`).join('')}</div>
  <div class="panel" style="position:absolute;left:80px;right:80px;top:688px;padding:16px 22px;background:var(--foreground);color:var(--background);border:0;display:grid;grid-template-columns:330px 1fr;gap:24px;align-items:center">
   <div><div style="font:800 22px/26px var(--font-display);letter-spacing:-.02em">Pydantic AI</div><div style="font-size:13.5px;line-height:19px;margin-top:4px">${L('Wszystkie agenty stoją na jednym z dojrzalszych frameworków AI w Pythonie, od twórców Pydantic.', 'Every agent runs on one of the more mature AI frameworks in Python, from the makers of Pydantic.')}</div></div>
   <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;font-size:13.5px;line-height:19px">${[[L('Typowane wyniki', 'Typed outputs'), L('model zwraca obiekt, nie tekst do parsowania', 'the model returns an object, not text to parse')], [L('Testy bez modelu', 'Tests without a model'), L('TestModel zamiast prawdziwych wywołań', 'TestModel instead of real calls')], [L('Trwałe wykonanie', 'Durable execution'), L('z DBOS restart nie powtarza udanych kroków', 'with DBOS a restart repeats no finished step')], [L('Jeden katalog modeli', 'One model catalogue'), L('GB10, a gdy padnie, OpenRouter', 'GB10, with OpenRouter as a fallback')]].map(([a, b]) => `<div><b style="display:block;font-family:var(--font-display)">${a}</b><span style="opacity:.9">${b}</span></div>`).join('')}</div></div>
  <div class="cap" style="position:absolute;left:80px;bottom:44px">${L('Też: odczyt paragonów i wpisów wydatków, wklejone plany i oferty noclegów z dosłownym cytatem, benchmark modeli z sędzią LLM.', 'Also: reading receipts and typed expenses, pasted plans and stay offers with a verbatim quote, a model benchmark with an LLM judge.')}</div>`;
});

S['mk-14-stack'] = MK(() => {
  const N = {
    a1: [96, 262, 206, 96, 'Smartphone', L('Host i członkowie', 'Host and members'), L('telefon albo laptop, PWA', 'phone or laptop, PWA'), ''],
    a2: [96, 398, 206, 80, 'QrCode', L('Osoba z linkiem', 'Person with a link'), L('głosuje bez konta', 'votes without an account'), ''],
    a3: [96, 518, 206, 80, 'Bot', 'ChatGPT · Claude.ai', L('przez serwer MCP', 'through the MCP server'), 'ext'],
    b1: [356, 262, 236, 112, 'Monitor', 'Frontend PWA', 'React 19 · TanStack · shadcn/ui · Tailwind v4 · Paraglide PL/EN', ''],
    b2: [356, 430, 236, 80, 'Cloud', 'Cloudflare Workers', L('statyczne pliki i proxy /api', 'static files and the /api proxy'), ''],
    c1: [646, 262, 412, 78, 'Server', 'FastAPI · Python 3.14', 'REST · AG-UI · ' + L('głos', 'voice') + ' · MCP · SSE · Auth0', ''],
    c2: [646, 370, 200, 124, 'Cpu', L('Kod liczy', 'Code computes'), L('solver Nasha, sprawdzenie planu, ceny, rozliczenie; bez frameworka i AI', 'Nash solver, plan check, pricing, settlement; no framework, no AI'), 'ink'],
    c3: [858, 370, 200, 124, 'Sparkles', L('Agenci Pydantic AI', 'Pydantic AI agents'), L('wywiad, modele decyzyjne, rozmowa głosowa', 'interview, decision models, voice'), 'ai'],
    c4: [646, 524, 412, 78, 'Database', 'PostgreSQL 18', 'pgvector · ' + L('kolejki DBOS · katalog miejsc ze źródłami', 'DBOS queues · place catalogue with sources'), ''],
    d1: [1100, 262, 420, 100, 'Layers', L('Worker w tle', 'Background worker'), L('trwałe workflowy DBOS i agenci Pydantic AI: uzasadnienia, paragony, wklejone plany, miejsca z OSM, embeddingi', 'durable DBOS workflows and Pydantic AI agents: explanations, receipts, pasted plans, OSM places, embeddings'), 'ai'],
    d2: [1100, 392, 204, 210, 'Cpu', L('Własne GPU (GB10)', 'Own GPU (GB10)'), 'Qwen3.8-27B<br>basal · Laya<br>' + L('embeddingi', 'embeddings') + ' (Ollama)<br><br>' + L('dane wyjazdu zostają u nas', 'trip data stays with us'), 'ai'],
    d3: [1316, 392, 204, 210, 'Cloud', L('Chmura', 'Cloud'), 'OpenRouter: JEV ' + L('i zapas', 'and fallback') + '<br>OpenAI Realtime: ' + L('głos', 'voice') + '<br>Google Maps<br>OpenStreetMap · NBP', 'ext'],
  };
  const box = (k) => { const [x, y, w, h, i, t, s, c] = N[k]; return `<div class="node ${c}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><div class="nt">${ic(i, 'sm')}${t}</div><div class="ns">${s}</div></div>`; };
  const pt = (k, side) => { const [x, y, w, h] = N[k]; return { r: [x + w, y + h / 2], l: [x, y + h / 2], b: [x + w / 2, y + h], t: [x + w / 2, y] }[side]; };
  const link = (a, as, b, bs) => { const [x1, y1] = pt(a, as), [x2, y2] = pt(b, bs); const hz = as === 'r' || as === 'l'; const d = hz ? Math.max(30, Math.abs(x2 - x1) / 2) : Math.max(16, Math.abs(y2 - y1) / 2);
    const c = hz ? `C${x1 + d},${y1} ${x2 - d},${y2} ${x2},${y2}` : `C${x1},${y1 + d} ${x2},${y2 - d} ${x2},${y2}`;
    return `<path d="M${x1},${y1} ${c}" fill="none" stroke="var(--route)" stroke-width="3" stroke-linecap="round" stroke-dasharray="0 8"/><circle cx="${x1}" cy="${y1}" r="4" fill="var(--foreground)"/><circle cx="${x2}" cy="${y2}" r="5" fill="var(--card)" stroke="var(--primary)" stroke-width="2.5"/>`; };
  const links = [['a1', 'r', 'b1', 'l'], ['a2', 'r', 'b1', 'l'], ['b1', 'b', 'b2', 't'], ['b2', 'r', 'c1', 'l'], ['a3', 'r', 'c4', 'l'], ['c1', 'b', 'c2', 't'], ['c1', 'b', 'c3', 't'], ['c2', 'b', 'c4', 't'], ['c3', 'b', 'c4', 't'], ['c1', 'r', 'd1', 'l'], ['c4', 'r', 'd2', 'l'], ['d1', 'b', 'd2', 't'], ['d1', 'b', 'd3', 't']];
  const lanes = [[80, 238, L('Ludzie', 'People')], [340, 268, L('Aplikacja', 'App')], [630, 444, 'Backend'], [1084, 452, L('W tle i modele', 'Background and models')]];
  return `<div style="position:absolute;left:80px;top:64px;right:80px"><h2>${L('Tech stack i architektura', 'Tech stack and architecture')}</h2><p class="lead" style="margin-top:12px;max-width:1140px">${L('Trzy repozytoria i kontrakt zadań sprawdzany w CI. Logika planu nie zależy od frameworka, bazy ani modeli.', 'Three repositories and a job contract checked in CI. Plan logic depends on no framework, database or model.')}</p></div>
  ${lanes.map(([x, w, t]) => `<div class="lane" style="left:${x}px;width:${w}px;top:214px;bottom:276px"><span>${t}</span></div>`).join('')}
  <svg style="position:absolute;left:0;top:214px;width:1600px;height:410px;overflow:visible" viewBox="0 214 1600 410">${links.map((l) => link(...l)).join('')}</svg>
  ${Object.keys(N).map(box).join('')}
  <div class="stackrow" style="top:668px;bottom:auto">${[['Frontend', 'React 19, TypeScript 6, Vite 8, TanStack Router i Query, shadcn/ui, Tailwind v4, Paraglide, PWA'], ['Backend', 'Python 3.14, FastAPI, Pydantic, SQLAlchemy 2, Alembic, FastMCP, Auth0'], ['AI', 'Pydantic AI, DBOS, AG-UI, Qwen3, basal, Laya, JEV, OpenAI Realtime, Ollama'], [L('Infrastruktura', 'Infrastructure'), L('Docker, GitHub Actions, Cloudflare Workers i Tunnel, PostgreSQL 18 z pgvector, własny serwer GB10', 'Docker, GitHub Actions, Cloudflare Workers and Tunnel, PostgreSQL 18 with pgvector, own GB10 server')]].map(([a, b]) => `<div><b>${a}</b>${b}</div>`).join('')}</div>
  <div class="row cap" style="position:absolute;left:80px;bottom:44px;gap:16px"><span class="row" style="gap:6px"><span style="width:12px;height:12px;border-radius:4px;background:var(--foreground)"></span>${L('kod, który liczy plan', 'code that computes the plan')}</span><span class="row" style="gap:6px"><span style="width:12px;height:12px;border-radius:4px;border:1.5px solid var(--primary)"></span>AI</span><span class="row" style="gap:6px"><span style="width:12px;height:12px;border-radius:4px;border:1.5px dashed var(--muted-foreground)"></span>${L('usługa zewnętrzna', 'external service')}</span></div>`;
});
S['x-arch'] = S['mk-14-stack'];
