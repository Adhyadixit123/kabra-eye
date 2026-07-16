from __future__ import annotations

import math
import os
import shutil
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "frames"
OUT = ROOT / "shopify-agency-motion.mp4"
POSTER = ROOT / "shopify-agency-motion-poster.png"

W, H = 1920, 1080
FPS = 30
DURATION = 16.0
TOTAL_FRAMES = int(FPS * DURATION)

INK = (6, 18, 20)
INK_2 = (9, 35, 36)
GREEN = (0, 203, 124)
GREEN_DARK = (0, 129, 83)
MINT = (166, 255, 222)
WHITE = (244, 250, 247)
MUTED = (159, 186, 178)
YELLOW = (255, 203, 97)
CORAL = (255, 112, 91)
BLUE = (93, 175, 255)


FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_DISPLAY = "/System/Library/Fonts/SFNS.ttf"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = FONT_BOLD if bold else FONT_REG
    if Path(path).exists():
        return ImageFont.truetype(path, size=size)
    return ImageFont.truetype(FONT_DISPLAY, size=size)


F = {
    "tiny": font(28),
    "small": font(34),
    "body": font(42),
    "body_bold": font(42, True),
    "mid": font(58, True),
    "large": font(82, True),
    "hero": font(118, True),
    "mega": font(148, True),
}


def clamp(x: float, a: float = 0.0, b: float = 1.0) -> float:
    return max(a, min(b, x))


def ease(x: float) -> float:
    x = clamp(x)
    return 1 - pow(1 - x, 3)


def ease_in_out(x: float) -> float:
    x = clamp(x)
    return 0.5 - 0.5 * math.cos(math.pi * x)


def lerp(a: float, b: float, x: float) -> float:
    return a + (b - a) * x


def mix(c1: tuple[int, int, int], c2: tuple[int, int, int], x: float) -> tuple[int, int, int]:
    return tuple(int(lerp(a, b, x)) for a, b in zip(c1, c2))


def rgba(c: tuple[int, int, int], alpha: int) -> tuple[int, int, int, int]:
    return (*c, alpha)


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text_size(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont):
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_text(
    draw: ImageDraw.ImageDraw,
    xy,
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill=WHITE,
    anchor="la",
    spacing=10,
):
    draw.multiline_text(xy, text, font=fnt, fill=fill, anchor=anchor, spacing=spacing)


def draw_wrapped(draw, xy, text, fnt, max_width, fill=WHITE, line_gap=12):
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if text_size(draw, candidate, fnt)[0] <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    x, y = xy
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += fnt.size + line_gap
    return y


def gradient_background(t: float) -> Image.Image:
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(0, 1, W)[None, :]
    pulse = 0.5 + 0.5 * math.sin(t * 0.7)
    c1 = np.array(mix(INK, (4, 26, 33), pulse), dtype=np.float32)
    c2 = np.array(mix(INK_2, (18, 27, 45), 1 - pulse), dtype=np.float32)
    c3 = np.array((1, 64, 48), dtype=np.float32)
    base = c1 * (1 - y[..., None]) + c2 * y[..., None]
    base = np.repeat(base, W, axis=1)
    glow = np.exp(-(((x - 0.76) ** 2) / 0.055 + ((y - 0.14) ** 2) / 0.08))
    glow2 = np.exp(-(((x - 0.16) ** 2) / 0.08 + ((y - 0.84) ** 2) / 0.07))
    img = base + c3 * glow[..., None] * 0.36 + np.array(GREEN) * glow2[..., None] * 0.14
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), "RGB").convert("RGBA")


def draw_grid(draw: ImageDraw.ImageDraw, t: float):
    step = 92
    offset = int((t * 18) % step)
    for x in range(-step, W + step, step):
        xx = x + offset
        draw.line((xx, 0, xx + 320, H), fill=(255, 255, 255, 13), width=1)
    for y in range(-step, H + step, step):
        yy = y + offset
        draw.line((0, yy, W, yy - 220), fill=(255, 255, 255, 10), width=1)
    for i in range(95):
        px = (i * 137 + int(t * 23)) % W
        py = (i * 83 + int(t * 11)) % H
        alpha = 20 + int(22 * (0.5 + 0.5 * math.sin(t * 1.5 + i)))
        draw.ellipse((px - 2, py - 2, px + 2, py + 2), fill=rgba(MINT, alpha))


