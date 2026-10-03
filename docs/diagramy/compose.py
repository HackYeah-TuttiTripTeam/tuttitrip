"""Składa wyrenderowane części w dwa PNG o szerokości 2000 px (wywołuje go render.sh)."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

WIDTH = 2000
GAP = 60  # odstęp między częściami (piksele w skali 2x)
HERE = Path(__file__).parent


def font(size, bold=False):
    names = (["LiberationSans-Bold.ttf", "DejaVuSans-Bold.ttf", "Arial Bold.ttf"] if bold
             else ["LiberationSans-Regular.ttf", "DejaVuSans.ttf", "Arial.ttf"])
    for base in ["/usr/share/fonts", "/usr/local/share/fonts", "/Library/Fonts", "C:/Windows/Fonts"]:
        for name in names:
            hit = next(Path(base).rglob(name), None) if Path(base).exists() else None
            if hit:
                return ImageFont.truetype(str(hit), size)
    return ImageFont.load_default(size)


def header(title, subtitle, width):
    img = Image.new("RGB", (width, 190), "white")
    d = ImageDraw.Draw(img)
    d.text((GAP, 40), title, font=font(64, True), fill="#1F2933")
    d.text((GAP, 125), subtitle, font=font(34), fill="#4A5561")
    return img


def stack(parts, width):
    h = sum(p.height for p in parts)
    out = Image.new("RGB", (width, h), "white")
    y = 0
    for p in parts:
        out.paste(p, (0, y))
        y += p.height
    return out


def row(images, width):
    h = max(i.height for i in images)
    out = Image.new("RGB", (width, h + GAP), "white")
    x = GAP
    for i in images:
        out.paste(i, (x, 0))
        x += i.width + GAP
    return out


def save(img, name):
    img = img.resize((WIDTH, round(img.height * WIDTH / img.width)), Image.LANCZOS)
    img.save(HERE / name, optimize=True)
    print(f"{name}: {img.width}x{img.height}")


def concept_map(tmp):
    m = Image.open(tmp / "mapa-pojec.png").convert("RGB")
    width = m.width + 2 * GAP
    body = Image.new("RGB", (width, m.height + GAP), "white")
    body.paste(m, (GAP, 0))
    save(stack([header("Mapa pojęć TuttiTrip",
                       "Hasła ze słownika pojęć w 7 grupach; strzałki to relacje z definicji.", width), body], width),
         "mapa-pojec.png")


def use_cases(tmp):
    uc = {p.stem.split("-", 1)[1]: Image.open(p).convert("RGB") for p in sorted((tmp / "uc").glob("*.png"))}
    rest = ["podr", "miej", "pref", "konto", "plan", "wyd", "admin", "trip"]
    cols, heights = [[], []], [0, 0]
    for key in rest:  # dwie kolumny, kolejna część trafia do niższej
        c = heights.index(min(heights))
        cols[c].append(uc[key])
        heights[c] += uc[key].height + GAP
    colw = [max(i.width for i in c) for c in cols]
    width = max(sum(colw) + 3 * GAP, uc["alg"].width + 2 * GAP,
                uc["aktorzy"].width + uc["legenda"].width + 3 * GAP)
    grid = Image.new("RGB", (width, max(heights)), "white")
    x = GAP
    for c, w in zip(cols, colw):
        y = 0
        for i in c:
            grid.paste(i, (x, y))
            y += i.height + GAP
        x += w + GAP
    parts = [header("Mapa przypadków użycia TuttiTrip",
                    "Ramki to domeny systemu. Aktor jest rysowany przy każdej domenie, której dotyczy.", width),
             row([uc["aktorzy"], uc["legenda"]], width), row([uc["alg"]], width), grid]
    save(stack(parts, width), "mapa-przypadkow-uzycia.png")


if __name__ == "__main__":
    tmp = Path(sys.argv[1])
    concept_map(tmp)
    use_cases(tmp)
