"""Generuje mapę przypadków użycia TuttiTrip w formacie draw.io.

Wynik: mapa-przypadkow-uzycia.drawio (cała mapa) oraz
przypadki-uzycia/<domena>.drawio (po jednej domenie). PNG z osadzonym
diagramem robi render.sh. Po ręcznej edycji w diagrams.net nie trzeba
uruchamiać tego skryptu, wystarczy ponownie wyeksportować PNG.

Układ ramki: aktorzy z lewej łączą się z kolumną A, aktorzy z prawej z kolumną B.
Kolumna B trzyma też przypadki dołączane («include») i rozszerzające («extend»).
"""
from pathlib import Path
from xml.sax.saxutils import escape

HERE = Path(__file__).parent

ACTORS = {
    "u": "Użytkownik", "adm": "Administrator<br>systemu", "host": "Host", "co": "Co-host",
    "cz": "Członek<br>podróży", "gosc": "Osoba bez konta<br>(link głosowy)", "jur": "Juror<br>(konto demo)",
}

# Domena: (plik, nazwa, aktorzy z lewej, aktorzy z prawej, przypadki, relacje)
# przypadek: id -> (nazwa, kolumna "A"/"B", wiersz, nowa_story)
# aktorzy: (aktor, [id przypadków])
# relacja: (od, "include"/"extend", do)
DOMAINS = [
    ("konta-i-role", "Konta i role",
     [("u", ["info", "rej", "log", "has", "kon", "wyl"]), ("jur", ["demo"]), ("adm", ["lista", "upr", "wagi"])], [],
     {"info": ("Przeglądaj stronę główną, O nas i Kontakt", "A", 0, 0), "rej": ("Zarejestruj się", "A", 1, 0),
      "log": ("Zaloguj się", "A", 2, 0), "soc": ("Zaloguj się przez Google lub Discord", "B", 2, 1),
      "has": ("Odzyskaj hasło", "A", 3, 0), "kon": ("Edytuj dane konta", "A", 4, 0), "wyl": ("Wyloguj się", "A", 5, 0),
      "demo": ("Zaloguj się na konto demo", "A", 6.2, 1),
      "lista": ("Przeglądaj użytkowników", "A", 7.9, 1), "blok": ("Zablokuj konto", "B", 7.4, 1),
      "usun": ("Usuń użytkownika", "B", 8.4, 0), "upr": ("Nadaj lub odbierz uprawnienia", "A", 9.4, 1),
      "wagi": ("Ustaw parametry i wagi algorytmu", "A", 10.4, 0)},
     [("soc", "extend", "log"), ("blok", "extend", "lista"), ("usun", "extend", "lista")]),
    ("podroze-i-czlonkostwo", "Podróże i członkostwo",
     [("co", ["edp", "zap", "usc"]), ("host", ["zap", "usc", "coh", "wag", "prof", "wyj", "pol", "usp"])],
     [("u", ["dol", "hist"]), ("cz", ["potw", "opu"])],
     {"edp": ("Edytuj podróż", "A", 0, 1), "zap": ("Zaproś członków (link, QR)", "A", 1, 0),
      "usc": ("Usuń członka", "A", 2, 0), "coh": ("Wyznacz co-hosta", "A", 3, 0),
      "wag": ("Zmień wagi członków", "A", 4, 0), "prof": ("Dodaj profil osoby bez konta", "A", 5, 1),
      "wyj": ("Zaplanuj wyjście bez noclegu", "A", 6, 1), "pol": ("Połącz dwie podróże", "A", 7, 0),
      "usp": ("Usuń podróż", "A", 8, 0),
      "dol": ("Dołącz do podróży z zaproszenia", "B", 1.5, 0), "hist": ("Przeglądaj historię podróży", "B", 2.5, 0),
      "potw": ("Potwierdź udział", "B", 5.5, 0), "opu": ("Opuść podróż", "B", 6.5, 0)},
     []),
    ("preferencje", "Preferencje",
     [("host", ["pob", "uzu"]), ("cz", ["pref", "pula", "oce"]), ("gosc", ["oce"])], [],
     {"pob": ("Pobierz preferencje członków", "A", 0, 0), "uzu": ("Uzupełnij preferencje za innych", "A", 1, 0),
      "pref": ("Podaj preferencje", "A", 3, 0), "zai": ("Podaj zainteresowania", "B", 2, 0),
      "ogr": ("Podaj ograniczenia zdrowotne", "B", 3, 0), "lub": ("Wskaż lubiane i nielubiane miejsca", "B", 4, 0),
      "pula": ("Rozdziel pulę ważności", "A", 5, 1), "oce": ("Oceń miejsce kciukiem", "A", 6, 0),
      "pwd": ("Wskaż powód odrzucenia", "B", 6, 1)},
     [("pref", "include", "zai"), ("pref", "include", "ogr"), ("pref", "include", "lub"), ("pwd", "extend", "oce")]),
    ("wywiad", "Wywiad (asystent AI)",
     [("host", ["start", "prz", "wst"])], [("cz", ["wyw"])],
     {"start": ("Zacznij planowanie jednym zdaniem", "A", 0, 1), "prz": ("Przerwij i wróć („Zapisz i wróć”)", "A", 1, 1),
      "wst": ("Zobacz plan wstępny", "A", 2, 1), "wyw": ("Porozmawiaj z asystentem", "B", 1, 0)},
     [("start", "include", "wyw"), ("prz", "extend", "wyw"), ("wst", "extend", "wyw")]),
    ("planowanie", "Planowanie",
     [("host", ["alg", "ovr", "spr", "ksi", "bud", "prk", "wys", "pdf", "lin", "kal", "lnk", "wza"])],
     [("cz", ["wer", "prp", "bdn", "dec", "pob", "weto"]), ("gosc", ["weto"])],
     {"alg": ("Ułóż plan algorytmem", "A", 0.5, 0), "pod": ("Zachowaj podłogę zadowolenia", "B", 0, 1),
      "pow": ("Daj ten sam plan dla tych samych danych", "B", 1, 1),
      "ovr": ("Wymuś lub zablokuj miejsce", "A", 2, 1), "kov": ("Zobacz koszt override", "B", 2, 1),
      "spr": ("Zobacz miarę sprawiedliwości", "A", 3, 1), "wer": ("Zobacz werdykt miejsca", "B", 3, 1),
      "ksi": ("Zobacz księgę sprawiedliwości", "A", 4, 1), "prp": ("Przeplanuj resztę dnia", "B", 4, 1),
      "bud": ("Ustaw budżet od–do", "A", 5, 1), "bdn": ("Sprawdź budżet dnia", "B", 5, 1),
      "prk": ("Zatwierdź przekroczenie budżetu", "A", 6, 1), "tan": ("Wybierz tańszą propozycję", "B", 6, 1),
      "wys": ("Wyślij propozycję planu", "A", 7, 0), "dec": ("Zatwierdź, odrzuć lub skomentuj plan", "B", 7, 0),
      "pdf": ("Wydrukuj plan lub zapisz PDF", "A", 8, 1), "pob": ("Pobierz zatwierdzony plan", "B", 8, 0),
      "lin": ("Sprawdź wklejony plan linterem", "A", 9, 1), "kal": ("Zapisz plan w kalendarzu", "A", 10, 1),
      "lnk": ("Wyślij link głosowy", "A", 11, 1), "wza": ("Zgłoś weto za inną osobę", "A", 12, 1),
      "weto": ("Zgłoś weto", "B", 12, 1)},
     [("alg", "include", "pod"), ("alg", "include", "pow"), ("ovr", "include", "kov"), ("tan", "extend", "bdn"),
      ("pdf", "extend", "pob"), ("wza", "extend", "weto")]),
    ("miejsca-i-oferty", "Miejsca i oferty",
     [("host", ["wym", "szu", "nat"])], [("cz", ["noc", "wyc", "uni", "prj", "kos", "zwe"])],
     {"wym": ("Ustaw wymagania noclegowe", "A", 0, 1), "ofe": ("Sprawdź wklejoną ofertę noclegu", "B", 0, 1),
      "szu": ("Otwórz wyszukiwanie noclegów", "A", 1, 1), "nat": ("Rozważ noc-atrakcję", "A", 2, 1),
      "noc": ("Zobacz nocleg z ceną", "B", 1.5, 0), "wyc": ("Wybierz gotową wycieczkę z ceną", "B", 2.5, 0),
      "uni": ("Poznaj unikalne doświadczenia", "B", 3.5, 0), "prj": ("Zobacz przejazdy i ceny biletów", "B", 4.5, 1),
      "kos": ("Zobacz koszt na osobę z ulgami", "B", 5.5, 1),
      "zwe": ("Sprawdź, czy cena i godziny są zweryfikowane", "B", 6.5, 1)},
     [("ofe", "extend", "wym")]),
    ("wydatki", "Wydatki",
     [("cz", ["dod", "kwo"]), ("host", ["roz"])], [],
     {"dod": ("Dodaj paragon lub kwotę", "A", 0.5, 0), "glo": ("Dodaj wydatek tekstem lub głosem", "B", 0, 1),
      "odc": ("Potwierdź odczyt paragonu", "B", 1, 1), "kwo": ("Zobacz kwotę do przelania", "A", 2, 0),
      "podz": ("Podziel koszty między członków", "B", 2.5, 0), "roz": ("Rozlicz wydatki na koniec podróży", "A", 3, 0)},
     [("glo", "extend", "dod"), ("odc", "extend", "dod"), ("kwo", "include", "podz"), ("roz", "include", "podz")]),
    ("w-trakcie-podrozy", "W trakcie podróży",
     [("cz", ["zdj", "lok", "pok"])], [],
     {"zdj": ("Dodaj zdjęcia", "A", 0, 0), "lok": ("Udostępnij lokalizację", "A", 1, 0),
      "pok": ("Podaj numer pokoju (zameldowanie)", "A", 2, 0)},
     []),
]

