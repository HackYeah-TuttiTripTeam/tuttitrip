"""Generuje diagram architektury TuttiTrip w formacie draw.io.

Wynik: architektura.drawio. PNG z osadzonym diagramem robi render.sh.
Diagram pokazuje podział S1 (kod liczy i sprawdza), S2 (model pisze na żądanie S1)
i S3 (działanie czeka na zgodę człowieka), worker DBOS, modele na GB10, mowę w chmurze,
mapę Google i serwer MCP. Opis decyzji: docs/architektura.md.

Kolory z design systemu TuttiTrip: zieleń marki #00774D (S1, to, co liczy kod), atrament
#10241C, papier #F7FBF9. Przerywany obrys oznacza to, co jest poza naszą infrastrukturą
albo jeszcze niezrobione (zgodnie z zasadą „pełne to fakt, przerywane to niepewne”).
"""
from pathlib import Path
from xml.sax.saxutils import escape

HERE = Path(__file__).parent

INK, PAPER, BRAND, SOFT, LINE, MUTED = "#10241C", "#F7FBF9", "#00774D", "#DCF2E6", "#B9C9C1", "#4A5E55"
FONT = f"fontFamily=Arial;fontColor={INK};"


def q(t):
    return escape(t, {'"': "&quot;"})


def box(fill, stroke, dashed=False, size=17, bold=False, extra=""):
    d = "dashed=1;dashPattern=6 4;" if dashed else ""
    b = "fontStyle=1;" if bold else ""
    return (f"rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor={fill};strokeColor={stroke};strokeWidth=2;{d}{b}"
            f"fontSize={size};{FONT}{extra}")


ST_ZONE = lambda fill, stroke, dashed=False: (  # noqa: E731
    f"rounded=1;arcSize=2;whiteSpace=wrap;html=1;container=0;fillColor={fill};strokeColor={stroke};strokeWidth=2;"
    f"{'dashed=1;dashPattern=6 4;' if dashed else ''}verticalAlign=top;align=left;spacingLeft=14;spacingTop=8;"
    f"fontStyle=1;fontSize=21;{FONT}")
ST_S1 = box(SOFT, BRAND, bold=False)
ST_PLAIN = box("#FFFFFF", MUTED)
ST_EXT = box("#FFFFFF", MUTED, dashed=True)
ST_LANE = "dashed=1;dashPattern=2 4;"


class Doc:
    def __init__(self):
        self.cells = []

    def vertex(self, id, label, x, y, w, h, style):
        self.cells.append(f'<mxCell id="{id}" value="{q(label)}" style="{style}" vertex="1" parent="1">'
                          f'<mxGeometry x="{x}" y="{y}" width="{w}" height="{h}" as="geometry"/></mxCell>')

    def edge(self, id, src, tgt, label="", style="", points=()):
        base = (f"endArrow=block;endFill=1;html=1;strokeColor={MUTED};strokeWidth=2;fontSize=15;fontFamily=Arial;"
                f"fontColor={MUTED};labelBackgroundColor={PAPER};edgeStyle=orthogonalEdgeStyle;rounded=1;")
        pts = ""
        if points:
            pts = '<Array as="points">' + "".join(f'<mxPoint x="{x}" y="{y}"/>' for x, y in points) + "</Array>"
        self.cells.append(f'<mxCell id="{id}" value="{q(label)}" style="{base}{style}" edge="1" parent="1" source="{src}" target="{tgt}">'
                          f'<mxGeometry relative="1" as="geometry">{pts}</mxGeometry></mxCell>')

    def xml(self, name):
        return ('<mxfile host="app.diagrams.net"><diagram id="' + name.replace(" ", "-") + '" name="' + q(name) + '">'
                '<mxGraphModel dx="1600" dy="1200" grid="0" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" '
                f'page="0" pageScale="1" pageWidth="2100" pageHeight="1400" background="{PAPER}" math="0" shadow="0"><root>'
                '<mxCell id="0"/><mxCell id="1" parent="0"/>' + "\n".join(self.cells) + "</root></mxGraphModel></diagram></mxfile>\n")


