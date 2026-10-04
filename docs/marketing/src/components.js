/* Shared data + components for the TuttiTrip marketing mockups. Plain JS, returns HTML strings. */
const Q = new URLSearchParams(location.search);
const LANG = Q.get('lang') === 'en' ? 'en' : 'pl';
const THEME = Q.get('theme') === 'dark' ? 'dark' : 'light';
const L = (pl, en) => (LANG === 'en' ? en : pl);
const num = (n, d = 2) => (LANG === 'en' ? n.toFixed(d) : n.toFixed(d).replace('.', ','));
const grp = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, LANG === 'en' ? ',' : ' ');
const zl = (n, d = 0) => {
  const [i, f] = n.toFixed(d).split('.');
  const v = grp(i) + (f ? (LANG === 'en' ? '.' : ',') + f : '');
  return LANG === 'en' ? `PLN ${v}` : `${v} zł`;
};
const ic = (n, cls = '') => `<span class="ic ${cls}">${(window.ICONS && ICONS[n]) || ''}</span>`;
const SCALE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7zM19 7l-3 7a3 3 0 0 0 6 0l-3-7z"/></svg>`;
const icScale = (cls = '') => `<span class="ic ${cls}">${SCALE}</span>`;

const P = [
  { n: 'Ania', c: 1, role: L('mama, host', 'mum, host'), tt: 82, bot: 91 },
  { n: 'Tomek', c: 2, role: L('tata', 'dad'), tt: 74, bot: 88 },
  { n: 'Kuba', c: 3, role: L('13 lat', 'age 13'), tt: 58, bot: 31 },
  { n: 'Zosia', c: 4, role: L('ciocia', 'aunt'), tt: 71, bot: 64 },
  { n: 'Hela', c: 5, role: L('babcia, bez konta', 'grandma, no account'), tt: 77, bot: 22 },
];
const av = (p, cls = '') => `<span class="av m${p.c} ${cls}">${p.n[0]}</span>`;
const avs = (cls = 'sm ring') => `<span class="avs">${P.map((p) => av(p, cls)).join('')}</span>`;
const LOGO = () => `logos/tuttitrip-logo-horizontal-${THEME}.svg`;
const MARK = () => `logos/tuttitrip-mark-${THEME}.svg`;

const verdict = (k) => ({
  must: `<span class="verdict v-must">${ic('StarDuo')}${L('Obowiązkowo', 'Must do')}</span>`,
  fits: `<span class="verdict v-fits">${ic('Check')}${L('Pasuje', 'Good fit')}</span>`,
  iconic: `<span class="verdict v-iconic">${ic('Star')}${L('Kultowe, ale nie Twoje', 'Iconic, but not for you')}</span>`,
  skip: `<span class="verdict v-skip">${ic('Minus')}${L('Pomiń', 'Skip')}</span>`,
}[k]);
const verified = () => `<span class="badge b-neutral">${ic('ShieldCheck')}${L('Zweryfikowane', 'Verified')}</span>`;
const unverified = () => `<span class="badge b-dashed">${ic('ShieldQuestion')}${L('Cena niezweryfikowana', 'Price not verified')}</span>`;