FONT = "fontFamily=Arial;fontColor=#1F2933;"
UC_W, UC_H, ROW = 280, 68, 98
ACT_ZONE, PAD, HEAD, GAP_AB = 170, 26, 52, 120
ST_IST = f"ellipse;whiteSpace=wrap;html=1;spacingLeft=24;spacingRight=24;fillColor=#CFE0F5;strokeColor=#4F74A8;strokeWidth=2;fontSize=17;{FONT}"
ST_NOWA = f"ellipse;whiteSpace=wrap;html=1;spacingLeft=24;spacingRight=24;fillColor=#F3F7FC;strokeColor=#9CB5D6;strokeWidth=2;dashed=1;dashPattern=6 4;fontSize=17;{FONT}fontColor=#3A4654;"
ST_ACTOR = f"shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#FFFFFF;strokeColor=#3C4650;strokeWidth=2;fontSize=17;{FONT}"
ST_FRAME = f"rounded=0;whiteSpace=wrap;html=1;fillColor=#FAFAF7;strokeColor=#8C8C84;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=22;{FONT}spacingTop=8;"
ST_ASSOC = "endArrow=none;html=1;strokeColor=#3C4650;strokeWidth=1.5;"
ST_REL = "endArrow=open;endSize=12;dashed=1;html=1;strokeColor=#3C4650;strokeWidth=1.5;fontSize=15;fontFamily=Arial;fontColor=#3C4650;labelBackgroundColor=#FFFFFF;"
ST_GEN = "endArrow=block;endFill=0;endSize=16;html=1;strokeColor=#3C4650;strokeWidth=1.5;"


