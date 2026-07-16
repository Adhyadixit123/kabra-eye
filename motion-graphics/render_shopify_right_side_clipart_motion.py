from __future__ import annotations

import math
import os
import random
import shutil
import subprocess
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "right_side_clipart_frames"
OUT = ROOT / "shopify-right-side-clipart-motion.mp4"
POSTER = ROOT / "shopify-right-side-clipart-motion-poster.png"
AUDIO = ROOT / "right-side-clipart-sound-bed.wav"

W, H = 1920, 1080
FPS = 30
DURATION = 18.0
TOTAL_FRAMES = int(FPS * DURATION)

DIVIDER_TOP = 1160
DIVIDER_BOTTOM = 760
SAFE_X = 1010
SAFE_RIGHT = 1845
SAFE_W = SAFE_RIGHT - SAFE_X

BLACK = (0, 0, 0)
INK = (38, 31, 25)
INK_SOFT = (84, 70, 54)
PAPER = (224, 202, 161)
PAPER_SHADOW = (170, 132, 84)
GOLD = (255, 194, 0)
GOLD_DARK = (199, 126, 0)
GREEN = (39, 132, 82)
TEAL = (39, 126, 126)
RED = (162, 57, 47)
BLUE = (61, 112, 176)
WHITE = (255, 244, 211)

FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_SERIF = "/System/Library/Fonts/Supplemental/Georgia.ttf"
FONT_SERIF_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_TYPE = "/System/Library/Fonts/Supplemental/AmericanTypewriter.ttc"


def font(size: int, kind: str = "sans", bold: bool = False) -> ImageFont.FreeTypeFont:
    if kind == "serif":
        return ImageFont.truetype(FONT_SERIF_BOLD if bold else FONT_SERIF, size=size)
    if kind == "type":
        return ImageFont.truetype(FONT_TYPE, size=size)
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size=size)


F = {
    "tiny": font(24, "type"),
    "small": font(29, "type"),
    "body": font(34, "type"),
    "body_b": font(34, "sans", True),
    "mid": font(46, "serif", True),
    "large": font(58, "serif", True),
    "hero": font(78, "serif", True),
}


def clamp(v: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, v))


def ease(v: float) -> float:
    v = clamp(v)
    return 1 - (1 - v) ** 3


def ease_io(v: float) -> float:
    v = clamp(v)
    return 0.5 - 0.5 * math.cos(math.pi * v)


def rgba(c: tuple[int, int, int], a: int) -> tuple[int, int, int, int]:
    return (*c, max(0, min(255, int(a))))


