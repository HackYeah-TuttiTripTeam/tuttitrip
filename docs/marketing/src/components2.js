/* Overrides and additions matching tuttitrip-frontend develop (Oct 2026):
   5 trip tabs, help "?", AG-UI interview cards + "Co już wiem", voice, members, expenses/settlement. */
const help = () => `<span class="muted" style="display:inline-flex">${ic('CircleQuestion', 'sm')}</span>`;

function dhead(active = L('Wyjazdy', 'Trips')) {
  return `<header class="dhead"><img src="${LOGO()}" style="height:34px"><span class="nav">${active}</span><span class="sp"></span>
  <span class="row muted lbl">${ic('Globe')}${LANG.toUpperCase()}</span><span class="icbtn">${ic('CircleQuestion') || help()}</span><span class="icbtn">${ic(THEME === 'dark' ? 'Moon' : 'Sun')}</span>
  <span class="btn primary sm">${ic('Plus')}${L('Nowy wyjazd', 'New trip')}</span><span class="who">${av(P[0], 'md')}Ania Nowak</span></header>`;
}
const TABS = () => [['MessageSquare', L('Wywiad', 'Interview')], ['Users', L('Osoby', 'People')], ['UserPlus', L('Członkowie', 'Members')], ['Calendar', 'Plan'], ['Wallet', L('Wydatki', 'Expenses')]];
function tripTop(tab) {
  return `<span class="back">${ic('ChevronLeft', 'sm')}${L('Wyjazdy', 'Trips')}</span>
  <div class="between"><h1 class="ttl">${L('Gdańsk z rodziną', 'Gdańsk with the family')}</h1><span class="row">${avs('md ring')}<span class="btn outline sm" style="margin-left:12px">${ic('Settings', 'sm')}${L('Ustawienia', 'Settings')}</span></span></div>
  <div class="meta"><span>${ic('MapPin', 'sm')}Gdańsk</span><span>${ic('Calendar', 'sm')}${L('pt 9 paź – nd 11 paź', 'Fri 9 Oct – Sun 11 Oct')}</span><span>${ic('Wallet', 'sm')}${L('1 300 zł do 1 700 zł, margines 10%', 'PLN 1,300 to 1,700, 10% margin')}</span><span class="badge b-neutral">Host</span>${help()}</div>
  <div style="margin-top:20px" class="tabs">${TABS().map(([i, t], k) => `<div class="${k === tab ? 'on' : ''}">${ic(i, 'sm')}${t}</div>`).join('')}</div>`;
}

/* ---------- phone chrome like the real PWA ---------- */
function appHeader() {
  return `<div class="ahead"><img src="${LOGO()}" style="height:30px"><span class="row" style="gap:14px"><span class="row lbl">${ic('Globe')}${LANG.toUpperCase()}</span>${ic('CircleQuestion')}</span></div>`;
}
function appNav() {
  return `<nav class="anav"><div class="row" style="flex-direction:column;gap:2px;color:var(--primary)">${ic('Map')}<span>${L('Wyjazdy', 'Trips')}</span></div><span class="fab">${ic('Plus', 'lg')}</span><div class="row" style="flex-direction:column;gap:2px">${av(P[0], 'sm')}<span>Ania</span></div></nav>`;
}
function mTrip(tab, body) {
  const tabs = TABS().map(([i, t], k) => `<div class="${k === tab ? 'on' : ''}">${ic(i, 'sm')}${k === tab ? `<span>${t}</span>` : ''}</div>`).join('');
  return `<span class="back">${ic('ChevronLeft', 'sm')}${L('Wyjazdy', 'Trips')}</span>
  <div class="between" style="margin-top:6px"><h2 class="mttl">${L('Gdańsk z rodziną', 'Gdańsk with the family')}</h2><span class="icbtn" style="border:1px solid var(--border)">${ic('Settings', 'sm')}</span></div>
  <div class="cap row" style="flex-wrap:wrap;gap:10px;margin:4px 0 12px"><span class="row" style="gap:4px">${ic('Calendar', 'xs')}${L('pt 9 – nd 11 paź', 'Fri 9 – Sun 11 Oct')}</span>${avs()}<span class="badge b-neutral" style="min-height:22px">Host</span></div>
  <div class="mtabs">${tabs}</div><div style="margin-top:14px">${body}</div>`;
}
function phone({ title = '', back = true, right = 'Share', body = '', dockOn = null, bare = false, bar = true, scale = 1, extra = '', app = false, nav = true }) {
  const head = app ? appHeader() : bar ? `<div class="pbar"><span class="icbtn">${back ? ic('ChevronLeft') : ''}</span><h1>${title}</h1><span class="icbtn">${right ? ic(right) : ''}</span></div>` : '';
  const bottom = app && nav ? appNav() : dockOn !== null ? dock(dockOn) : '';
  return `<div class="phone ${bare ? 'bare' : ''}" style="${scale !== 1 ? `transform:scale(${scale});transform-origin:top left;` : ''}"><div class="scr">${statusBar()}${head}<div class="pbody ${app ? 'app' : ''}">${body}</div>${extra}${bottom}<span class="homebar"></span></div></div>`;
}