def q(t):
    return escape(t, {'"': "&quot;"})


class Doc:
    def __init__(self):
        self.cells = []

    def vertex(self, id, label, x, y, w, h, style, parent="1"):
        self.cells.append(f'<mxCell id="{id}" value="{q(label)}" style="{style}" vertex="1" parent="{parent}">'
                          f'<mxGeometry x="{x:.0f}" y="{y:.0f}" width="{w:.0f}" height="{h:.0f}" as="geometry"/></mxCell>')

    def edge(self, id, src, tgt, style, label=""):
        self.cells.append(f'<mxCell id="{id}" value="{q(label)}" style="{style}" edge="1" parent="1" source="{src}" target="{tgt}">'
                          f'<mxGeometry relative="1" as="geometry"/></mxCell>')

    def xml(self, name):
        return ('<mxfile host="app.diagrams.net"><diagram id="' + name.replace(" ", "-") + '" name="' + q(name) + '">'
                '<mxGraphModel dx="1600" dy="1200" grid="0" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" '
                'page="0" pageScale="1" pageWidth="2100" pageHeight="3000" background="#FFFFFF" math="0" shadow="0"><root>'
                '<mxCell id="0"/><mxCell id="1" parent="0"/>' + "\n".join(self.cells) + "</root></mxGraphModel></diagram></mxfile>\n")