def shadow_layer(box, radius=32, blur=24, alpha=90):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x1, y1, x2, y2 = box
    d.rounded_rectangle((x1, y1 + 18, x2, y2 + 18), radius=radius, fill=(0, 0, 0, alpha))
    return layer.filter(ImageFilter.GaussianBlur(blur))


def card(img: Image.Image, box, fill=(13, 43, 43, 232), outline=(255, 255, 255, 35), radius=34):
    img.alpha_composite(shadow_layer(box, radius=radius))
    d = ImageDraw.Draw(img)
    rounded(d, box, radius, fill=fill, outline=outline, width=2)


def draw_shop_icon(draw: ImageDraw.ImageDraw, cx: int, cy: int, s: float, alpha: int = 255):
    w, h = int(180 * s), int(154 * s)
    x, y = cx - w // 2, cy - h // 2
    draw.rounded_rectangle((x, y + int(35 * s), x + w, y + h), radius=int(26 * s), fill=rgba(GREEN, alpha))
    draw.arc((x + int(44 * s), y, x + int(136 * s), y + int(84 * s)), 190, 350, fill=rgba(WHITE, alpha), width=max(2, int(8 * s)))
    draw.rectangle((x + int(38 * s), y + int(62 * s), x + int(142 * s), y + int(74 * s)), fill=rgba(GREEN, alpha))
    draw.polygon(
        [
            (x + int(33 * s), y + int(59 * s)),
            (x + int(151 * s), y + int(59 * s)),
            (x + int(166 * s), y + int(97 * s)),
            (x + int(16 * s), y + int(97 * s)),
        ],
        fill=rgba((0, 157, 98), alpha),
    )
    draw.text((cx, cy + int(33 * s)), "$", font=font(max(16, int(60 * s)), True), fill=rgba(WHITE, alpha), anchor="mm")


def draw_arrow(draw, start, end, color=GREEN, width=8, progress=1.0):
    sx, sy = start
    ex, ey = end
    px = lerp(sx, ex, progress)
    py = lerp(sy, ey, progress)
    draw.line((sx, sy, px, py), fill=rgba(color, 220), width=width)
    if progress > 0.92:
        ang = math.atan2(ey - sy, ex - sx)
        size = width * 3.1
        pts = [
            (ex, ey),
            (ex - math.cos(ang - 0.45) * size, ey - math.sin(ang - 0.45) * size),
            (ex - math.cos(ang + 0.45) * size, ey - math.sin(ang + 0.45) * size),
        ]
        draw.polygon(pts, fill=rgba(color, 230))


def pill(draw, xy, label, color=GREEN, alpha=255):
    x, y = xy
    pad_x, pad_y = 28, 14
    tw, th = text_size(draw, label, F["tiny"])
    rounded(draw, (x, y, x + tw + pad_x * 2, y + th + pad_y * 2), 25, fill=rgba(color, int(alpha * 0.18)), outline=rgba(color, int(alpha * 0.72)), width=2)
    draw.text((x + pad_x, y + pad_y - 1), label, font=F["tiny"], fill=rgba(WHITE, alpha))


def scene_alpha(t: float, start: float, end: float, fade=0.5) -> float:
    return clamp((t - start) / fade) * clamp((end - t) / fade)