/* ---------- AG-UI interview ---------- */
const src = () => `<span class="srcchip">${ic('Sparkles', 'xs')}${L('ustalił asystent', 'set by the assistant')}</span>`;
const fixd = () => `<span class="srcchip host">${L('poprawione', 'corrected')}</span>`;
function knowRow(label, value, chip = src(), edit = true) {
  return `<li class="krow"><div><div class="cap">${label}</div><div class="kval">${value}</div></div><span class="row" style="gap:8px">${chip}${edit ? `<span class="muted">${ic('Pen', 'sm')}</span>` : ''}</span></li>`;
}
function knowPanel({ compact = false } = {}) {
  const people = [['Ania', L('wiek 41', 'age 41')], ['Tomek', L('wiek 43', 'age 43')], ['Kuba', L('wiek 13', 'age 13')], ['Zosia', L('wiek 38', 'age 38')], ['Hela', L('wiek 76 · do 3 km dziennie', 'age 76 · up to 3 km a day')]];
  return `<div class="panel know" style="padding:20px 22px"><h2 class="h3k" style="margin:0;font:700 20px/26px var(--font-display)">${L('Co już wiem', 'What I know so far')}</h2>
  <div class="cap" style="margin-top:4px">${L('To, co asystent ustalił. Możesz to poprawić, a asystent użyje poprawki.', 'What the assistant has worked out. You can correct it and the assistant will use your fix.')}</div>
  <div class="ksec">${L('Wyjazd', 'Trip')}</div><ul class="lst">
  ${knowRow(L('Cel', 'Destination'), 'Gdańsk')}${knowRow(L('Daty', 'Dates'), L('pt 9 paź – nd 11 paź', 'Fri 9 Oct – Sun 11 Oct'))}${knowRow(L('Budżet', 'Budget'), L('1 300 zł do 1 700 zł', 'PLN 1,300 to 1,700'), fixd())}</ul>
  <div class="ksec">${L('Osoby', 'People')}</div><ul class="lst">${people.slice(0, compact ? 3 : 5).map(([n, v]) => knowRow(n, v, src(), false)).join('')}</ul>
  ${compact ? '' : `<div class="ksec">${L('Preferencje', 'Preferences')}</div><ul class="lst">${knowRow('Ania', L('uzupełnione', 'filled in'), '', true)}${knowRow('Kuba', L('do uzupełnienia', 'to fill in'), '', true)}</ul>`}
  <div class="ksec">${L('Czego jeszcze brakuje', 'Still missing')}</div><div class="cap" style="font-size:14px;line-height:22px">${L('Preferencje: Kuba', 'Preferences: Kuba')}<br>${L('Preferencje: Hela', 'Preferences: Hela')}</div></div>`;
}
function asks(q, body, foot = '') {
  return `<div class="sheet agcard"><div class="row cap" style="color:var(--want-ink);font-weight:600">${ic('SparklesDuo', 'sm')}${L('Asystent pyta', 'The assistant asks')}</div><div class="agq">${q}</div>${body}${foot}</div>`;
}
function dotPool() {
  const d = [[L('Nocleg', 'Stay'), 1], [L('Jedzenie', 'Food'), 2], [L('Atrakcje', 'Activities'), 4], [L('Tempo', 'Pace'), 2], [L('Koszt', 'Cost'), 1]];
  return asks(L('Kuba, co jest dla Ciebie najważniejsze? Rozdaj 10 kropek.', 'Kuba, what matters most to you? Place 10 dots.'),
    `<div class="pool">${d.map(([n, k]) => `<div class="prow"><span class="lbl">${n}</span><span class="dots">${Array.from({ length: 5 }, (_, i) => `<i class="${i < k ? 'on' : ''}"></i>`).join('')}</span><span class="pm">−</span><span class="pm">+</span></div>`).join('')}</div>
    <div class="between" style="margin-top:12px"><span class="cap">${L('Zostało do rozdania: 0 z 10', 'Left to place: 0 of 10')}</span><span class="row" style="gap:8px"><span class="btn outline sm">${L('Pomiń', 'Skip')}</span><span class="btn primary sm">${L('Potwierdź', 'Confirm')}</span></span></div>`);
}
function swipeCard() {
  return asks(L('Kuba, chcesz iść tutaj?', 'Kuba, do you want to go here?'),
    `<div class="swipe"><div class="swback"></div><div class="sheet swfront"><div class="between"><span class="lbl" style="font-size:17px">${L('Centrum Hevelianum', 'Hevelianum Science Centre')}</span>${verified()}</div>
    <div class="cap" style="margin-top:4px">${L('Interaktywne wystawy · 1,8 km · 32 zł', 'Hands-on exhibitions · 1.8 km · PLN 32')}</div><div class="cap">${L('Źródło: arkusz zespołu i OSM · 2 paź', 'Source: team sheet and OSM · 2 Oct')}</div></div></div>
    <div class="cap" style="margin:10px 0">${L('Przesuń kartę w prawo na „tak”, w lewo na „nie”. Przyciski robią to samo.', 'Swipe the card right for yes, left for no. The buttons do the same.')}</div>
    <div class="between"><span class="btn outline" style="min-width:104px">${ic('X', 'sm')}${L('Nie', 'No')}</span><span class="cap">${L('Karta 2 z 6', 'Card 2 of 6')}</span><span class="btn primary" style="min-width:104px">${ic('Check', 'sm')}${L('Tak', 'Yes')}</span></div>`);
}
function budgetCard() {
  return asks(L('Ile chcecie wydać?', 'How much do you want to spend?'),
    `<div class="range"><i class="tr"></i><i class="fill" style="left:26%;right:40%"></i><b style="left:26%"></b><b style="left:60%"></b></div><div class="between cap"><span>${L('Od', 'From')} ${zl(1300)}</span><span>${L('Do', 'To')} ${zl(1700)}</span></div>`,
    `<span class="btn primary sm" style="margin-top:12px">${L('Potwierdź', 'Confirm')}</span>`);
}
const voiceRow = () => `<div class="row" style="gap:12px;margin:6px 0"><span class="micbig">${ic('Mic')}</span><span class="lbl">${L('Powiedz zamiast pisać', 'Speak instead of typing')}</span></div>`;
const reasoning = () => `<div class="row cap" style="gap:6px">${ic('Globe', 'xs')}${L('Tok myślenia asystenta', 'The assistant’s reasoning')}${ic('ChevronDown', 'xs')}</div>`;
const aiMsg = (t) => `<div class="aimsg">${ic('Sparkles', 'sm')}<span>${t}</span></div>`;