def scene_alpha(t: float, start: float, end: float, fade: float = 0.55) -> float:
    return clamp((t - start) / fade) * clamp((end - t) / fade)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont) -> tuple[int, int]:
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def wrap_text(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if not current or text_size(draw, candidate, fnt)[0] <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_centered_lines(
    draw: ImageDraw.ImageDraw,
    center_x: int,
    y: int,
    lines: list[str],
    fnt: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    gap: int = 10,
):
    yy = y
    for line in lines:
        draw.text((center_x, yy), line, font=fnt, fill=fill, anchor="ma")
        yy += fnt.size + gap
    return yy


def make_paper_texture() -> Image.Image:
    rng = np.random.default_rng(43)
    tw, th = 2450, 1350
    y = np.linspace(0, 1, th)[:, None]
    x = np.linspace(0, 1, tw)[None, :]
    base = np.zeros((th, tw, 3), dtype=np.float32)
    paper = np.array(PAPER, dtype=np.float32)
    shadow = np.array(PAPER_SHADOW, dtype=np.float32)
    base[:] = paper
    vignette = ((x - 0.48) ** 2 + (y - 0.5) ** 2) * 1.25
    base = base * (1 - vignette[..., None] * 0.25) + shadow * vignette[..., None] * 0.25
    base += rng.normal(0, 8, (th, tw, 1))
    base += (np.sin((x * 23 + y * 8) * math.pi) * 3)[..., None]
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").convert("RGBA")

    wrinkles = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    wd = ImageDraw.Draw(wrinkles)
    local = random.Random(11)
    for _ in range(32):
        x0 = local.randint(-80, tw + 80)
        y0 = local.randint(-80, th + 80)
        angle = local.uniform(-0.7, 0.7)
        length = local.randint(260, 820)
        pts = []
        for i in range(8):
            dist = length * i / 7
            pts.append(
                (
                    x0 + math.cos(angle) * dist + local.randint(-20, 20),
                    y0 + math.sin(angle) * dist + local.randint(-20, 20),
                )
            )
        wd.line(pts, fill=(80, 51, 22, local.randint(16, 32)), width=local.randint(1, 4))
        wd.line([(px + 5, py - 5) for px, py in pts], fill=(255, 239, 189, local.randint(12, 26)), width=1)
    img.alpha_composite(wrinkles.filter(ImageFilter.GaussianBlur(1.1)))
    return img


PAPER_TEXTURE = make_paper_texture()


def paper_crop(t: float) -> Image.Image:
    max_x = PAPER_TEXTURE.width - W
    x = int(max_x * (0.5 + 0.5 * math.sin(t * 0.12)))
    y = int(70 + 40 * math.cos(t * 0.15))
    return PAPER_TEXTURE.crop((x, y, x + W, y + H)).copy()


def panel_mask() -> Image.Image:
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    d.polygon([(DIVIDER_TOP, 0), (W, 0), (W, H), (DIVIDER_BOTTOM, H)], fill=255)
    return mask


PANEL_MASK = panel_mask()


def draw_background(t: float) -> Image.Image:
    img = Image.new("RGBA", (W, H), BLACK + (255,))
    paper = paper_crop(t)
    img.alpha_composite(Image.composite(paper, Image.new("RGBA", (W, H), (0, 0, 0, 0)), PANEL_MASK))

    d = ImageDraw.Draw(img)
    d.line((DIVIDER_TOP - 10, -80, DIVIDER_BOTTOM - 10, H + 80), fill=(0, 0, 0, 180), width=18)
    d.line((DIVIDER_TOP + 10, -80, DIVIDER_BOTTOM + 10, H + 80), fill=rgba((119, 91, 49), 58), width=4)
    d.rectangle((0, 0, W, 24), fill=(35, 24, 9, 55))
    d.rectangle((0, H - 24, W, H), fill=(35, 24, 9, 55))
    return img


def right_layer() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    return layer, ImageDraw.Draw(layer)


def composite_right(base: Image.Image, layer: Image.Image):
    base.alpha_composite(Image.composite(layer, Image.new("RGBA", (W, H), (0, 0, 0, 0)), PANEL_MASK))


def line_draw(draw: ImageDraw.ImageDraw, pts, progress: float, fill, width=6):
    progress = clamp(progress)
    if progress <= 0:
        return
    lengths = []
    total = 0.0
    for a, b in zip(pts, pts[1:]):
        length = math.hypot(b[0] - a[0], b[1] - a[1])
        lengths.append(length)
        total += length
    remaining = total * progress
    for (a, b), length in zip(zip(pts, pts[1:]), lengths):
        if remaining <= 0:
            break
        if remaining >= length:
            draw.line((*a, *b), fill=fill, width=width)
            remaining -= length
            continue
        r = remaining / length
        p = (a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r)
        draw.line((*a, *p), fill=fill, width=width)
        break


def stamp(draw: ImageDraw.ImageDraw, center, text: str, a: int, color=GREEN, scale=1.0, angle=-6):
    w, h = int(300 * scale), int(86 * scale)
    stamp_img = Image.new("RGBA", (w + 42, h + 42), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stamp_img)
    box = (21, 21, w + 21, h + 21)
    sd.rounded_rectangle(box, radius=int(12 * scale), outline=rgba(color, a), width=max(2, int(6 * scale)))
    sd.text((w / 2 + 21, h / 2 + 21), text.upper(), font=font(int(29 * scale), "type"), fill=rgba(color, a), anchor="mm")
    noise = np.array(Image.effect_noise(stamp_img.size, 38).convert("L"), dtype=np.float32)
    alpha = np.array(stamp_img.getchannel("A"), dtype=np.float32)
    alpha *= 0.78 + (noise / 255.0) * 0.22
    stamp_img.putalpha(Image.fromarray(np.clip(alpha, 0, 255).astype(np.uint8)))
    rot = stamp_img.rotate(angle, expand=True, resample=Image.Resampling.BICUBIC)
    draw.bitmap((int(center[0] - rot.width / 2), int(center[1] - rot.height / 2)), rot)


def draw_shopify_bag(draw: ImageDraw.ImageDraw, cx: int, cy: int, s: float, a: int):
    w, h = int(138 * s), int(130 * s)
    x, y = cx - w // 2, cy - h // 2
    draw.rounded_rectangle((x, y + int(28 * s), x + w, y + h), radius=int(20 * s), fill=rgba(GREEN, a), outline=rgba(INK, int(a * 0.55)), width=max(2, int(4 * s)))
    draw.arc((x + int(34 * s), y, x + int(104 * s), y + int(72 * s)), 190, 350, fill=rgba(WHITE, a), width=max(2, int(7 * s)))
    draw.polygon(
        [
            (x + int(24 * s), y + int(55 * s)),
            (x + int(118 * s), y + int(55 * s)),
            (x + int(130 * s), y + int(88 * s)),
            (x + int(12 * s), y + int(88 * s)),
        ],
        fill=rgba((62, 158, 96), a),
    )
    draw.text((cx, cy + int(31 * s)), "$", font=font(max(18, int(54 * s)), "sans", True), fill=rgba(WHITE, a), anchor="mm")


def draw_person(draw: ImageDraw.ImageDraw, x: int, y: int, s: float, a: int, color=BLUE):
    draw.ellipse((x - 24 * s, y - 72 * s, x + 24 * s, y - 24 * s), fill=rgba((239, 191, 139), a), outline=rgba(INK, int(a * 0.5)), width=max(1, int(3 * s)))
    draw.rounded_rectangle((x - 42 * s, y - 22 * s, x + 42 * s, y + 62 * s), radius=int(18 * s), fill=rgba(color, a), outline=rgba(INK, int(a * 0.48)), width=max(1, int(3 * s)))
    draw.line((x - 62 * s, y + 2 * s, x - 98 * s, y + 44 * s), fill=rgba(INK, int(a * 0.65)), width=max(2, int(5 * s)))
    draw.line((x + 62 * s, y + 2 * s, x + 98 * s, y + 44 * s), fill=rgba(INK, int(a * 0.65)), width=max(2, int(5 * s)))


def draw_storefront(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, a: int):
    draw.rounded_rectangle((x, y + 58, x + w, y + h), radius=12, fill=rgba((242, 217, 169), int(a * 0.8)), outline=rgba(INK, int(a * 0.55)), width=4)
    draw.rectangle((x + 26, y + 112, x + w - 26, y + h - 28), fill=rgba((249, 230, 186), int(a * 0.72)), outline=rgba(INK_SOFT, int(a * 0.38)), width=3)
    stripe_w = w // 5
    colors = [RED, WHITE, RED, WHITE, RED]
    for i, c in enumerate(colors):
        draw.pieslice((x + i * stripe_w, y, x + (i + 1) * stripe_w + 18, y + 112), 0, 180, fill=rgba(c, int(a * 0.9)), outline=rgba(INK, int(a * 0.25)))
        draw.rectangle((x + i * stripe_w, y + 55, x + (i + 1) * stripe_w + 12, y + 92), fill=rgba(c, int(a * 0.9)))
    draw.text((x + w / 2, y + h - 58), "SHOPIFY", font=F["small"], fill=rgba(GREEN, a), anchor="mm")


def draw_open_book(draw: ImageDraw.ImageDraw, cx: int, cy: int, s: float, a: int, page=1.0):
    w, h = int(410 * s), int(250 * s)
    x, y = cx - w // 2, cy - h // 2
    draw.rounded_rectangle((x, y, cx + 8, y + h), radius=14, fill=rgba((249, 230, 186), a), outline=rgba(INK, int(a * 0.55)), width=4)
    draw.rounded_rectangle((cx - 8, y, x + w, y + h), radius=14, fill=rgba((244, 219, 171), a), outline=rgba(INK, int(a * 0.55)), width=4)
    draw.line((cx, y + 12, cx, y + h - 10), fill=rgba(INK_SOFT, int(a * 0.42)), width=3)
    for i, label in enumerate(["BUILD", "OPTIMIZE", "SCALE"]):
        p = ease((page - i * 0.22) / 0.38)
        if p <= 0:
            continue
        yy = y + 52 + i * 54
        draw.line((x + 46, yy, x + 166 * s, yy), fill=rgba(INK_SOFT, int(a * p)), width=3)
        draw.text((cx + 42, yy - 16), label, font=font(int(27 * s), "type"), fill=rgba([BLUE, GOLD_DARK, GREEN][i], int(a * p)))


def arrow(draw: ImageDraw.ImageDraw, start, end, progress: float, fill=GREEN, width=7):
    sx, sy = start
    ex, ey = end
    p = ease(progress)
    px = sx + (ex - sx) * p
    py = sy + (ey - sy) * p
    draw.line((sx, sy, px, py), fill=rgba(fill, 215), width=width)
    if p > 0.9:
        ang = math.atan2(ey - sy, ex - sx)
        size = width * 4
        pts = [
            (ex, ey),
            (ex - math.cos(ang - 0.48) * size, ey - math.sin(ang - 0.48) * size),
            (ex - math.cos(ang + 0.48) * size, ey - math.sin(ang + 0.48) * size),
        ]
        draw.polygon(pts, fill=rgba(fill, 225))


def scene_title(base: Image.Image, t: float):
    a = scene_alpha(t, 0.0, 4.4)
    if a <= 0:
        return
    local = t
    layer, d = right_layer()
    p = ease(local / 1.2)
    yoff = int((1 - p) * 42)
    draw_storefront(d, 1345, 555 + int(math.sin(t * 2.0) * 5), 360, 250, int(230 * a))
    draw_shopify_bag(d, 1720, 514 + int(math.sin(t * 2.4) * 10), 0.98, int(235 * a))
    d.text((1452, 164 + yoff), "SHOPIFY", font=F["hero"], fill=rgba(GREEN, int(255 * a)), anchor="mm")
    d.text((1452, 262 + yoff), "PLAYBOOK", font=F["hero"], fill=rgba(INK, int(245 * a)), anchor="mm")
    lines = wrap_text(d, "CLIPART EXPLAINER FOR GROWTH-FOCUSED BRANDS", F["body"], 560)
    draw_centered_lines(d, 1452, 374 + yoff, lines, F["body"], rgba(INK_SOFT, int(230 * a)), gap=6)
    composite_right(base, layer)


def scene_proof(base: Image.Image, t: float):
    a = scene_alpha(t, 3.8, 8.0)
    if a <= 0:
        return
    local = t - 3.8
    layer, d = right_layer()
    d.text((1510, 142), "AFTER WORKING WITH", font=F["mid"], fill=rgba(INK_SOFT, int(230 * a)), anchor="mm")
    d.text((1510, 218), "INDUSTRY LEADERS", font=F["large"], fill=rgba(INK, int(245 * a)), anchor="mm")
    d.text((1510, 304), "MULTI-MILLION", font=F["large"], fill=rgba(GREEN, int(245 * a)), anchor="mm")
    d.text((1510, 388), "DOLLAR BRANDS", font=F["large"], fill=rgba(GREEN, int(245 * a)), anchor="mm")
    draw_person(d, 1648, 478, 0.95, int(220 * a), BLUE)
    draw_person(d, 1755, 504, 0.82, int(205 * a), TEAL)
    draw_person(d, 1544, 510, 0.82, int(205 * a), RED)
    base_y = 780
    bars = [86, 142, 205, 280]
    for i, h in enumerate(bars):
        p = ease((local - 0.5 - i * 0.22) / 0.55)
        x = 1195 + i * 132
        d.rounded_rectangle((x, base_y - h * p, x + 78, base_y), radius=10, fill=rgba([BLUE, GOLD_DARK, TEAL, GREEN][i], int(215 * a)), outline=rgba(INK, int(90 * a)), width=3)
    line_draw(d, [(1190, 800), (1320, 735), (1450, 705), (1590, 620), (1740, 552)], ease((local - 1.05) / 1.25), rgba(INK, int(210 * a)), 6)
    for i, (x, y) in enumerate([(1190, 800), (1320, 735), (1450, 705), (1590, 620), (1740, 552)]):
        p = ease((local - 1.1 - i * 0.14) / 0.25)
        if p > 0:
            r = 13 + 7 * p
            d.ellipse((x - r, y - r, x + r, y + r), fill=rgba(GOLD, int(230 * a * p)), outline=rgba(INK, int(120 * a * p)), width=3)
    composite_right(base, layer)


def scene_playbook(base: Image.Image, t: float):
    a = scene_alpha(t, 7.4, 12.2)
    if a <= 0:
        return
    local = t - 7.4
    layer, d = right_layer()
    d.text((1450, 145), "WE KNOW THE", font=F["mid"], fill=rgba(INK_SOFT, int(220 * a)), anchor="mm")
    d.text((1450, 220), "SHOPIFY PLAYBOOK", font=F["large"], fill=rgba(INK, int(245 * a)), anchor="mm")
    draw_open_book(d, 1450, 488, 1.28, int(235 * a), ease((local - 0.3) / 1.5))
    steps = [("01", "Build"), ("02", "Optimize"), ("03", "Scale")]
    for i, (num, label) in enumerate(steps):
        p = ease((local - 0.55 - i * 0.34) / 0.55)
        if p <= 0:
            continue
        x = 1125 + i * 260
        y = 762 + int((1 - p) * 38)
        d.rounded_rectangle((x, y, x + 205, y + 112), radius=8, fill=rgba((236, 211, 164), int(175 * a * p)), outline=rgba(INK, int(110 * a * p)), width=3)
        d.text((x + 24, y + 20), num, font=F["small"], fill=rgba(GOLD_DARK, int(220 * a * p)))
        d.text((x + 102, y + 72), label, font=F["body_b"], fill=rgba(INK, int(235 * a * p)), anchor="mm")
        if i < 2:
            arrow(d, (x + 210, y + 58), (x + 250, y + 58), (local - 1.05 - i * 0.33) / 0.45, TEAL, 5)
    composite_right(base, layer)


def scene_fiverr(base: Image.Image, t: float):
    a = scene_alpha(t, 11.3, 15.4)
    if a <= 0:
        return
    local = t - 11.3
    layer, d = right_layer()
    d.text((1510, 170), "BETTER THAN ANYONE", font=F["large"], fill=rgba(INK, int(245 * a)), anchor="mm")
    d.text((1510, 252), "ON FIVERR", font=F["large"], fill=rgba(GREEN, int(245 * a)), anchor="mm")
    d.text((1510, 360), "BECAUSE THE PROCESS IS TESTED,", font=F["body"], fill=rgba(INK_SOFT, int(220 * a)), anchor="mm")
    d.text((1510, 414), "NOT GUESSED.", font=F["body"], fill=rgba(INK_SOFT, int(220 * a)), anchor="mm")

    x, y, w, h = 1275, 545, 520, 315
    d.rounded_rectangle((x, y, x + w, y + h), radius=16, fill=rgba((247, 226, 184), int(220 * a)), outline=rgba(INK, int(120 * a)), width=4)
    d.rectangle((x, y, x + w, y + 64), fill=rgba((225, 194, 139), int(190 * a)))
    d.text((x + 32, y + 33), "MARKETPLACE SEARCH", font=F["tiny"], fill=rgba(INK_SOFT, int(210 * a)), anchor="lm")
    for i, label in enumerate(["RANDOM GIG", "TEMPLATE WORK", "OUR PLAYBOOK"]):
        yy = y + 104 + i * 68
        p = ease((local - 0.5 - i * 0.24) / 0.45)
        if p <= 0:
            continue
        color = GREEN if i == 2 else INK_SOFT
        d.rounded_rectangle((x + 30, yy, x + w - 30, yy + 44), radius=8, fill=rgba((255, 240, 202), int(190 * a * p)), outline=rgba(color, int((90 if i < 2 else 170) * a * p)), width=3)
        d.text((x + 54, yy + 22), label, font=F["small"], fill=rgba(color, int(230 * a * p)), anchor="lm")
        if i == 2:
            stamp(d, (x + 405, yy + 21), "picked", int(170 * a * p), GREEN, 0.47, -5)
    draw_shopify_bag(d, 1760, 315 + int(math.sin(t * 2.0) * 8), 0.68, int(225 * a))
    composite_right(base, layer)


def scene_final(base: Image.Image, t: float):
    a = scene_alpha(t, 14.7, 18.0, 0.6)
    if a <= 0:
        return
    local = t - 14.7
    layer, d = right_layer()
    lines = ["INDUSTRY LEADERS.", "MULTI-MILLION", "DOLLAR BRANDS.", "THE SHOPIFY PLAYBOOK."]
    colors = [INK, GREEN, GREEN, INK]
    for i, line in enumerate(lines):
        p = ease((local - i * 0.28) / 0.55)
        if p <= 0:
            continue
        d.text((1510, 190 + i * 82 + int((1 - p) * 24)), line, font=F["mid"], fill=rgba(colors[i], int(245 * a * p)), anchor="mm")
    d.text((1510, 590), "EXPLAINED THROUGH", font=F["body"], fill=rgba(INK_SOFT, int(220 * a)), anchor="mm")
    d.text((1510, 650), "CLEAN CLIPART", font=F["large"], fill=rgba(GREEN, int(245 * a)), anchor="mm")
    d.text((1510, 724), "MOTION", font=F["large"], fill=rgba(GREEN, int(245 * a)), anchor="mm")
    if local > 1.0:
        stamp(d, (1450, 825), "fiverr ready", int(170 * a * ease((local - 1.0) / 0.3)), RED, 0.88, -4)
    composite_right(base, layer)


def add_film(img: Image.Image, t: float):
    rng = random.Random(int(t * FPS) + 91)
    d = ImageDraw.Draw(img)
    for _ in range(55):
        x = rng.randint(0, W)
        y = rng.randint(0, H)
        d.point((x, y), fill=(40, 25, 9, rng.randint(6, 22)))


def render_frame(i: int) -> Image.Image:
    t = i / FPS
    img = draw_background(t)
    scene_title(img, t)
    scene_proof(img, t)
    scene_playbook(img, t)
    scene_fiverr(img, t)
    scene_final(img, t)
    add_film(img, t)
    return img.convert("RGB")


def make_audio():
    sr = 44100
    n = int(DURATION * sr)
    t = np.arange(n) / sr
    rng = np.random.default_rng(33)
    audio = np.zeros(n, dtype=np.float32)
    audio += 0.013 * np.sin(2 * np.pi * 62 * t)
    audio += 0.007 * np.sin(2 * np.pi * 124 * t + 0.2)
    click_times = np.arange(0.35, DURATION, 0.42)
    for ct in click_times:
        ct += rng.uniform(-0.035, 0.035)
        start = int(ct * sr)
        length = int(0.045 * sr)
        if start + length >= n:
            continue
        env = np.exp(-np.linspace(0, 7.0, length))
        tone = np.sin(2 * np.pi * rng.uniform(560, 920) * np.arange(length) / sr)
        audio[start : start + length] += (tone * 0.055 + rng.normal(0, 0.035, length)) * env
    for ct in [1.35, 4.15, 7.9, 11.85, 15.7]:
        start = int(ct * sr)
        length = int(0.12 * sr)
        env = np.exp(-np.linspace(0, 5.5, length))
        audio[start : start + length] += rng.normal(0, 0.08, length) * env
    fade = int(0.55 * sr)
    audio[:fade] *= np.linspace(0, 1, fade)
    audio[-fade:] *= np.linspace(1, 0, fade)
    audio = np.tanh(audio * 1.7) * 0.48
    pcm = (audio * 32767).astype(np.int16)
    with wave.open(str(AUDIO), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())


def main():
    FRAMES.mkdir(exist_ok=True)
    for old in FRAMES.glob("frame_*.png"):
        old.unlink()

    preview_frames = {
        int(FPS * 1.8): ROOT / "right-side-clipart-preview-01.png",
        int(FPS * 5.9): ROOT / "right-side-clipart-preview-02.png",
        int(FPS * 9.7): ROOT / "right-side-clipart-preview-03.png",
        int(FPS * 13.2): ROOT / "right-side-clipart-preview-04.png",
        int(FPS * 16.2): ROOT / "right-side-clipart-preview-05.png",
    }
    for i in range(TOTAL_FRAMES):
        frame = render_frame(i)
        frame.save(FRAMES / f"frame_{i:04d}.png", optimize=False)
        if i in preview_frames:
            frame.save(preview_frames[i])
        if i == int(FPS * 16.2):
            frame.save(POSTER)
        if i % 60 == 0:
            print(f"rendered {i}/{TOTAL_FRAMES}", flush=True)

    make_audio()
    ffmpeg = os.environ.get("FFMPEG_BIN")
    if not ffmpeg:
        candidate = ROOT / ".tools" / "node_modules" / "ffmpeg-static" / "ffmpeg"
        if candidate.exists():
            ffmpeg = str(candidate)
    if not ffmpeg or not Path(ffmpeg).exists():
        raise SystemExit("FFMPEG_BIN not set and local ffmpeg-static binary not found")

    subprocess.run(
        [
            ffmpeg,
            "-y",
            "-framerate",
            str(FPS),
            "-i",
            str(FRAMES / "frame_%04d.png"),
            "-i",
            str(AUDIO),
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-shortest",
            "-movflags",
            "+faststart",
            "-crf",
            "18",
            str(OUT),
        ],
        check=True,
    )
    print(f"wrote {OUT}", flush=True)
    shutil.rmtree(FRAMES)


if __name__ == "__main__":
    main()
