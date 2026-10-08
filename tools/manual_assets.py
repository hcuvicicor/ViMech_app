# Copias reducidas de las imágenes para el manual PDF (máx. 1100 px, JPEG/PNG optimizado)
import os, re, sys
from PIL import Image
src_root, out_root, html = sys.argv[1], sys.argv[2], sys.argv[3]
refs = sorted(set(re.findall(r"assets/[^'\"`]*?\.(?:png|jpg|jpeg|webp|gif)", open(html, encoding='utf-8').read())))
n = 0
for r in refs:
    src = os.path.join(src_root, r); dst = os.path.join(out_root, r)
    if not os.path.exists(src): print('missing', r); continue
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(src); im.thumbnail((1100, 1100))
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        if im.getextrema()[3][0] < 250:   # transparencia real: PNG cuantizado
            im.quantize(colors=256, method=Image.FASTOCTREE).save(dst, format='PNG', optimize=True); n += 1; continue
    if True:  # sin transparencia: JPEG (el navegador detecta el formato por contenido)
        im.convert('RGB').save(dst, format='JPEG', quality=80, optimize=True)
    n += 1
print('ok', n)