/* ---------- members ---------- */
function members() {
  const rows = [[0, 'Host', L('Udział potwierdzony', 'Participation confirmed'), true], [1, 'Co-host', L('Udział potwierdzony', 'Participation confirmed')], [3, L('Członek', 'Member'), L('Udział potwierdzony', 'Participation confirmed')], [2, L('Członek', 'Member'), L('Czeka na potwierdzenie', 'Waiting for confirmation')]];
  return `<div class="sheet" style="padding:16px 18px;background:var(--muted)"><div class="lbl" style="font-size:17px">${L('Jedziesz', 'You’re going')}</div><div class="cap" style="font-size:14px;line-height:20px">${L('Jesteś hostem. Żeby opuścić wyjazd, najpierw przekaż rolę hosta innej osobie.', 'You are the host. To leave the trip, hand the host role to someone else first.')}</div></div>
  <ul class="lst" style="margin-top:8px">${rows.map(([k, r, s, me]) => `<li class="between"><span class="row" style="gap:12px">${av(P[k], 'md')}<span><span class="lbl">${P[k].n}</span>${me ? ` <span class="cap">${L('(Ty)', '(you)')}</span>` : ''}<br><span class="row" style="gap:8px;margin-top:3px"><span class="badge b-neutral" style="min-height:22px">${r}</span><span class="cap" style="${k === 2 ? 'color:var(--warning-ink)' : ''}">${s}</span></span></span></span>${me ? '' : `<span class="muted">⋯</span>`}</li>`).join('')}
  <li class="between"><span class="row" style="gap:12px">${av(P[4], 'md')}<span><span class="lbl">Hela</span><br><span class="row" style="gap:8px;margin-top:3px"><span class="badge b-dashed" style="min-height:22px">${L('Profil bez konta', 'Profile without account')}</span><span class="cap">${L('Głosuje z linku', 'Votes from a link')}</span></span></span></span><span class="btn outline sm">${ic('QrCode', 'sm')}${L('Link', 'Link')}</span></li></ul>`;
}

