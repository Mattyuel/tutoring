#!/usr/bin/env python3
"""Convert SVG diagrams to greyscale (dark and light shading only).

    python3 tools/greyscale-svg.py worksheets/**/diagrams/*.svg

Every hex colour becomes a grey of the same perceived brightness, so light areas stay
light and dark areas stay dark. Text is kept dark enough to read on white (unless it
was white, i.e. text on a dark fill). Re-running on an already-grey file changes nothing.
"""
import re, sys

def lum(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return round(0.2126 * r + 0.7152 * g + 0.0722 * b)

def grey(v):
    v = max(0, min(255, v))
    return '#%02x%02x%02x' % (v, v, v)

def convert_tag(tag):
    is_text = re.match(r'<\s*(text|tspan)\b', tag) is not None
    def sub_attr(m):
        attr, val = m.group(1), m.group(2)
        L = lum(val)
        if is_text and attr == 'fill' and L < 250:
            L = min(L, 70)          # readable text
        return f'{attr}="{grey(L)}"'
    tag = re.sub(r'\b(fill|stroke|stop-color|color)="(#[0-9a-fA-F]{3,6})"', sub_attr, tag)
    return tag

def convert(svg):
    return re.sub(r'<[^>]+>', lambda m: convert_tag(m.group(0)), svg)

for path in sys.argv[1:]:
    s = open(path).read()
    t = convert(s)
    if t != s:
        open(path, 'w').write(t)
        print('greyscale:', path)
