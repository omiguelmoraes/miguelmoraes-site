from PIL import Image, ImageDraw, ImageFont
import os, sys

SRC = os.path.expanduser('~/Dev/miguelmoraes-site/public/webp/avatar.webp')
FONT = os.path.expanduser('~/Library/Fonts/RethinkSans-VariableFont_wght.ttf')
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Dev/miguelmoraes-site/public/og.png')

W, H = 1200, 630
BG = (255, 255, 255)
TITLE = (17, 17, 17)          # --color-title
AVATAR = 180
GAP = 36
NAME_SIZE = 64
SS = 4                        # supersampling do squircle


def squircle_mask(size, n=4.0, ss=SS):
    big = size * ss
    mask = Image.new('L', (big, big), 0)
    px = mask.load()
    r = big / 2.0
    for y in range(big):
        ny = abs((y + 0.5 - r) / r) ** n
        if ny > 1:
            continue
        half = ((1 - ny) ** (1 / n)) * r
        for x in range(max(0, int(round(r - half))), min(big, int(round(r + half)))):
            px[x, y] = 255
    return mask.resize((size, size), Image.LANCZOS)


img = Image.open(SRC).convert('RGB')
w, h = img.size
s = min(w, h)
img = img.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s))
avatar = img.resize((AVATAR, AVATAR), Image.LANCZOS).convert('RGBA')
avatar.putalpha(squircle_mask(AVATAR))

font = ImageFont.truetype(FONT, NAME_SIZE)
try:
    font.set_variation_by_axes([500])
except Exception:
    pass

canvas = Image.new('RGB', (W, H), BG)
draw = ImageDraw.Draw(canvas)

name = 'Miguel Moraes'
box = draw.textbbox((0, 0), name, font=font)
tw, th = box[2] - box[0], box[3] - box[1]

group_w = AVATAR + GAP + tw
x = (W - group_w) // 2
y_center = H // 2

canvas.paste(avatar, (x, y_center - AVATAR // 2), avatar)
draw.text((x + AVATAR + GAP - box[0], y_center - th // 2 - box[1]), name, font=font, fill=TITLE)

canvas.save(OUT)
print(OUT)
