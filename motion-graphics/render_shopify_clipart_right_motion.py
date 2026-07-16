from __future__ import annotations

import math
import os
import random
import subprocess
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "clipart_right_frames"
OUT = ROOT / "shopify-clipart-right-motion.mp4"
POSTER = ROOT / "shopify-clipart-right-motion-poster.png"
AUDIO = ROOT / "clipart-pop-sound-bed.wav"

W, H = 1920, 1080
FPS = 30
DURATION = 16.0
TOTAL_FRAMES = int(FPS * DURATION)

BLACK = (0, 0, 0)
PAPER = (225, 204, 160)
PAPER_DARK = (174, 142, 94)
INK = (47, 39, 31)
MUTED = (103, 87, 68)
GREEN = (42, 145, 92)
GREEN_DARK = (27, 95, 62)
YELLOW = (255, 183, 0)
ORANGE = (241, 121, 56)
BLUE = (65, 137, 210)
RED = (190, 67, 54)
CREAM = (252, 238, 202)
WHITE = (255, 250, 234)

FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_SERIF = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"


def font(size: int, bold=False, serif=False):
    if serif:
        return ImageFont.truetype(FONT_SERIF, size=size)
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REG, size=size)


F = {
    "tiny": font(25, True),
    "small": font(32, True),
    "body": font(40),
    "body_b": font(42, True),
    "mid": font(54, True),
    "large": font(72, True),
    "large2": font(62, True),
    "hero": font(90, True, True),
    "hero2": font(76, True, True),
}


def clamp(v, lo=0, hi=1):
    return max(lo, min(hi, v))


def ease(v):
    v = clamp(v)
    return 1 - (1 - v) ** 3


def ease_io(v):
    v = clamp(v)
    return 0.5 - 0.5 * math.cos(math.pi * v)


def rgba(c, a):
    return (*c, int(clamp(a / 255, 0, 1) * 255))


def scene_a(t, start, end, fade=0.55):
    return clamp((t - start) / fade) * clamp((end - t) / fade)


def text_size(draw, text, f):
    b = draw.textbbox((0, 0), text, font=f)
    return b[2] - b[0], b[3] - b[1]


def wrap(draw, text, f, max_w):
    words = text.split()
    lines = []
    cur = ""
    for w in words:
        cand = (cur + " " + w).strip()
        if text_size(draw, cand, f)[0] <= max_w or not cur:
            cur = cand
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def make_paper():
    rng = np.random.default_rng(25)
    arr = np.zeros((H, W, 3), dtype=np.float32)
    arr[:] = np.array(PAPER, dtype=np.float32)
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(0, 1, W)[None, :]
    vignette = ((x - 0.67) ** 2 + (y - 0.52) ** 2) * 0.9
    arr = arr * (1 - vignette[..., None] * 0.28) + np.array(PAPER_DARK) * vignette[..., None] * 0.24
    arr += rng.normal(0, 8.5, (H, W, 1))
    arr += (np.sin((x * 18 + y * 7) * math.pi) * 2.5)[..., None]
    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB").convert("RGBA")
    cr = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(cr)
    random.seed(11)
    for _ in range(24):
        pts = []
        x0 = random.randint(760, W + 40)
        y0 = random.randint(-60, H + 60)
        ang = random.uniform(-0.8, 0.8)
        length = random.randint(300, 860)
        for i in range(7):
            pts.append(
                (
                    x0 + math.cos(ang) * length * i / 6 + random.randint(-24, 24),
                    y0 + math.sin(ang) * length * i / 6 + random.randint(-24, 24),
                )
            )
        d.line(pts, fill=(72, 55, 32, random.randint(18, 34)), width=random.randint(2, 4))
    img.alpha_composite(cr.filter(ImageFilter.GaussianBlur(1.1)))
    return img


PAPER_BG = make_paper()


def base_frame(t):
    img = Image.new("RGBA", (W, H), BLACK + (255,))
    # Right paper wedge, matching the supplied reference.
    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    md.polygon([(1165, 0), (W, 0), (W, H), (790, H)], fill=255)
    paper = PAPER_BG.copy()
    img.alpha_composite(Image.composite(paper, Image.new("RGBA", (W, H), (0, 0, 0, 0)), mask))

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for i in range(34, 0, -1):
        a = int(110 * (i / 34) ** 2)
        gd.line((1118 - i * 5, -40, 748 - i * 5, H + 55), fill=rgba(YELLOW, a), width=18)
    gd.line((1165, -45, 790, H + 55), fill=rgba(YELLOW, 255), width=22)
    gd.line((1192, -45, 817, H + 55), fill=rgba(ORANGE, 190), width=5)
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(0.2)))
    return img