/* ---------- frames ---------- */
function statusBar() {
  return `<div class="status"><span>9:41</span><span class="isl"></span><span class="sig"><span class="bars"><i style="height:5px"></i><i style="height:7px"></i><i style="height:9px"></i><i style="height:12px"></i></span><span class="bat"></span></span></div>`;
}
function dock(on) {
  const items = [['Route', L('Podróże', 'Trips')], ['Calendar', 'Plan'], ['Users', L('Grupa', 'Group')], ['Wallet', L('Wydatki', 'Expenses')], ['Sparkles', L('Asystent', 'Assistant')]];
  return `<nav class="dock">${items.map(([i, t], k) => `<div class="${k === on ? 'on' : ''}">${ic(i)}<span>${t}</span></div>`).join('')}</nav>`;
}
function phone({ title = '', back = true, right = 'Share', body = '', dockOn = null, bare = false, bar = true, scale = 1, extra = '' }) {
  const head = bar ? `<div class="pbar"><span class="icbtn">${back ? ic('ChevronLeft') : ''}</span><h1>${title}</h1><span class="icbtn">${right ? ic(right) : ''}</span></div>` : '';
  return `<div class="phone ${bare ? 'bare' : ''}" style="${scale !== 1 ? `transform:scale(${scale});transform-origin:top left;` : ''}"><div class="scr">${statusBar()}${head}<div class="pbody">${body}</div>${extra}${dockOn !== null ? dock(dockOn) : ''}<span class="homebar"></span></div></div>`;
}
function browser({ w = 1440, h = 900, url = 'tuttitrip.gburek.app', body = '', bare = false }) {
  return `<div class="browser ${bare ? 'bare' : ''}" style="width:${w}px;height:${h}px">${bare ? '' : `<div class="chrome"><span class="dots"><i></i><i></i><i></i></span><span class="url">${ic('Lock', 'xs')}${url}</span><span style="width:47px"></span></div>`}<div class="page">${body}</div></div>`;
}
function laptop(inner, w, h) {
  return `<div class="laptop"><div class="lid">${browser({ w, h, ...inner })}</div><div class="base" style="width:${w + 120}px"></div></div>`;
}
function dhead(active = L('Wyjazdy', 'Trips')) {
  return `<header class="dhead"><img src="${LOGO()}" style="height:34px"><span class="nav">${active}</span><span class="sp"></span>
  <span class="row muted lbl">${ic('Globe')}${LANG.toUpperCase()}</span><span class="icbtn">${ic(THEME === 'dark' ? 'Moon' : 'Sun')}</span>
  <span class="btn primary sm">${ic('Plus')}${L('Nowy wyjazd', 'New trip')}</span><span class="who">${av(P[0], 'md')}Ania Nowak</span></header>`;
}
function tripTop(tab) {
  const tabs = [['MessageSquare', L('Wywiad', 'Interview')], ['Users', L('Osoby', 'People')], ['Calendar', 'Plan'], ['Wallet', L('Wydatki', 'Expenses')]];
  return `<span class="back">${ic('ChevronLeft', 'sm')}${L('Wyjazdy', 'Trips')}</span>
  <div class="between"><h1 class="ttl">${L('Gdańsk z rodziną', 'Gdańsk with the family')}</h1><span class="row">${avs('md ring')}<span class="btn outline sm" style="margin-left:12px">${ic('Settings', 'sm')}${L('Ustawienia', 'Settings')}</span></span></div>
  <div class="meta"><span>${ic('MapPin', 'sm')}Gdańsk</span><span>${ic('Calendar', 'sm')}${L('pt 9 paź – nd 11 paź', 'Fri 9 Oct – Sun 11 Oct')}</span><span>${ic('Wallet', 'sm')}${L('1 300 zł do 1 700 zł, margines 10%', 'PLN 1,300 to 1,700, 10% margin')}</span><span class="badge b-neutral">Host</span></div>
  <div style="margin-top:20px" class="tabs">${tabs.map(([i, t], k) => `<div class="${k === tab ? 'on' : ''}">${ic(i, 'sm')}${t}</div>`).join('')}</div>`;
}

/* ---------- fairness ---------- */
function fairness({ key = 'tt', floor = 40, ghost = null, override = null, axis = true, compact = false } = {}) {
  const rows = P.map((p) => {
    const v = override && override[p.n] !== undefined ? override[p.n] : p[key];
    const g = ghost && ghost[p.n] !== undefined ? `<span class="ghost" style="left:${ghost[p.n]}%"></span>` : '';
    return `<span class="nm">${av(p, compact ? 'sm' : '')}${p.n}</span><span class="tr"><span class="fl" style="width:${floor}%"></span>${g}<span class="pt m${p.c}" style="left:${v}%"></span></span><span class="sc ${v < floor ? 'low' : ''}">${v}</span>`;
  }).join('');
  return `<div class="fm">${rows}${axis ? `<span></span><span class="axis"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></span><span></span>` : ''}</div>`;
}
function fairPanel({ title = L('Sprawiedliwość planu', 'Plan fairness'), score = 0.87, low = 'Kuba, 58', opts = {}, footer = '', big = 64 } = {}) {
  return `<div class="panel"><h3>${icScale('lg')}${title}</h3>
  <div class="row" style="gap:16px;margin:18px 0 16px;align-items:flex-end"><span class="bigfig" style="font-size:${big}px">${num(score)}</span><span class="muted" style="font-size:17px;padding-bottom:6px">${L('Najmniej zadowolony:', 'Least happy:')} ${low}.</span></div>
  ${fairness(opts)}${footer}</div>`;
}

