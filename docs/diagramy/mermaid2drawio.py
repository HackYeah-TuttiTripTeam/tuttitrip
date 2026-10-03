"""Przenosi układ mapy pojęć z SVG wyrenderowanego przez mermaid-cli do draw.io.

Węzły, ramki grup i przebieg krawędzi (punkty załamań) są kopiowane z SVG,
więc w draw.io diagram wygląda tak samo jak po renderze Mermaid i da się go
dalej edytować. Użycie: python3 mermaid2drawio.py mapa-pojec.mmd mapa-pojec.svg mapa-pojec.drawio
"""
import base64, json, math, re, sys
from xml.sax.saxutils import escape

mmd, svg, out = sys.argv[1:4]
src = open(mmd, encoding="utf-8").read()
s = open(svg, encoding="utf-8").read()

def q(t): return escape(t, {'"': "&quot;"})

labels = dict(re.findall(r'^\s+([a-z0-9]+)\("([^"]+)"\)', src, re.M))
groups = dict(re.findall(r'^\s+subgraph ([A-Z]+)\["([^"]+)"\]', src, re.M))
member = {}
cur = None
for line in src.splitlines():
    m = re.match(r'\s+subgraph ([A-Z]+)', line)
    if m: cur = m.group(1); continue
    if line.strip() == "end": cur = None; continue
    m = re.match(r'\s+([a-z0-9]+)\("', line)
    if m and cur: member[m.group(1)] = cur
styles = dict(re.findall(r'^\s+style ([A-Z]+) fill:(#[0-9A-Fa-f]{6}),stroke:(#[0-9A-Fa-f]{6})', src, re.M) and
              [(g, (f, st)) for g, f, st in re.findall(r'^\s+style ([A-Z]+) fill:(#[0-9A-Fa-f]{6}),stroke:(#[0-9A-Fa-f]{6})', src, re.M)])
edges = re.findall(r'^\s+([a-z0-9]+) -->\|([^|]+)\| ([a-z0-9]+)$', src, re.M)

vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', s).group(1).split()]
OX, OY = -vb[0] + 20, -vb[1] + 150  # margines i miejsce na tytuł

cells, geo = [], {}
for gid, x, y, w, h in re.findall(r'<g class="cluster[^"]*" id="my-svg-([A-Z]+)"[^>]*><rect[^>]*x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"', s):
    x, y, w, h = float(x) + OX, float(y) + OY, float(w), float(h)
    fill, stroke = styles[gid]
    geo[gid] = (x, y, w, h)
    cells.append(f'<mxCell id="g_{gid}" value="{q(groups[gid])}" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;container=1;collapsible=0;'
                 f'fillColor={fill};strokeColor={stroke};strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=22;fontColor=#1F2933;fontFamily=Arial;" '
                 f'vertex="1" parent="1"><mxGeometry x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" as="geometry"/></mxCell>')
for nid, tx, ty, body in re.findall(r'<g class="node[^"]*" id="my-svg-flowchart-([a-z0-9]+)-\d+"[^>]*transform="translate\(([-\d.]+), ([-\d.]+)\)">(.*?)</g>', s, re.S):
    r = re.search(r'x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"', body)
    x, y = float(tx) + float(r.group(1)) + OX, float(ty) + float(r.group(2)) + OY
    w, h = float(r.group(3)), float(r.group(4))
    geo[nid] = (x, y, w, h)
    g = member[nid]
    px, py = geo[g][:2]
    cells.append(f'<mxCell id="{nid}" value="{q(labels[nid])}" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FFFFFF;'
                 f'strokeColor={styles[g][1]};strokeWidth=2;fontSize=22;fontColor=#1F2933;fontFamily=Arial;" vertex="1" parent="g_{g}">'
                 f'<mxGeometry x="{x - px:.1f}" y="{y - py:.1f}" width="{w:.1f}" height="{h:.1f}" as="geometry"/></mxCell>')
