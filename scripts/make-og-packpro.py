from PIL import Image, ImageDraw, ImageFont
import os, sys

FONT = os.path.expanduser('~/Library/Fonts/InterTight[wght].ttf')
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Dev/miguelmoraes-site/public/og-packpro.png')

W, H = 1200, 630
BG = (5, 5, 5)                # --bg
TEXT = (255, 255, 255)        # --text
MUTED = (119, 119, 119)       # --muted
ACCENT = (232, 72, 32)        # --accent

SAFE = H                      # corte quadrado central que LinkedIn e afins fazem
TITLE_SIZE = 64
TITLE_SPACING = 10
EYEBROW_SIZE = 24
FOOT_SIZE = 26
DOT = 5


def font_at(size, weight):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


canvas = Image.new('RGB', (W, H), BG)
draw = ImageDraw.Draw(canvas)

title_font = font_at(TITLE_SIZE, 700)
eyebrow_font = font_at(EYEBROW_SIZE, 500)
foot_font = font_at(FOOT_SIZE, 500)

# Tudo centralizado e dentro da faixa quadrada do meio: fora dela o
# compartilhamento corta, e o título é o que não pode se perder. Por isso o
# texto quebra em três linhas curtas em vez de duas largas
title = 'Cobre mais\nsem o cliente\nquestionar.'
eyebrow = 'TEMPLATES PARA FREELANCERS'
foot = 'Contrato · Proposta · Orçamento no Figma'

tbox = draw.multiline_textbbox((0, 0), title, font=title_font,
                               spacing=TITLE_SPACING, align='center')
tw, th = tbox[2] - tbox[0], tbox[3] - tbox[1]

ebox = draw.textbbox((0, 0), eyebrow, font=eyebrow_font)
ew, eh = ebox[2] - ebox[0], ebox[3] - ebox[1]

fbox = draw.textbbox((0, 0), foot, font=foot_font)
fw, fh = fbox[2] - fbox[0], fbox[3] - fbox[1]

GAP_EYEBROW = 30
GAP_FOOT = 38
total = eh + GAP_EYEBROW + th + GAP_FOOT + fh
y = (H - total) // 2

# Eyebrow com o mesmo bullet que abre a hero da página
group_w = DOT * 2 + 12 + ew
x = (W - group_w) // 2
cy = y + eh // 2
draw.ellipse((x, cy - DOT, x + DOT * 2, cy + DOT), fill=ACCENT)
draw.text((x + DOT * 2 + 12 - ebox[0], y - ebox[1]), eyebrow,
          font=eyebrow_font, fill=ACCENT)
y += eh + GAP_EYEBROW

draw.multiline_text((W // 2, y - tbox[1]), title, font=title_font, fill=TEXT,
                    spacing=TITLE_SPACING, align='center', anchor='ma')
y += th + GAP_FOOT

draw.text(((W - fw) // 2 - fbox[0], y - fbox[1]), foot, font=foot_font, fill=MUTED)

canvas.save(OUT)

widest = max(tw, group_w, fw)
print(f'{OUT}  (elemento mais largo: {widest}px / {SAFE}px de área segura)')
if widest > SAFE:
    print('AVISO: estoura o corte quadrado')