/* ---------- plan timeline ---------- */
const PL = {
  breakfast: [L('Śniadanie w Oliwie', 'Breakfast in Oliwa'), 'Soup'],
  park: [L('Park Oliwski', 'Oliwa Park'), 'TreeDeciduous'],
  rest: [L('Przerwa: babcia odpoczywa', 'Break: Grandma rests'), 'Coffee'],
  amber: [L('Muzeum Bursztynu', 'Amber Museum'), 'Landmark'],
  pier: [L('Molo w Sopocie', 'Sopot Pier'), 'Ship'],
  hevel: [L('Centrum Hevelianum', 'Hevelianum Science Centre'), 'Landmark'],
  dinner: [L('Kolacja w Śródmieściu', 'Dinner in the Old Town'), 'Soup'],
};
function item(t, k, sub, extra = '', dot = '', chg = false) {
  return `<div class="it"><span class="tm">${t}</span><span class="dt"><i class="${dot}"></i></span><div class="${chg ? 'chg' : ''}"><div class="nm">${ic(PL[k][1], 'sm')}${PL[k][0]}</div><div class="sub">${sub}</div>${extra}</div></div>`;
}
const voteRow = () => `<div class="votes">${[['ThumbsUp', 0], ['ThumbsUp', 1], ['Minus', 2], ['ThumbsUp', 3], ['ThumbsUp', 4]].map(([i, k]) => `<span>${av(P[k], 'sm')}${ic(i)}</span>`).join('')}</div>`;
function dayPlan({ why = true, tall = false } = {}) {
  return `<div class="tl">
  ${item('09:30', 'breakfast', L('Otwarte od 8:00 · ', 'Open from 8:00 · ') + zl(160), `<div class="chips">${verified()}</div>`, 'done')}
  ${item('11:00', 'park', L('800 m od śniadania · ', '800 m from breakfast · ') + zl(0), `<div class="chips">${verdict('fits')}</div>`, 'done')}
  ${item('13:30', 'rest', L('W apartamencie, 1 h 30 min', 'At the apartment, 1 h 30 min'))}
  ${item('15:00', 'amber', L('Otwarte 10:00–18:00 · ', 'Open 10:00–18:00 · ') + zl(180), `<div class="chips">${verdict('must')}</div>${why ? `<div class="why">${L('Ania dała „Obowiązkowo”, a Kuba ma obojętnie, więc idziecie po przerwie babci.', 'Ania marked it “Must do” and Kuba doesn’t mind, so you go after Grandma’s break.')}${voteRow()}</div>` : ''}`, 'goal')}
  ${item('17:30', 'pier', L('Zawsze otwarte · ', 'Always open · ') + zl(11) + (tall ? '' : ''), `<div class="chips">${verdict('iconic')}</div>`, 'wait')}
  </div>`;
}
function rainPlan() {
  const changed = (t) => `<span class="badge b-want" style="margin-left:4px">${ic('RefreshCw')}${t}</span>`;
  return `<div class="tl">
  ${item('09:30', 'breakfast', L('Otwarte od 8:00', 'Open from 8:00'), '', 'done')}
  ${item('11:00', 'amber', L('Pod dachem', 'Indoors'), `<div class="chips">${changed(L('zmienione', 'changed'))}</div>`, '', true)}
  ${item('13:30', 'rest', L('W apartamencie', 'At the apartment'))}
  ${item('15:00', 'hevel', L('Pod dachem · ', 'Indoors · ') + zl(96), `<div class="chips">${changed(L('zmienione', 'changed'))}</div>`, 'goal', true)}
  ${item('17:30', 'dinner', L('Rezerwacja na 5 osób', 'Table for 5 booked'), `<div class="chips">${changed(L('zmienione', 'changed'))}</div>`, 'wait', true)}
  </div>`;
}
function dayTabs(on = 1, ink = false) {
  const d = [L('Pt, dzień 1', 'Fri, day 1'), L('Sob, dzień 2', 'Sat, day 2'), L('Nd, dzień 3', 'Sun, day 3')];
  return `<div class="seg ${ink ? 'ink' : ''}">${d.map((t, k) => `<div class="${k === on ? 'on' : ''}">${t}</div>`).join('')}</div>`;
}
function summaryStrip() {
  return `<div class="sheet" style="display:grid;grid-template-columns:1.1fr 1fr 1.2fr;padding:12px 14px;gap:8px">
  <div><div class="cap">${L('Sprawiedliwość', 'Fairness')}</div><div class="fig" style="font-weight:800;font-size:22px">${num(0.87)}</div></div>
  <div><div class="cap">${L('Najmniej', 'Lowest')}</div><div class="lbl">Kuba 58</div></div>
  <div><div class="cap">${L('Dzień 2', 'Day 2')}</div><div class="lbl">${zl(620)} ${L('z', 'of')} ${LANG === 'en' ? '700' : '700 zł'}</div></div></div>`;
}
function budgetBar(spent = 620, limit = 700, max = 770) {
  return `<div style="margin-top:6px"><div class="between"><span class="muted">${L('Koszt dnia', 'Day cost')}</span><span class="fig" style="font-weight:800;font-size:22px">${zl(spent)} <span class="muted" style="font-size:15px;font-weight:600">${L('z', 'of')} ${zl(limit)}</span></span></div>
  <div style="position:relative;height:10px;border-radius:999px;background:var(--muted);margin-top:10px"><i style="position:absolute;left:0;top:0;bottom:0;width:${(spent / max) * 100}%;background:var(--primary);border-radius:999px"></i><i style="position:absolute;left:${(limit / max) * 100}%;top:-4px;bottom:-4px;border-left:2px solid var(--foreground)"></i><i style="position:absolute;left:${(limit / max) * 100}%;right:0;top:0;bottom:0;background:repeating-linear-gradient(-45deg,var(--warning-soft) 0 3px,transparent 3px 7px);border-radius:0 999px 999px 0"></i></div>
  <div class="between cap" style="margin-top:6px"><span>0</span><span>${L('limit', 'limit')} ${zl(limit)}</span><span>${L('margines', 'margin')} ${zl(max)}</span></div></div>`;
}