def right_clip(layer):
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    d.polygon([(1190, 0), (W, 0), (W, H), (820, H)], fill=255)
    empty = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    return Image.composite(layer, empty, mask)


def pop_y(p, amount=34):
    return int((1 - ease(p)) * amount)


def dotted_arrow(draw, pts, progress, color=GREEN, dot=7, gap=31):
    progress = clamp(progress)
    if progress <= 0:
        return
    lens = []
    total = 0
    for a, b in zip(pts, pts[1:]):
        l = math.hypot(b[0] - a[0], b[1] - a[1])
        lens.append(l)
        total += l
    limit = total * progress

    def at(dist):
        rem = dist
        for (a, b), l in zip(zip(pts, pts[1:]), lens):
            if rem <= l:
                r = rem / l if l else 0
                return (a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r), math.atan2(b[1] - a[1], b[0] - a[0])
            rem -= l
        a, b = pts[-2], pts[-1]
        return pts[-1], math.atan2(b[1] - a[1], b[0] - a[0])

    d = 0
    while d < limit:
        p, _ = at(d)
        draw.ellipse((p[0] - dot, p[1] - dot, p[0] + dot, p[1] + dot), fill=rgba(color, 205))
        d += gap
    if progress > 0.1:
        p, ang = at(limit)
        size = 26
        draw.polygon(
            [
                (p[0], p[1]),
                (p[0] - math.cos(ang - 0.5) * size, p[1] - math.sin(ang - 0.5) * size),
                (p[0] - math.cos(ang + 0.5) * size, p[1] - math.sin(ang + 0.5) * size),
            ],
            fill=rgba(color, 220),
        )


def rounded(draw, box, r, fill, outline=INK, width=4):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def draw_person(draw, x, y, scale=1.0, shirt=GREEN, skin=(181, 120, 76), alpha=255):
    s = scale
    draw.ellipse((x - 34 * s, y - 120 * s, x + 34 * s, y - 52 * s), fill=rgba(skin, alpha), outline=rgba(INK, alpha), width=max(2, int(4 * s)))
    draw.arc((x - 28 * s, y - 136 * s, x + 28 * s, y - 80 * s), 190, 350, fill=rgba(INK, alpha), width=max(3, int(8 * s)))
    draw.rounded_rectangle((x - 52 * s, y - 50 * s, x + 52 * s, y + 74 * s), radius=int(22 * s), fill=rgba(shirt, alpha), outline=rgba(INK, alpha), width=max(2, int(4 * s)))
    draw.line((x - 52 * s, y - 18 * s, x - 100 * s, y + 42 * s), fill=rgba(INK, alpha), width=max(3, int(9 * s)))
    draw.line((x + 52 * s, y - 18 * s, x + 96 * s, y - 66 * s), fill=rgba(INK, alpha), width=max(3, int(9 * s)))
    draw.line((x - 28 * s, y + 74 * s, x - 58 * s, y + 158 * s), fill=rgba(INK, alpha), width=max(3, int(10 * s)))
    draw.line((x + 28 * s, y + 74 * s, x + 58 * s, y + 158 * s), fill=rgba(INK, alpha), width=max(3, int(10 * s)))
    draw.ellipse((x + 84 * s, y - 78 * s, x + 110 * s, y - 52 * s), fill=rgba(YELLOW, alpha), outline=rgba(INK, alpha), width=max(2, int(3 * s)))


def draw_trophy(draw, x, y, s=1.0, alpha=255):
    draw.rectangle((x - 36 * s, y + 68 * s, x + 36 * s, y + 94 * s), fill=rgba(INK, alpha))
    draw.rectangle((x - 18 * s, y + 28 * s, x + 18 * s, y + 70 * s), fill=rgba(GOLD := (191, 139, 45), alpha), outline=rgba(INK, alpha), width=max(2, int(4 * s)))
    draw.rounded_rectangle((x - 58 * s, y - 40 * s, x + 58 * s, y + 38 * s), radius=int(20 * s), fill=rgba(GOLD, alpha), outline=rgba(INK, alpha), width=max(2, int(4 * s)))
    draw.arc((x - 100 * s, y - 35 * s, x - 32 * s, y + 45 * s), 80, 275, fill=rgba(INK, alpha), width=max(2, int(5 * s)))
    draw.arc((x + 32 * s, y - 35 * s, x + 100 * s, y + 45 * s), -95, 100, fill=rgba(INK, alpha), width=max(2, int(5 * s)))
    draw.text((x, y - 2 * s), "$M", font=font(int(30 * s), True), fill=rgba(INK, alpha), anchor="mm")