def draw_hero(img: Image.Image, t: float):
    a = scene_alpha(t, 0, 3.2)
    if a <= 0:
        return
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    p = ease(clamp(t / 1.2))
    yoff = int(72 * (1 - p))
    draw_shop_icon(d, 1495, 330 + int(math.sin(t * 2.1) * 10), 1.12, int(230 * a))
    for i, (x, y, w, h, col) in enumerate(
        [
            (1160, 574, 330, 168, GREEN),
            (1395, 690, 300, 146, BLUE),
            (1265, 205, 250, 132, YELLOW),
        ]
    ):
        bob = math.sin(t * 2 + i) * 12
        box = (x, y + bob, x + w, y + h + bob)
        rounded(d, box, 28, fill=rgba((13, 43, 43), int(214 * a)), outline=rgba(col, int(90 * a)), width=2)
        d.rounded_rectangle((x + 28, y + 28 + bob, x + w - 28, y + 50 + bob), radius=10, fill=rgba(col, int(180 * a)))
        d.rounded_rectangle((x + 28, y + 78 + bob, x + w - 70, y + 94 + bob), radius=8, fill=rgba(WHITE, int(76 * a)))
        d.rounded_rectangle((x + 28, y + 112 + bob, x + w - 122, y + 128 + bob), radius=8, fill=rgba(WHITE, int(50 * a)))
    d.text((150, 260 + yoff), "SHOPIFY", font=F["mega"], fill=rgba(GREEN, int(255 * a)))
    d.text((150, 402 + yoff), "GROWTH PLAYBOOK", font=F["mega"], fill=rgba(WHITE, int(255 * a)))
    draw_wrapped(d, (158, 590 + yoff), "An explanatory motion piece for an agency built to scale commerce brands.", F["body"], 830, fill=rgba(MUTED, int(255 * a)), line_gap=12)
    pill(d, (158, 770 + yoff), "3 months active support", GREEN, int(255 * a))
    pill(d, (520, 770 + yoff), "CRO + UX + launch iteration", BLUE, int(255 * a))
    img.alpha_composite(layer)


def draw_authority(img: Image.Image, t: float):
    a = scene_alpha(t, 2.8, 6.4)
    if a <= 0:
        return
    local = t - 2.8
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    card(layer, (140, 150, 1780, 910), fill=(12, 39, 40, int(228 * a)), radius=42)
    d.text((220, 225), "After working with", font=F["large"], fill=rgba(WHITE, int(255 * a)))
    d.text((220, 318), "multi-million dollar", font=F["large"], fill=rgba(GREEN, int(255 * a)))
    d.text((220, 410), "brands", font=F["large"], fill=rgba(GREEN, int(255 * a)))
    draw_wrapped(d, (225, 535), "we know exactly which Shopify decisions compound into faster launches, cleaner funnels, and higher conversion.", F["body"], 650, fill=rgba(MUTED, int(255 * a)), line_gap=16)
    chart_box = (1000, 285, 1615, 720)
    rounded(d, chart_box, 32, fill=rgba((6, 22, 24), int(205 * a)), outline=rgba(WHITE, int(38 * a)), width=2)
    for i in range(5):
        y = chart_box[1] + 70 + i * 68
        d.line((chart_box[0] + 50, y, chart_box[2] - 50, y), fill=rgba(WHITE, int(22 * a)), width=1)
    pts = [(1070, 660), (1160, 620), (1260, 586), (1362, 502), (1460, 440), (1565, 342)]
    prog = ease(clamp(local / 2.2))
    for i in range(len(pts) - 1):
        seg_p = clamp(prog * (len(pts) - 1) - i)
        draw_arrow(d, pts[i], pts[i + 1], GREEN, 10, seg_p)
    for i, (x, y) in enumerate(pts):
        if prog * (len(pts) - 1) >= i - 0.15:
            d.ellipse((x - 14, y - 14, x + 14, y + 14), fill=rgba(GREEN, int(255 * a)))
    brand_prog = ease(clamp((local - 0.6) / 1.5))
    for i in range(4):
        x = 1000 + i * 150
        y = 760 - int(54 * min(1, max(0, brand_prog * 4 - i)))
        rounded(d, (x, y, x + 118, y + 64), 18, fill=rgba((255, 255, 255), int(24 * a)), outline=rgba(MINT, int(90 * a)), width=2)
        d.text((x + 59, y + 32), "$M+", font=F["small"], fill=rgba(WHITE, int(240 * a)), anchor="mm")
    img.alpha_composite(layer)