/* ---------- plan check (linter) ---------- */
function chatbotPlan({ checked = true } = {}) {
  const rows = [
    ['09:00', L('Muzeum Bursztynu', 'Amber Museum'), `5 × 36 zł = 180 zł`, 'Landmark', L('W poniedziałek zamknięte', 'Closed on Mondays'), L('godziny otwarcia', 'opening hours')],
    ['11:30', L('Spacer na Westerplatte', 'Walk to Westerplatte'), L('9 km pieszo · 0 zł', '9 km on foot · PLN 0'), 'Route', L('9 km pieszo, a babcia może 3 km dziennie', '9 km on foot, Grandma can walk 3 km a day'), L('dystans', 'distance')],
    ['14:00', L('Obiad w Sopocie', 'Lunch in Sopot'), L('5 osób · 420 zł', '5 people · PLN 420'), 'Soup', null],
    ['16:30', L('Rejs statkiem', 'Boat trip'), L('5 × 64 zł = 320 zł', '5 × PLN 64 = PLN 320'), 'Ship', null],
    ['19:00', L('Kolacja w centrum', 'Dinner in town'), L('5 osób · 320 zł', '5 people · PLN 320'), 'Soup', L('Budżet dnia przekroczony o 240 zł', 'Day budget over by PLN 240'), L('budżet', 'budget')],
  ];
  return `<ul class="lst">${rows.map(([t, n, s, i, err]) => `<li style="display:grid;grid-template-columns:54px 1fr;gap:10px"><span class="fig" style="font-weight:650">${t}</span><div><div class="row lbl">${ic(i, 'sm')}${n}</div><div class="cap">${s}</div>${checked && err ? `<div class="row" style="margin-top:6px;color:var(--danger-ink);font:600 13.5px/18px var(--font-sans)">${ic('TriangleAlert', 'sm')}${err}</div>` : ''}</div></li>`).join('')}</ul>`;
}
function checkSummary(n = 3) {
  const items = [[L('Godziny otwarcia', 'Opening hours'), n ? 1 : 0], [L('Dystanse i tempo', 'Distances and pace'), n ? 1 : 0], [L('Budżet', 'Budget'), n ? 1 : 0], [L('Przerwy', 'Breaks'), 0], [L('Wymagania noclegu', 'Accommodation requirements'), 0]];
  return `<ul class="lst">${items.map(([t, k]) => `<li class="between"><span class="row">${k ? `<span style="color:var(--danger-ink)">${ic('TriangleAlert', 'sm')}</span>` : `<span style="color:var(--want-ink)">${ic('Check', 'sm')}</span>`}${t}</span><span class="badge ${k ? 'b-danger' : 'b-want'}">${k ? L('1 problem', '1 issue') : L('w porządku', 'OK')}</span></li>`).join('')}</ul>`;
}