def draw_store(draw, x, y, s=1.0, alpha=255):
    draw.rounded_rectangle((x - 145 * s, y - 78 * s, x + 145 * s, y + 120 * s), radius=int(18 * s), fill=rgba(WHITE, alpha), outline=rgba(INK, alpha), width=max(2, int(5 * s)))
    draw.rectangle((x - 120 * s, y + 18 * s, x - 34 * s, y + 120 * s), fill=rgba(BLUE, int(alpha * 0.75)), outline=rgba(INK, alpha), width=max(2, int(4 * s)))
    draw.rectangle((x + 8 * s, y + 28 * s, x + 105 * s, y + 78 * s), fill=rgba(CREAM, alpha), outline=rgba(INK, alpha), width=max(2, int(4 * s)))
    colors = [RED, YELLOW, GREEN, BLUE]
    for i in range(4):
        x1 = x - 145 * s + i * 72.5 * s
        draw.pieslice((x1, y - 126 * s, x1 + 72.5 * s, y - 26 * s), 0, 180, fill=rgba(colors[i], alpha), outline=rgba(INK, alpha), width=max(2, int(3 * s)))
    draw.rectangle((x - 145 * s, y - 92 * s, x + 145 * s, y - 42 * s), fill=rgba(WHITE, alpha), outline=rgba(INK, alpha), width=max(2, int(4 * s)))
    draw.text((x, y - 67 * s), "SHOP", font=font(int(31 * s), True), fill=rgba(INK, alpha), anchor="mm")


def draw_playbook(draw, x, y, s=1.0, alpha=255):
    draw.rounded_rectangle((x - 155 * s, y - 115 * s, x + 150 * s, y + 130 * s), radius=int(20 * s), fill=rgba(GREEN, alpha), outline=rgba(INK, alpha), width=max(2, int(5 * s)))
    draw.polygon([(x - 155 * s, y - 115 * s), (x - 30 * s, y - 88 * s), (x - 30 * s, y + 130 * s), (x - 155 * s, y + 130 * s)], fill=rgba(GREEN_DARK, alpha))
    draw.line((x - 30 * s, y - 88 * s, x - 30 * s, y + 130 * s), fill=rgba(INK, alpha), width=max(2, int(5 * s)))
    draw.text((x + 52 * s, y - 30 * s), "SHOPIFY", font=font(int(27 * s), True), fill=rgba(WHITE, alpha), anchor="mm")
    draw.text((x + 52 * s, y + 12 * s), "PLAYBOOK", font=font(int(27 * s), True), fill=rgba(WHITE, alpha), anchor="mm")
    for i in range(3):
        yy = y + 60 * s + i * 25 * s
        draw.line((x + 0 * s, yy, x + 105 * s, yy), fill=rgba(WHITE, int(alpha * 0.75)), width=max(2, int(4 * s)))


def draw_laptop(draw, x, y, s=1.0, alpha=255):
    draw.rounded_rectangle((x - 145 * s, y - 88 * s, x + 145 * s, y + 76 * s), radius=int(16 * s), fill=rgba((64, 68, 76), alpha), outline=rgba(INK, alpha), width=max(2, int(5 * s)))
    draw.rectangle((x - 118 * s, y - 60 * s, x + 118 * s, y + 42 * s), fill=rgba((238, 247, 242), alpha))
    draw.rectangle((x - 175 * s, y + 76 * s, x + 175 * s, y + 104 * s), fill=rgba((95, 92, 89), alpha), outline=rgba(INK, alpha), width=max(2, int(4 * s)))
    draw.text((x, y - 10 * s), "Fiverr", font=font(int(42 * s), True), fill=rgba(GREEN, alpha), anchor="mm")
    draw.text((x, y + 38 * s), "generic gigs", font=font(int(22 * s), True), fill=rgba(MUTED, alpha), anchor="mm")