/* ---------- expenses + settlement (real shape) ---------- */
const EXP = () => [
  ['Soup', L('Obiad w Oliwie', 'Lunch in Oliwa'), L('sob 10 paź', 'Sat 10 Oct'), 'Ania', L('dla wszystkich', 'for everyone'), 142],
  ['Landmark', L('Bilety do muzeum', 'Museum tickets'), L('sob 10 paź', 'Sat 10 Oct'), 'Tomek', L('dla wszystkich', 'for everyone'), 180],
  ['Ship', L('Rejs tramwajem wodnym', 'Water tram trip'), L('sob 10 paź', 'Sat 10 Oct'), 'Zosia', L('dla wszystkich', 'for everyone'), 200],
  ['Coffee', L('Lody i kawa', 'Ice cream and coffee'), L('nd 11 paź', 'Sun 11 Oct'), 'Hela', L('dla: Hela, Kuba, Zosia', 'for: Hela, Kuba, Zosia'), 64],
];
function expenses() {
  return `<div class="between"><span class="lbl">${L('Razem wydano:', 'Spent in total:')} ${zl(586, 2)}</span></div>
  <ul class="lst" style="margin-top:6px">${EXP().map(([i, n, d, w, f, a]) => `<li class="between"><div><div class="row lbl">${ic(i, 'sm')}${n}</div><div class="cap">${d} · ${L('płaci', 'paid by')} ${w}</div><div class="cap">${f}</div></div><span class="amount">${zl(a, 2)}</span></li>`).join('')}
  <li><div class="dashed-box between"><div><div class="row lbl">${ic('Receipt', 'sm')}${L('Kawiarnia po muzeum', 'Café after the museum')}</div><div class="cap">${L('Odczyt paragonu przez model · do sprawdzenia', 'Receipt read by the model · please check')}</div></div><span class="amount">${zl(86.5, 2)}?</span></div><span class="btn outline sm block" style="margin-top:8px">${L('Potwierdź', 'Confirm')} ${zl(86.5, 2)}</span></li></ul>`;
}
function transfers() {
  const t = [[4, 3, 53.5], [4, 1, 29], [0, 1, 4.5]];
  return `<div class="between"><span style="font:700 18px/24px var(--font-display)">${L('Przelewy', 'Transfers')}</span><span class="btn outline sm">${ic('Download', 'sm')}${L('Pobierz listę', 'Download the list')}</span></div>
  <ul class="lst" style="margin-top:6px">${t.map(([a, b, v]) => `<li class="between"><span class="row" style="gap:8px">${av(P[a], 'sm')}<span class="lbl">${P[a].n}</span><span class="muted">${ic('ArrowRight', 'sm')}</span>${av(P[b], 'sm')}<span class="lbl">${P[b].n}</span></span><span class="amount">${zl(v, 2)}</span></li>`).join('')}</ul>`;
}
function balances() {
  const b = [[1, 33.5], [3, 53.5], [0, -4.5], [4, -82.5]];
  return `<div style="font:700 18px/24px var(--font-display);margin-top:16px">${L('Saldo każdej osoby', 'Balance of each person')}</div><ul class="lst" style="margin-top:6px">${b.map(([k, v]) => `<li class="between"><span class="row" style="gap:8px">${av(P[k], 'sm')}${P[k].n}</span><span class="amount" style="color:${v > 0 ? 'var(--want-ink)' : 'var(--danger-ink)'}">${v > 0 ? '+' : '−'}${zl(Math.abs(v), 2)}</span></li>`).join('')}</ul>`;
}
const expSeg = (on = 0) => `<div class="seg ink" style="width:260px"><div class="${on === 0 ? 'on' : ''}">${L('Wydatki', 'Expenses')}</div><div class="${on === 1 ? 'on' : ''}">${L('Rozliczenie', 'Settlement')}</div></div>`;