/* ---------- approval ---------- */
function approval() {
  return `<div class="ticket"><div class="row lbl">${ic('TriangleAlert')}${L('Czeka na Twoją decyzję', 'Waiting for your decision')}</div>
  <div class="cap" style="color:var(--warning-ink);margin-top:4px">${L('Ta zmiana kosztuje innych. Zobacz ile, zanim ją wymusisz.', 'This change costs the others. See how much before you force it.')}</div>
  <div class="cost"><div><span class="cap">${L('Sprawiedliwość', 'Fairness')}</span><b>${num(0.87)} → ${num(0.71)}</b></div><div><span class="cap">Kuba</span><b>58 → 34</b></div><div><span class="cap">${L('Budżet', 'Budget')}</span><b>+${zl(80)}</b></div></div>
  <div class="perf"></div>
  <div class="col" style="gap:8px"><span class="btn ink block">${L('Wymuś mimo to', 'Force it anyway')} <small>${L('−24 pkt Kuby', '−24 pts for Kuba')}</small></span><span class="btn outline block">${L('Zostaw plan', 'Keep the plan')}</span></div></div>`;
}
function proposal() {
  return `<div class="sheet" style="padding:14px"><div class="row" style="gap:10px">${av(P[4], 'md')}<div><div class="lbl">${L('Hela chce przenieść Westerplatte na sobotę', 'Hela wants to move Westerplatte to Saturday')}</div><div class="cap">${L('Z niedzieli 10:00 na sobotę 11:00 · +80 zł', 'From Sunday 10:00 to Saturday 11:00 · +PLN 80')}</div></div></div>
  <div class="row" style="flex-wrap:wrap;gap:6px;margin-top:12px"><span class="badge b-want">${ic('ThumbsUp')}Ania: ${L('Chcę', 'Want')}</span><span class="badge b-neutral">${ic('Minus')}Tomek: ${L('Obojętnie', 'Don’t mind')}</span><span class="badge b-decline">${ic('ThumbsDown')}Kuba: ${L('Nie chcę, za daleko', 'Don’t want, too far')}</span><span class="badge b-want">${ic('ThumbsUp')}Zosia: ${L('Chcę', 'Want')}</span></div></div>`;
}