def rel_label(kind):
    return f"«{kind}»"


def domain_size(d):
    _, _, left, right, ucs, _ = d
    has_b = any(c == "B" for _, c, _, _ in ucs.values())
    rows = max(r for _, _, r, _ in ucs.values()) + 1
    fw = PAD * 2 + UC_W + (GAP_AB + UC_W if has_b else 0)
    w = ACT_ZONE + fw + (ACT_ZONE if right else 30)
    h = HEAD + rows * ROW + PAD
    return w, h, fw


def draw_domain(doc, d, ox, oy):
    """Rysuje jedną domenę z lewym górnym rogiem w (ox, oy); zwraca (szerokość, wysokość)."""
    key, title, left, right, ucs, rels = d
    w, h, fw = domain_size(d)
    fx = ox + ACT_ZONE
    doc.vertex(f"{key}", title, fx, oy, fw, h, ST_FRAME)
    pos = {}
    for uid, (label, col, row, new) in ucs.items():
        x = fx + PAD + (0 if col == "A" else UC_W + GAP_AB)
        y = oy + HEAD + row * ROW + (ROW - UC_H) / 2
        pos[uid] = y + UC_H / 2
        doc.vertex(f"{key}_{uid}", label, x, y, UC_W, UC_H, ST_NOWA if new else ST_IST)
    for side, actors in (("L", left), ("R", right)):
        for a, us in actors:
            cy = sum(pos[u] for u in us) / len(us)
            ax = ox + ACT_ZONE / 2 - 18 if side == "L" else fx + fw + ACT_ZONE / 2 - 18
            aid = f"{key}_{a}"
            doc.vertex(aid, ACTORS[a], ax, cy - 42, 36, 66, ST_ACTOR)
            ex = ("exitX=1;exitY=0.45;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" if side == "L"
                  else "exitX=0;exitY=0.45;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;")
            for u in us:
                doc.edge(f"{aid}_{u}", aid, f"{key}_{u}", ST_ASSOC + ex)
    for i, (s, kind, t) in enumerate(rels):
        doc.edge(f"{key}_r{i}", f"{key}_{s}", f"{key}_{t}", ST_REL, rel_label(kind))
    return w, h