assert set(labels) <= set(geo), set(labels) - set(geo)

lab_pos = {did: (float(x) + OX, float(y) + OY) for x, y, did in
           re.findall(r'<g class="edgeLabel" transform="translate\(([-\d.]+), ([-\d.]+)\)"><g class="label" data-id="([^"]+)"', s)}
paths = {did: json.loads(base64.b64decode(p)) for did, p in re.findall(r'data-id="(L_[^"]+)" data-points="([^"]+)"', s)}
seen = {}
for i, (a, text, b) in enumerate(edges):
    k = seen.get((a, b), 0); seen[(a, b)] = k + 1
    did = f"L_{a}_{b}_{k}"
    pts = [(p["x"] + OX, p["y"] + OY) for p in paths[did]]
    def rel(n, p):
        x, y, w, h = geo[n]
        return min(max((p[0] - x) / w, 0), 1), min(max((p[1] - y) / h, 0), 1)
    ex, ey = rel(a, pts[0]); nx, ny = rel(b, pts[-1])
    # punkt środkowy łamanej, względem niego draw.io liczy położenie etykiety
    segs = list(zip(pts, pts[1:])); L = sum(math.dist(p, r) for p, r in segs); acc = 0
    for p, r in segs:
        d = math.dist(p, r)
        if acc + d >= L / 2:
            t = (L / 2 - acc) / d if d else 0
            mid = (p[0] + (r[0] - p[0]) * t, p[1] + (r[1] - p[1]) * t); break
        acc += d
    lx, ly = lab_pos[did]
    way = "".join(f'<mxPoint x="{x:.1f}" y="{y:.1f}"/>' for x, y in pts[1:-1])
    cells.append(f'<mxCell id="e{i}" value="{q(text)}" style="endArrow=block;endFill=1;endSize=8;rounded=1;arcSize=10;html=1;strokeColor=#59636E;strokeWidth=1.5;'
                 f'fontSize=20;fontColor=#2F3A45;fontFamily=Arial;labelBackgroundColor=#FFFFFF;'
                 f'exitX={ex:.3f};exitY={ey:.3f};exitDx=0;exitDy=0;entryX={nx:.3f};entryY={ny:.3f};entryDx=0;entryDy=0;" '
                 f'edge="1" parent="1" source="{a}" target="{b}"><mxGeometry relative="1" as="geometry">'
                 f'<mxPoint x="{lx - mid[0]:.1f}" y="{ly - mid[1]:.1f}" as="offset"/>'
                 + (f'<Array as="points">{way}</Array>' if way else "") + '</mxGeometry></mxCell>')

W = vb[2] + 40
cells.insert(0, f'<mxCell id="title" value="Mapa pojęć TuttiTrip" style="text;html=1;fontSize=44;fontStyle=1;fontColor=#1F2933;fontFamily=Arial;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="900" height="60" as="geometry"/></mxCell>')
cells.insert(1, f'<mxCell id="subtitle" value="Hasła ze słownika pojęć w 7 grupach. Strzałki to relacje wynikające z definicji." style="text;html=1;fontSize=26;fontColor=#4A5561;fontFamily=Arial;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="20" y="80" width="1400" height="40" as="geometry"/></mxCell>')
xml = ('<mxfile host="app.diagrams.net"><diagram id="mapa-pojec" name="Mapa pojęć"><mxGraphModel dx="1600" dy="1200" grid="0" gridSize="10" guides="1" '
       'tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="2100" pageHeight="4200" background="#FFFFFF" math="0" shadow="0">'
       '<root><mxCell id="0"/><mxCell id="1" parent="0"/>' + "\n".join(cells) + '</root></mxGraphModel></diagram></mxfile>\n')
open(out, "w", encoding="utf-8").write(xml)
print(f"{out}: {len(geo) - len(groups)} węzłów, {len(edges)} krawędzi")