def draw_playbook(img: Image.Image, t: float):
    a = scene_alpha(t, 6.0, 10.6)
    if a <= 0:
        return
    local = t - 6.0
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.text((150, 135), "The Shopify playbook", font=F["hero"], fill=rgba(WHITE, int(255 * a)))
    d.text((154, 265), "from strategy to active optimization", font=F["mid"], fill=rgba(MINT, int(225 * a)))
    steps = [
        ("Audit", "find friction"),
        ("UX + CRO", "reshape pages"),
        ("Speed", "remove drag"),
        ("Retention", "grow LTV"),
        ("Launch", "measure + refine"),
    ]
    xs = [290, 630, 970, 1310, 1590]
    y = 600
    for i in range(len(xs) - 1):
        p = clamp((local - 0.55 - i * 0.35) / 0.55)
        draw_arrow(d, (xs[i] + 118, y), (xs[i + 1] - 118, y), GREEN, 7, ease(p))
    for i, (title, sub) in enumerate(steps):
        p = ease(clamp((local - 0.25 - i * 0.25) / 0.7))
        cy = y + int((1 - p) * 70)
        scale = 0.88 + p * 0.12
        r = int(105 * scale)
        fill = rgba((12, 43, 43), int((160 + 70 * p) * a))
        outline = [GREEN, BLUE, YELLOW, CORAL, MINT][i]
        d.ellipse((xs[i] - r, cy - r, xs[i] + r, cy + r), fill=fill, outline=rgba(outline, int(165 * a)), width=4)
        title_font = font(36, True) if len(title) > 7 else F["body_bold"]
        sub_label = "measure +\nrefine" if title == "Launch" else sub
        d.text((xs[i], cy - 18), title, font=title_font, fill=rgba(WHITE, int(255 * a)), anchor="mm")
        d.multiline_text((xs[i], cy + 34), sub_label, font=F["tiny"], fill=rgba(MUTED, int(255 * a)), anchor="mm", align="center", spacing=4)
    for i in range(9):
        angle = local * 0.7 + i * 0.72
        x = 965 + math.cos(angle) * (500 + i * 9)
        y2 = 606 + math.sin(angle * 1.4) * 230
        d.ellipse((x - 4, y2 - 4, x + 4, y2 + 4), fill=rgba(GREEN, int(90 * a)))
    img.alpha_composite(layer)


def draw_support(img: Image.Image, t: float):
    a = scene_alpha(t, 10.0, 13.35)
    if a <= 0:
        return
    local = t - 10.0
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.text((150, 150), "3 months active support", font=F["hero"], fill=rgba(GREEN, int(255 * a)))
    draw_wrapped(d, (158, 286), "Not a handoff. A focused support window for improvements, fixes, guidance, and iteration after launch.", F["body"], 980, fill=rgba(WHITE, int(235 * a)), line_gap=14)
    months = [("Month 1", "stabilize"), ("Month 2", "optimize"), ("Month 3", "scale")]
    for i, (m, sub) in enumerate(months):
        p = ease(clamp((local - i * 0.45) / 0.8))
        x = 255 + i * 500
        y = 610
        box = (x, y - int((1 - p) * 55), x + 390, y + 210 - int((1 - p) * 55))
        card(layer, box, fill=(12, 42, 42, int(220 * a)), radius=30)
        d.rounded_rectangle((box[0] + 32, box[1] + 36, box[2] - 32, box[1] + 72), radius=14, fill=rgba([GREEN, BLUE, YELLOW][i], int(210 * a)))
        d.text((box[0] + 44, box[1] + 102), m, font=F["mid"], fill=rgba(WHITE, int(255 * a)))
        d.text((box[0] + 46, box[1] + 160), sub, font=F["small"], fill=rgba(MUTED, int(255 * a)))
        if i < 2:
            draw_arrow(d, (box[2] + 28, box[1] + 105), (box[2] + 105, box[1] + 105), GREEN, 8, ease(clamp((local - 0.7 - i * 0.5) / 0.45)))
    pulse = 0.5 + 0.5 * math.sin(local * 5)
    d.ellipse((1580 - 42, 274 - 42, 1580 + 42, 274 + 42), fill=rgba(GREEN, int((70 + pulse * 70) * a)))
    d.ellipse((1580 - 24, 274 - 24, 1580 + 24, 274 + 24), fill=rgba(GREEN, int(230 * a)))
    d.text((1580, 360), "ACTIVE", font=F["small"], fill=rgba(MINT, int(255 * a)), anchor="mm")
    img.alpha_composite(layer)