def draw_actors(doc, ox, oy):
    doc.vertex("aktorzy", "Aktorzy", ox, oy, 900, 330, ST_FRAME.replace("#FAFAF7", "#FFFFFF"))
    side = ST_ACTOR.replace("verticalLabelPosition=bottom;verticalAlign=top;",
                            "labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=6;")
    doc.vertex("act_u", ACTORS["u"], ox + 162, oy + 55, 36, 66, side)
    for a, x in {"host": 50, "co": 162, "cz": 274}.items():
        doc.vertex(f"act_{a}", ACTORS[a], ox + x, oy + 180, 36, 66, ST_ACTOR)
        doc.edge(f"gen_{a}", f"act_{a}", "act_u", ST_GEN + "exitX=0.5;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;")
    for a, x in {"adm": 450, "jur": 600, "gosc": 760}.items():
        doc.vertex(f"act_{a}", ACTORS[a], ox + x, oy + 110, 36, 66, ST_ACTOR)
    doc.vertex("aktorzy_opis", "Host, Co-host i Członek podróży to role Użytkownika w konkretnej podróży (generalizacja).",
               ox + 20, oy + 292, 860, 30, f"text;html=1;fontSize=15;{FONT}fontColor=#4A5561;align=left;")


def draw_legend(doc, ox, oy):
    doc.vertex("legenda", "Legenda", ox, oy, 760, 330, ST_FRAME.replace("#FAFAF7", "#FFFFFF"))
    doc.vertex("lg_ist", "Istniejąca user story", ox + 30, oy + 60, 250, 58, ST_IST)
    doc.vertex("lg_nowa", "Nowa user story (ze słownika)", ox + 30, oy + 140, 250, 58, ST_NOWA)
    doc.vertex("lg_ext", "Przypadek rozszerzający", ox + 400, oy + 60, 250, 58, ST_IST)
    doc.vertex("lg_base", "Przypadek bazowy", ox + 400, oy + 140, 250, 58, ST_IST)
    doc.vertex("lg_inc", "Przypadek dołączany", ox + 400, oy + 220, 250, 58, ST_IST)
    doc.edge("lg_r1", "lg_ext", "lg_base", ST_REL, rel_label("extend"))
    doc.edge("lg_r2", "lg_base", "lg_inc", ST_REL, rel_label("include"))
    doc.vertex("lg_act", "Aktor", ox + 120, oy + 222, 30, 54, ST_ACTOR)
    doc.vertex("lg_note", "Aktor jest rysowany przy każdej domenie, której dotyczy.",
               ox + 30, oy + 290, 700, 30, f"text;html=1;fontSize=15;{FONT}fontColor=#4A5561;align=left;")


def title(doc, x, y, text, sub):
    doc.vertex("tytul", text, x, y, 1400, 60, f"text;html=1;fontSize=44;fontStyle=1;{FONT}align=left;verticalAlign=top;")
    doc.vertex("podtytul", sub, x, y + 62, 1800, 40, f"text;html=1;fontSize=24;{FONT}fontColor=#4A5561;align=left;verticalAlign=top;")


def main():
    out = HERE / "przypadki-uzycia"
    out.mkdir(exist_ok=True)
    for d in DOMAINS:
        doc = Doc()
        draw_domain(doc, d, 20, 20)
        (out / f"{d[0]}.drawio").write_text(doc.xml(d[1]), encoding="utf-8")

    doc = Doc()
    title(doc, 20, 20, "Mapa przypadków użycia TuttiTrip",
          "Ramki to domeny systemu (kolejność jak w dokumencie). Linia ciągła łączy aktora z przypadkiem użycia.")
    draw_actors(doc, 20, 150)
    draw_legend(doc, 960, 150)
    # dwie kolumny, domeny w kolejności z dokumentu czytane wierszami
    y, col_x = 540, [0, 0]
    sizes = [domain_size(d) for d in DOMAINS]
    col_x[1] = max(sizes[i][0] for i in range(0, len(DOMAINS), 2)) + 40
    for i in range(0, len(DOMAINS), 2):
        hs = []
        for j, d in enumerate(DOMAINS[i:i + 2]):
            hs.append(draw_domain(doc, d, col_x[j], y)[1])
        y += max(hs) + 60
    (HERE / "mapa-przypadkow-uzycia.drawio").write_text(doc.xml("Mapa przypadków użycia"), encoding="utf-8")
    print("zapisano", len(DOMAINS), "domen")


if __name__ == "__main__":
    main()