/* ---------- plan: model-written justification ---------- */
function dayPlan({ why = true } = {}) {
  return `<div class="tl">
  ${item('09:30', 'breakfast', L('Otwarte od 8:00 · ', 'Open from 8:00 · ') + zl(160), `<div class="chips">${verified()}</div>`, 'done')}
  ${item('11:00', 'park', L('800 m od śniadania · ', '800 m from breakfast · ') + zl(0), `<div class="chips">${verdict('fits')}</div>`, 'done')}
  ${item('13:30', 'rest', L('W apartamencie, 1 h 30 min', 'At the apartment, 1 h 30 min'))}
  ${item('15:00', 'amber', L('Otwarte 10:00–18:00 · ', 'Open 10:00–18:00 · ') + zl(180), `<div class="chips">${verdict('must')}</div>${why ? `<div class="why">${L('Ania bardzo chce tu iść, a Kubie jest obojętnie, więc muzeum jest po przerwie babci, kiedy ona ma najwięcej sił. Kuba dostaje w zamian Hevelianum w niedzielę.', 'Ania really wants to go and Kuba doesn’t mind, so the museum comes after Grandma’s break, when she has the most energy. Kuba gets Hevelianum on Sunday in return.')}${voteRow()}<div class="row cap" style="gap:6px;margin-top:8px">${ic('Sparkles', 'xs')}${L('Uzasadnienie napisał model z liczb algorytmu', 'Explanation written by the model from the algorithm’s numbers')}</div></div>` : ''}`, 'goal')}
  ${item('17:30', 'pier', L('Zawsze otwarte · ', 'Always open · ') + zl(11), `<div class="chips">${verdict('iconic')}</div>`, 'wait')}
  </div>`;
}