def draw_final(img: Image.Image, t: float):
    a = scene_alpha(t, 12.85, 16.0, fade=0.65)
    if a <= 0:
        return
    local = t - 12.85
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    p = ease(clamp(local / 1.2))
    draw_shop_icon(d, 960, 268 - int((1 - p) * 50), 0.86, int(245 * a))
    d.text((960, 475), "Your brand gets the playbook", font=F["hero"], fill=rgba(WHITE, int(255 * a)), anchor="mm")
    d.text((960, 602), "not guesswork.", font=F["hero"], fill=rgba(GREEN, int(255 * a)), anchor="mm")
    labels = ["Build", "Optimize", "Scale"]
    colors = [BLUE, YELLOW, GREEN]
    start_x = 640
    for i, label in enumerate(labels):
        x = start_x + i * 320
        yy = 740 + int(math.sin(local * 2 + i) * 5)
        rounded(d, (x, yy, x + 245, yy + 78), 39, fill=rgba(colors[i], int(42 * a)), outline=rgba(colors[i], int(180 * a)), width=2)
        d.text((x + 122, yy + 39), label, font=F["body_bold"], fill=rgba(WHITE, int(255 * a)), anchor="mm")
    d.text((960, 910), "Shopify agency + 3 months active support", font=F["body"], fill=rgba(MUTED, int(255 * a)), anchor="mm")
    img.alpha_composite(layer)


def render_frame(i: int) -> Image.Image:
    t = i / FPS
    img = gradient_background(t)
    d = ImageDraw.Draw(img)
    draw_grid(d, t)
    progress = int((i / (TOTAL_FRAMES - 1)) * W)
    d.rectangle((0, H - 8, progress, H), fill=rgba(GREEN, 210))
    draw_hero(img, t)
    draw_authority(img, t)
    draw_playbook(img, t)
    draw_support(img, t)
    draw_final(img, t)
    vignette = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vignette)
    vd.rectangle((0, 0, W, H), fill=0)
    vignette = vignette.filter(ImageFilter.GaussianBlur(1))
    return img.convert("RGB")


def main():
    FRAMES.mkdir(exist_ok=True)
    for old in FRAMES.glob("frame_*.png"):
        old.unlink()

    for i in range(TOTAL_FRAMES):
        frame = render_frame(i)
        frame.save(FRAMES / f"frame_{i:04d}.png", optimize=False)
        if i == int(FPS * 14.2):
            frame.save(POSTER)
        if i % 30 == 0:
            print(f"rendered {i}/{TOTAL_FRAMES}")

    ffmpeg = os.environ.get("FFMPEG_BIN")
    if not ffmpeg:
        candidate = ROOT / ".tools" / "node_modules" / "ffmpeg-static" / "ffmpeg"
        if candidate.exists():
            ffmpeg = str(candidate)
    if not ffmpeg or not Path(ffmpeg).exists():
        raise SystemExit("FFMPEG_BIN not set and local ffmpeg-static binary not found")

    cmd = [
        ffmpeg,
        "-y",
        "-framerate",
        str(FPS),
        "-i",
        str(FRAMES / "frame_%04d.png"),
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-crf",
        "18",
        str(OUT),
    ]
    subprocess.run(cmd, check=True)
    print(f"wrote {OUT}")

    shutil.rmtree(FRAMES)


if __name__ == "__main__":
    main()