/* ---------- settlement ---------- */
function expenses() {
  const e = [['Soup', L('Obiad w Oliwie', 'Lunch in Oliwa'), 'Ania', 142], ['Landmark', L('Bilety do muzeum', 'Museum tickets'), 'Tomek', 180], ['Ship', L('Rejs tramwajem wodnym', 'Water tram trip'), 'Zosia', 200], ['Coffee', L('Lody i kawa', 'Ice cream and coffee'), 'Hela', 64]];
  return `<ul class="lst">${e.map(([i, n, w, a]) => `<li class="between"><div><div class="row lbl">${ic(i, 'sm')}${n}</div><div class="cap">${L('Płacił(a):', 'Paid by:')} ${w}</div></div><span class="amount">${zl(a, 2)}</span></li>`).join('')}
  <li><div class="dashed-box between"><div><div class="row lbl">${ic('Receipt', 'sm')}${L('Kawiarnia po muzeum', 'Café after the museum')}</div><div class="cap">${L('Niepewny odczyt paragonu', 'Uncertain receipt reading')}</div></div><span class="amount">${zl(86.5, 2)}?</span></div><span class="btn outline sm block" style="margin-top:8px">${L('Potwierdź', 'Confirm')} ${zl(86.5, 2)}</span></li></ul>`;
}
function transfers() {
  const t = [[4, 3, 53.5], [4, 1, 29], [0, 1, 4.5]];
  return `<ul class="lst">${t.map(([a, b, v]) => `<li class="between"><span class="row">${av(P[a])}<span class="muted">${ic('ArrowRight', 'sm')}</span>${av(P[b])}<span class="lbl" style="margin-left:4px">${P[a].n} ${L('oddaje', 'pays')} ${P[b].n}</span></span><span class="amount">${zl(v, 2)}</span></li>`).join('')}</ul>
  <div class="cap" style="margin-top:6px">${L('Wstępne, bez niepewnego paragonu. Kuba rozlicza się z rodzicami.', 'Provisional, without the uncertain receipt. Kuba is covered by his parents.')}</div>`;
}

/* ---------- interview ---------- */
function interviewCard({ rating = 'no', reasons = true } = {}) {
  return `<div class="sheet" style="padding:14px"><div class="between"><span class="lbl">${L('Muzeum Bursztynu', 'Amber Museum')}</span>${verified()}</div>
  <div class="cap" style="margin-top:4px">${L('Otwarte wt–nd 10:00–18:00 · 1,2 km · 36 zł', 'Open Tue–Sun 10:00–18:00 · 1.2 km · PLN 36')}</div>
  <div class="cap">${L('Źródło: arkusz zespołu i OSM · 2 paź', 'Source: team sheet and OSM · 2 Oct')}</div>
  <div class="rate" style="margin-top:12px"><div class="${rating === 'want' ? 'want' : ''}">${ic('ThumbsUp')}${L('Chcę', 'Want')}</div><div>${ic('Minus')}${L('Obojętnie', 'Don’t mind')}</div><div class="${rating === 'no' ? 'no' : ''}">${ic('ThumbsDown')}${L('Nie chcę', 'Don’t want')}</div></div>
  ${reasons && rating === 'no' ? `<div class="lbl" style="margin:14px 0 8px;font-size:14px">${L('Dlaczego nie?', 'Why not?')}</div><div class="reasons"><span>${L('Za drogo', 'Too expensive')}</span><span>${L('Za daleko', 'Too far')}</span><span class="on">${L('Nie mój klimat', 'Not my vibe')}</span><span>${L('Za duży tłum', 'Too crowded')}</span><span>${L('Inne', 'Other')}</span></div>` : ''}</div>`;
}
function knowPanel() {
  const facts = [
    ['Users', L('5 osób, w tym babcia bez konta', '5 people, including Grandma without an account')],
    ['Route', L('Babcia: najwyżej 3 km dziennie', 'Grandma: 3 km a day at most')],
    ['Coffee', L('Przerwa po obiedzie', 'A break after lunch')],
    ['Wallet', L('Budżet 1 300–1 700 zł', 'Budget PLN 1,300–1,700')],
    ['Bed', L('Nocleg: parking i winda (wymagane)', 'Stay: parking and a lift (required)')],
  ];
  return `<div class="panel" style="padding:22px"><h3 style="font-size:20px">${ic('ListCheck', 'lg')}${L('Co już wiem', 'What I know so far')}</h3><div class="cap" style="margin-top:4px">${L('Zapisuje kod, nie model.', 'Stored by code, not by the model.')}</div>
  <ul class="lst" style="margin-top:10px">${facts.map(([i, t]) => `<li class="row" style="font-size:15px">${ic(i, 'sm')}${t}</li>`).join('')}</ul>
  <div class="lbl" style="margin:14px 0 8px;font-size:14px">${L('Oceny miejsc', 'Place ratings')}</div>
  <div class="col" style="gap:8px">${P.map((p, k) => { const d = [6, 6, 4, 5, 3][k]; return `<div class="row" style="gap:10px">${av(p, 'sm')}<span style="width:56px;font-size:14px;font-weight:600">${p.n}</span><span class="progress" style="flex:1"><i style="width:${(d / 6) * 100}%"></i></span><span class="cap fig">${d}/6</span></div>`; }).join('')}</div>
  <div class="between" style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border)"><span class="cap">${L('Pierwszy plan po ocenach Kuby i babci', 'First plan after Kuba and Grandma rate')}</span><span class="btn primary sm">${L('Zbuduj plan teraz', 'Build the plan now')}</span></div></div>`;
}