def build():
    d = Doc()
    d.vertex("title", "Architektura TuttiTrip", 20, 20, 900, 56,
             f"text;html=1;fontSize=44;fontStyle=1;fontFamily=Arial;fontColor={INK};align=left;verticalAlign=top;")
    d.vertex("sub", "Kod liczy i sprawdza (S1), model pisze tylko na żądanie S1 (S2), a działania z kosztem czekają na zgodę (S3).",
             20, 78, 1700, 36, f"text;html=1;fontSize=24;fontFamily=Arial;fontColor={MUTED};align=left;verticalAlign=top;")

    # strefy
    top, hz = 150, 790
    d.vertex("z_dev", "Urządzenia", 20, top, 290, hz, ST_ZONE("#FFFFFF", LINE))
    d.vertex("z_cf", "Cloudflare", 350, top, 270, hz, ST_ZONE("#FFFFFF", LINE))
    d.vertex("z_host", "Własny host (Dell Pro Max z GB10), Docker", 660, top, 1110, hz, ST_ZONE("#FFFFFF", BRAND))
    d.vertex("z_ext", "Usługi zewnętrzne", 1810, top, 270, hz, ST_ZONE("#FFFFFF", MUTED, dashed=True))

    # urządzenia (y od 210)
    d.vertex("u_app", "Przeglądarka i PWA<br>(host i członkowie)", 40, 210, 250, 90, ST_PLAIN)
    d.vertex("u_vote", "Osoba bez konta<br>(link głosowy, token w #)", 40, 330, 250, 90, ST_PLAIN)
    d.vertex("u_jury", "Juror<br>(link /demo, konto demo)", 40, 450, 250, 90, ST_PLAIN)
    d.vertex("u_mcp", "Klient MCP (P2)<br>Claude, ChatGPT, Claude Code", 40, 620, 250, 90, ST_EXT)

    # Cloudflare
    d.vertex("cf_fe", "Worker frontendu<br>PWA, statyczne zasoby<br>i proxy /api/*<br><br>tuttitrip.gburek.app", 370, 210, 230, 330, ST_PLAIN)
    d.vertex("cf_api", "Domena API<br>tuttitrip-api.gburek.app<br>(MCP tylko tu)", 370, 620, 230, 90, ST_PLAIN)

    # host
    d.vertex("h_gw", "Gateway nginx<br>/api/v1; ścieżki<br>wewnętrzne = 404", 680, 210, 210, 110, ST_PLAIN)
    d.vertex("h_be", "Backend FastAPI, plastry pionowe", 920, 210, 450, 700, ST_ZONE(PAPER, BRAND))
    d.vertex("s1", "<b>S1: liczy i sprawdza</b><br>solver (heurystyka, potem CP-SAT)<br>sprawdzenie planu, reguły cen,<br>wymagania noclegowe<br>czysta logika, bez modelu",
             940, 260, 410, 140, ST_S1)
    d.vertex("s2", "<b>S2: model pisze na żądanie S1</b><br>wywiad tekstowy przez AG-UI<br>agent Pydantic AI, katalog modeli",
             940, 420, 410, 110, ST_PLAIN)
    d.vertex("s3", "<b>S3: czeka na zgodę człowieka</b><br>karta zatwierdzenia: przekroczenie<br>budżetu, wyszukiwanie noclegów",
             940, 550, 410, 110, box("#FFFFFF", BRAND, dashed=True))
    d.vertex("be_mcp", "Serwer MCP /api/v1/mcp (P2)<br>uprawnienia na każdym narzędziu", 940, 680, 410, 80, box("#FFFFFF", MUTED, dashed=True))
    d.vertex("be_voice", "Wywiad głosowy: sideband WebRTC<br>narzędzia i historia na serwerze", 940, 780, 410, 80, ST_PLAIN)
    d.vertex("h_db", "PostgreSQL 18 + pgvector<br>dane aplikacji, kolejki i stan DBOS", 1440, 210, 300, 100, ST_PLAIN)
    d.vertex("h_wk", "Worker DBOS + Pydantic AI<br>trwałe workflowy: uzasadnienia,<br>parsowanie planu i oferty,<br>odczyt paragonu, miejsca z OSM",
             1440, 400, 300, 150, ST_PLAIN)
    d.vertex("h_gb", "Modele na GB10<br>Qwen3.8-27B (agent, czat, obraz)<br>basal i Laya (decyzyjne)<br>embeddingi z Ollamy", 1440, 640, 300, 140, box(SOFT, BRAND))

    # zewnętrzne
    d.vertex("x_auth", "Auth0<br>logowanie w przeglądarce,<br>weryfikacja tokenu w API", 1830, 210, 230, 100, ST_EXT)
    d.vertex("x_gm", "Google Maps<br>mapa i karta miejsca w<br>przeglądarce, tylko dla człowieka", 1830, 340, 230, 100, ST_EXT)
    d.vertex("x_or", "OpenRouter<br>zapas modeli i JEV<br>dla backendu i workera", 1830, 470, 230, 110, ST_EXT)
    d.vertex("x_oai", "OpenAI Realtime, mowa<br>gpt-realtime-2.1-mini<br>audio wprost z przeglądarki", 1830, 770, 230, 110, ST_EXT)

    # legenda
    d.vertex("lg1", "Zielone tło: liczy kod albo działa lokalnie", 40, 980, 380, 50, box(SOFT, BRAND, size=16))
    d.vertex("lg2", "Przerywany obrys: poza naszą infrastrukturą, czeka na zgodę albo jeszcze niezrobione (P2)", 450, 980, 760, 50,
             box("#FFFFFF", MUTED, dashed=True, size=16))
    d.vertex("lg3", "Przeglądarka łączy się też wprost z Auth0, OpenAI (audio) i Google Maps; tych linii nie rysujemy.", 1240, 980, 840, 50,
             box("#FFFFFF", LINE, size=16))

    # krawędzie
    d.edge("e1", "u_app", "cf_fe", "HTTPS")
    d.edge("e2", "u_vote", "cf_fe")
    d.edge("e3", "u_jury", "cf_fe")
    d.edge("e4", "u_mcp", "cf_api", "MCP", style=ST_LANE)
    d.edge("e5", "cf_fe", "h_gw", "/api/v1")
    d.edge("e6", "cf_api", "h_gw", style=ST_LANE, points=[(640, 665), (640, 265)])
    d.edge("e7", "h_gw", "h_be")
    d.edge("e8", "s1", "h_db", "SQL", points=[(1395, 310), (1395, 260)])
    d.edge("e9", "s2", "h_gb", "Qwen i basal", points=[(1420, 475), (1420, 710)])
    d.edge("e10", "h_db", "h_wk", "zlecenia DBOS", style="startArrow=block;startFill=1;")
    d.edge("e11", "h_wk", "h_gb", "modele i embeddingi")
    d.edge("e12", "h_wk", "x_or", "zapas", style=ST_LANE)
    d.edge("e14", "be_voice", "x_oai", "sideband", style=ST_LANE, points=[(1360, 905), (1790, 905), (1790, 825)])
    return d


def main():
    (HERE / "architektura.drawio").write_text(build().xml("Architektura"), encoding="utf-8")
    print("zapisano architektura.drawio")


if __name__ == "__main__":
    main()