def draw_badge(draw, x, y, text, color=GREEN, s=1.0, alpha=255):
    w = 210 * s
    h = 58 * s
    rounded(draw, (x - w / 2, y - h / 2, x + w / 2, y + h / 2), int(20 * s), fill=rgba(color, int(alpha * 0.16)), outline=rgba(color, alpha), width=max(2, int(4 * s)))
    draw.text((x, y), text, font=font(int(24 * s), True), fill=rgba(INK, alpha), anchor="mm")


def scene1(img, t):
    a = scene_a(t, 0, 4.4)
    if not a:
        return
    local = t
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    p = ease(local / 0.9)
    yoff = pop_y(p)
    d.text((1230, 130 + yoff), "After working with", font=F["mid"], fill=rgba(MUTED, int(230 * a)))
    d.text((1230, 202 + yoff), "industry leaders", font=F["hero2"], fill=rgba(INK, int(245 * a)))
    d.text((1230, 300 + yoff), "& multi-million dollar", font=F["large2"], fill=rgba(GREEN_DARK, int(245 * a)))
    d.text((1230, 372 + yoff), "brands", font=F["large2"], fill=rgba(GREEN_DARK, int(245 * a)))
    draw_person(d, 1240, 715 + yoff, 1.1, shirt=BLUE, alpha=int(255 * a))
    draw_trophy(d, 1500, 625 + yoff, 1.2, alpha=int(255 * a))
    for i, label in enumerate(["DTC", "$M+", "PLUS"]):
        x = 1590 + i * 92
        y = 760 + math.sin(local * 2.0 + i) * 8 + yoff
        draw_badge(d, x, y, label, [GREEN, YELLOW, BLUE][i], 0.72, int(255 * a))
    dotted_arrow(d, [(1330, 560), (1450, 512), (1570, 545)], ease((local - 1.25) / 0.9), GREEN, dot=7, gap=30)
    img.alpha_composite(right_clip(layer))


def scene2(img, t):
    a = scene_a(t, 3.9, 8.4)
    if not a:
        return
    local = t - 3.9
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    yoff = pop_y(local / 0.8)
    d.text((1230, 118 + yoff), "We know the", font=F["mid"], fill=rgba(MUTED, int(230 * a)))
    d.text((1230, 190 + yoff), "Shopify", font=F["hero2"], fill=rgba(INK, int(245 * a)))
    d.text((1230, 282 + yoff), "playbook", font=F["hero2"], fill=rgba(INK, int(245 * a)))
    draw_playbook(d, 1398, 565 + yoff, 1.25, int(255 * a))
    draw_store(d, 1650, 720 + yoff, 0.9, int(255 * a))
    for i, label in enumerate(["UX", "CRO", "Speed", "Retention"]):
        yy = 395 + i * 70
        p = ease((local - 0.7 - i * 0.18) / 0.35)
        if p > 0:
            d.ellipse((1105, yy - 17, 1139, yy + 17), fill=rgba(GREEN, int(245 * a * p)), outline=rgba(INK, int(255 * a * p)), width=3)
            d.text((1122, yy), "✓", font=font(24, True), fill=rgba(WHITE, int(255 * a * p)), anchor="mm")
            d.text((1160, yy - 22), label, font=F["body_b"], fill=rgba(INK, int(245 * a * p)))
    dotted_arrow(d, [(1505, 610), (1555, 680), (1600, 706)], ease((local - 1.6) / 0.9), BLUE, dot=7, gap=28)
    img.alpha_composite(right_clip(layer))


def scene3(img, t):
    a = scene_a(t, 7.9, 12.3)
    if not a:
        return
    local = t - 7.9
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    yoff = pop_y(local / 0.8)
    d.text((1230, 120 + yoff), "Better than", font=F["mid"], fill=rgba(MUTED, int(230 * a)))
    d.text((1230, 198 + yoff), "anyone on", font=F["hero2"], fill=rgba(INK, int(245 * a)))
    d.text((1230, 288 + yoff), "Fiverr", font=F["hero2"], fill=rgba(INK, int(245 * a)))
    draw_laptop(d, 1285, 655 + yoff, 0.82, int(210 * a))
    draw_playbook(d, 1655, 620 + yoff, 0.92, int(255 * a))
    # Clipart comparison mark.
    d.line((1448, 515 + yoff, 1518, 740 + yoff), fill=rgba(RED, int(230 * a)), width=9)
    d.line((1518, 515 + yoff, 1448, 740 + yoff), fill=rgba(RED, int(230 * a)), width=9)
    d.text((1648, 815 + yoff), "proven", font=F["large2"], fill=rgba(GREEN_DARK, int(245 * a)), anchor="mm")
    dotted_arrow(d, [(1358, 742), (1480, 802), (1585, 725)], ease((local - 1.2) / 0.8), GREEN, dot=7, gap=30)
    img.alpha_composite(right_clip(layer))