/* ---------- vote link (no account) ---------- */
function voteBody() {
  return `<div style="padding-top:6px"><img src="${MARK()}" style="height:40px"><h2 style="margin:12px 0 4px;font:800 28px/32px var(--font-display);letter-spacing:-.02em">${L('Cześć, Hela!', 'Hi, Hela!')}</h2>
  <div class="muted" style="font-size:16px;line-height:24px">${L('Ania planuje Gdańsk (9–11 paź) i pyta, co myślisz o tych miejscach. Bez konta i bez instalowania.', 'Ania is planning Gdańsk (9–11 Oct) and asks what you think of these places. No account, nothing to install.')}</div>
  <div class="row cap" style="margin:14px 0 8px"><span class="progress" style="flex:1"><i style="width:40%"></i></span>2 / 5</div>
  <div class="sheet" style="padding:14px"><div class="between"><span class="lbl" style="font-size:17px">${L('Molo w Sopocie', 'Sopot Pier')}</span>${verified()}</div><div class="cap" style="margin-top:4px">${L('Zawsze otwarte · 11 zł · 400 m pieszo od tramwaju', 'Always open · PLN 11 · 400 m walk from the tram')}</div>
  <div class="rate" style="margin-top:12px"><div class="want">${ic('ThumbsUp')}${L('Chcę', 'Want')}</div><div>${ic('Minus')}${L('Obojętnie', 'Don’t mind')}</div><div>${ic('ThumbsDown')}${L('Nie chcę', 'Don’t want')}</div></div></div>
  <div class="sheet" style="padding:14px;margin-top:10px"><div class="between"><span class="lbl" style="font-size:17px">${L('Spacer na Westerplatte', 'Walk to Westerplatte')}</span><span class="badge b-dashed">${ic('ShieldQuestion')}${L('Niezweryfikowane', 'Not verified')}</span></div><div class="cap" style="margin-top:4px">${L('Około 3 km pieszo · bezpłatne', 'About 3 km on foot · free')}</div>
  <div class="rate" style="margin-top:12px"><div>${ic('ThumbsUp')}${L('Chcę', 'Want')}</div><div>${ic('Minus')}${L('Obojętnie', 'Don’t mind')}</div><div class="no">${ic('ThumbsDown')}${L('Nie chcę', 'Don’t want')}</div></div>
  <div class="reasons" style="margin-top:10px"><span class="on">${L('Za daleko', 'Too far')}</span><span>${L('Za drogo', 'Too expensive')}</span><span>${L('Nie mój klimat', 'Not my vibe')}</span></div>
  <div class="row cap" style="margin-top:10px;color:var(--danger-ink)">${ic('X', 'sm')}${L('Zgłoś weto: tego miejsca nie będzie w planie', 'Veto: this place will not be in the plan')}</div></div>
  <span class="btn primary block" style="margin-top:14px">${L('Wyślij oceny', 'Send my ratings')}</span></div>`;
}

/* ---------- dashboard ---------- */
function tripCard({ photo, name, city, dates, status, statusCls, metric, w = 'auto' }) {
  return `<div class="sheet" style="overflow:hidden;width:${w}"><div style="height:150px;background:url(photos/${photo}) center/cover"></div>
  <div style="padding:16px 18px"><div class="between"><span style="font:700 19px/24px var(--font-display)">${name}</span>${avs()}</div><div class="cap" style="margin-top:4px">${city} · ${dates}</div>
  <div class="between" style="margin-top:12px"><span class="badge ${statusCls}">${status}</span><span class="lbl fig">${metric}</span></div></div></div>`;
}
