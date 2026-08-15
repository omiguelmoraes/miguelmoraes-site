from PIL import Image, ImageDraw
import os

SRC = os.path.expanduser('~/Dev/miguelmoraes-site/public/webp/avatar.webp')
OUT = os.path.expanduser('~/Dev/miguelmoraes-site/public')

img = Image.open(SRC).convert('RGB')
w, h = img.size
s = min(w, h)
img = img.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s))


def squircle_mask(size, n=4.0, ss=8):
    """Superelipse |x|^n + |y|^n = 1 — o squircle de ícone de app."""
    big = size * ss
    mask = Image.new('L', (big, big), 0)
    px = mask.load()
    r = big / 2.0
    for y in range(big):
        ny = abs((y + 0.5 - r) / r) ** n
        if ny > 1:
            continue
        # resolve |x|^n <= 1 - ny
        half = ((1 - ny) ** (1 / n)) * r
        x0 = int(round(r - half))
        x1 = int(round(r + half))
        for x in range(max(0, x0), min(big, x1)):
            px[x, y] = 255
    return mask.resize((size, size), Image.LANCZOS)


def squircled(size):
    out = img.resize((size, size), Image.LANCZOS).convert('RGBA')
    out.putalpha(squircle_mask(size))
    return out


# favicon.png — aba do browser
squircled(180).save(os.path.join(OUT, 'favicon.png'))

# favicon.ico — fallback que o browser pede sozinho na raiz
base = squircled(64)
base.save(os.path.join(OUT, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])

# apple-touch-icon — o iOS aplica a própria máscara, então vai quadrado
img.resize((180, 180), Image.LANCZOS).save(os.path.join(OUT, 'apple-touch-icon.png'))

print('ok')