def scene4(img, t):
    a = scene_a(t, 11.8, 16.0, fade=0.7)
    if not a:
        return
    local = t - 11.8
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    yoff = pop_y(local / 0.9)
    draw_store(d, 1410, 310 + yoff, 1.0, int(255 * a))
    draw_playbook(d, 1635, 350 + yoff, 0.85, int(255 * a))
    d.text((1140, 560 + yoff), "Real brand work.", font=F["large2"], fill=rgba(INK, int(245 * a)))
    d.text((1140, 650 + yoff), "A sharper Shopify", font=F["large2"], fill=rgba(GREEN_DARK, int(245 * a)))
    d.text((1140, 725 + yoff), "playbook.", font=F["large2"], fill=rgba(GREEN_DARK, int(245 * a)))
    d.text((1140, 830 + yoff), "Clipart explainers make it obvious.", font=F["body_b"], fill=rgba(MUTED, int(230 * a)))
    dotted_arrow(d, [(1330, 480), (1450, 535), (1550, 488)], ease((local - 0.9) / 1.0), ORANGE, dot=8, gap=32)
    img.alpha_composite(right_clip(layer))


def add_film(img, t):
    d = ImageDraw.Draw(img)
    rng = random.Random(int(t * FPS) + 8)
    for _ in range(45):
        x = rng.randint(850, W)
        y = rng.randint(0, H)
        d.point((x, y), fill=(35, 25, 14, rng.randint(7, 20)))


def render_frame(i):
    t = i / FPS
    img = base_frame(t)
    scene1(img, t)
    scene2(img, t)
    scene3(img, t)
    scene4(img, t)
    add_film(img, t)
    return img.convert("RGB")


def make_audio():
    sr = 44100
    n = int(DURATION * sr)
    audio = np.zeros(n, dtype=np.float32)
    rng = np.random.default_rng(4)
    t = np.arange(n) / sr
    audio += 0.012 * np.sin(2 * np.pi * 92 * t)
    for ct in [0.55, 1.25, 3.95, 4.7, 5.35, 8.1, 9.05, 10.3, 12.05, 13.0, 14.0]:
        start = int(ct * sr)
        length = int(0.075 * sr)
        if start + length > n:
            continue
        env = np.exp(-np.linspace(0, 6, length))
        tone = np.sin(2 * np.pi * rng.uniform(360, 660) * np.arange(length) / sr)
        noise = rng.normal(0, 0.18, length)
        audio[start : start + length] += (tone * 0.07 + noise * 0.035) * env
    fade = int(0.5 * sr)
    audio[:fade] *= np.linspace(0, 1, fade)
    audio[-fade:] *= np.linspace(1, 0, fade)
    audio = np.tanh(audio * 2.0) * 0.50
    with wave.open(str(AUDIO), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes((audio * 32767).astype(np.int16).tobytes())


def main():
    FRAMES.mkdir(exist_ok=True)
    for p in FRAMES.glob("frame_*.png"):
        p.unlink()
    for i in range(TOTAL_FRAMES):
        frame = render_frame(i)
        frame.save(FRAMES / f"frame_{i:04d}.png")
        if i == int(FPS * 13.5):
            frame.save(POSTER)
        if i % 60 == 0:
            print(f"rendered {i}/{TOTAL_FRAMES}", flush=True)

    make_audio()
    ffmpeg = os.environ.get("FFMPEG_BIN") or str(ROOT / ".tools" / "node_modules" / "ffmpeg-static" / "ffmpeg")
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
    for p in FRAMES.glob("frame_*.png"):
        p.unlink()
    FRAMES.rmdir()
    print(f"wrote {OUT}", flush=True)


if __name__ == "__main__":
    main()
