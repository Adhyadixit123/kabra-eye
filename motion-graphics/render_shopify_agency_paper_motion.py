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
FRAMES = ROOT / "paper_frames"
OUT = ROOT / "shopify-agency-paper-motion.mp4"
POSTER = ROOT / "shopify-agency-paper-motion-poster.png"
AUDIO = ROOT / "gear-sound-bed.wav"

W, H = 1920, 1080
FPS = 30
DURATION = 19.0
TOTAL_FRAMES = int(FPS * DURATION)

INK = (43, 35, 28)
INK_FADED = (84, 72, 58)
PAPER = (218, 194, 151)
PAPER_DARK = (172, 138, 93)
RED = (122, 38, 31)
GREEN = (44, 96, 65)
GOLD = (160, 116, 48)

GEORGIA = "/System/Library/Fonts/Supplemental/Georgia.ttf"
GEORGIA_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
TYPEWRITER = "/System/Library/Fonts/Supplemental/AmericanTypewriter.ttc"
BASKERVILLE = "/System/Library/Fonts/Supplemental/Baskerville.ttc"


def fnt(size: int, face: str = "georgia", bold: bool = False) -> ImageFont.FreeTypeFont:
    if face == "type":
        return ImageFont.truetype(TYPEWRITER, size=size)
    if face == "bask":
        return ImageFont.truetype(BASKERVILLE, size=size)
    return ImageFont.truetype(GEORGIA_BOLD if bold else GEORGIA, size=size)


F = {
    "stamp": fnt(54, "type"),
    "small": fnt(34, "type"),
    "body": fnt(45, "type"),
    "serif": fnt(62, "georgia"),
    "serif_b": fnt(68, "georgia", True),
    "title": fnt(114, "georgia", True),
    "hero": fnt(134, "georgia", True),
    "number": fnt(88, "bask"),
}


def clamp(v: float, lo: float = 0, hi: float = 1) -> float:
    return max(lo, min(hi, v))


def ease(v: float) -> float:
    v = clamp(v)
    return 1 - (1 - v) ** 3


def ease_io(v: float) -> float:
    v = clamp(v)
    return 0.5 - 0.5 * math.cos(math.pi * v)


def rgba(c: tuple[int, int, int], a: int) -> tuple[int, int, int, int]:
    return (*c, max(0, min(255, a)))


def scene_a(t: float, start: float, end: float, fade: float = 0.65) -> float:
    return clamp((t - start) / fade) * clamp((end - t) / fade)


def text_center(draw: ImageDraw.ImageDraw, xy, text, font, fill, spacing=12):
    draw.multiline_text(xy, text, font=font, fill=fill, anchor="mm", align="center", spacing=spacing)


def make_paper_texture() -> Image.Image:
    random.seed(17)
    tw, th = 2300, 1320
    y = np.linspace(0, 1, th)[:, None]
    x = np.linspace(0, 1, tw)[None, :]
    base = np.zeros((th, tw, 3), dtype=np.float32)
    p = np.array(PAPER, dtype=np.float32)
    d = np.array(PAPER_DARK, dtype=np.float32)
    base[:] = p
    vignette = ((x - 0.5) ** 2 + (y - 0.5) ** 2) * 1.25
    base = base * (1 - vignette[..., None] * 0.34) + d * vignette[..., None] * 0.30

    noise = np.random.default_rng(8).normal(0, 9, (th, tw, 1))
    fiber = np.sin((x * 42 + y * 6) * math.pi) * 4 + np.sin((x * 8 - y * 22) * math.pi) * 3
    base += noise + fiber[..., None]
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").convert("RGBA")

    wr = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    wd = ImageDraw.Draw(wr)
    for _ in range(38):
        pts = []
        x0 = random.randint(-120, tw + 80)
        y0 = random.randint(-80, th + 80)
        length = random.randint(380, 980)
        ang = random.uniform(-0.9, 0.9)
        for i in range(9):
            dist = length * i / 8
            pts.append(
                (
                    x0 + math.cos(ang) * dist + random.randint(-28, 28),
                    y0 + math.sin(ang) * dist + random.randint(-28, 28),
                )
            )
        wd.line(pts, fill=(66, 45, 20, random.randint(18, 36)), width=random.randint(2, 5))
        hi = [(px + 5, py - 5) for px, py in pts]
        wd.line(hi, fill=(255, 239, 190, random.randint(16, 32)), width=random.randint(1, 3))
    wr = wr.filter(ImageFilter.GaussianBlur(1.4))
    img.alpha_composite(wr)

    stains = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stains)
    for _ in range(26):
        cx, cy = random.randint(0, tw), random.randint(0, th)
        r = random.randint(40, 170)
        sd.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(83, 53, 20, random.randint(8, 22)))
    stains = stains.filter(ImageFilter.GaussianBlur(18))
    img.alpha_composite(stains)
    return img


PAPER_TEXTURE = make_paper_texture()


def paper_bg(t: float) -> Image.Image:
    p = ease_io((math.sin(t * 0.18) + 1) / 2)
    q = ease_io((math.cos(t * 0.15) + 1) / 2)
    max_x = PAPER_TEXTURE.width - W
    max_y = PAPER_TEXTURE.height - H
    x = int(max_x * (0.18 + 0.50 * p))
    y = int(max_y * (0.12 + 0.50 * q))
    img = PAPER_TEXTURE.crop((x, y, x + W, y + H)).copy()
    return img


def add_film(img: Image.Image, t: float):
    d = ImageDraw.Draw(img)
    rng = random.Random(int(t * FPS) + 44)
    for _ in range(80):
        x, y = rng.randint(0, W), rng.randint(0, H)
        a = rng.randint(8, 25)
        d.point((x, y), fill=(35, 25, 14, a))
    d.rectangle((0, 0, W, 28), fill=(46, 33, 18, 42))
    d.rectangle((0, H - 28, W, H), fill=(46, 33, 18, 42))


def stamp(draw: ImageDraw.ImageDraw, center, text: str, alpha: int, angle=-8, scale=1.0, color=RED):
    w, h = int(470 * scale), int(124 * scale)
    layer = Image.new("RGBA", (w + 60, h + 60), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    box = (30, 30, w + 30, h + 30)
    ld.rounded_rectangle(box, radius=int(14 * scale), outline=rgba(color, alpha), width=max(2, int(7 * scale)))
    ld.rounded_rectangle((box[0] + 14, box[1] + 14, box[2] - 14, box[3] - 14), radius=int(9 * scale), outline=rgba(color, int(alpha * 0.55)), width=max(1, int(3 * scale)))
    ld.text((w / 2 + 30, h / 2 + 30), text.upper(), font=fnt(int(42 * scale), "type"), fill=rgba(color, alpha), anchor="mm")
    original_alpha = np.array(layer.getchannel("A"), dtype=np.float32)
    noise = np.array(Image.effect_noise(layer.size, 52).convert("L"), dtype=np.float32) / 255.0
    distress = 0.72 + noise * 0.28
    holes = noise < 0.09
    new_alpha = original_alpha * distress
    new_alpha[holes] *= 0.45
    layer.putalpha(Image.fromarray(np.clip(new_alpha, 0, 255).astype(np.uint8), "L"))
    rot = layer.rotate(angle, expand=True, resample=Image.Resampling.BICUBIC)
    x = int(center[0] - rot.width / 2)
    y = int(center[1] - rot.height / 2)
    return rot, (x, y)


def line_draw(draw, pts, progress, fill=INK, width=7):
    if progress <= 0:
        return
    lengths = []
    total = 0
    for a, b in zip(pts, pts[1:]):
        l = math.hypot(b[0] - a[0], b[1] - a[1])
        lengths.append(l)
        total += l
    want = total * clamp(progress)
    rem = want
    for (a, b), l in zip(zip(pts, pts[1:]), lengths):
        if rem <= 0:
            break
        if rem >= l:
            draw.line((*a, *b), fill=fill, width=width)
            rem -= l
        else:
            r = rem / l
            p = (a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r)
            draw.line((*a, *p), fill=fill, width=width)
            break


def dotted_arrow(draw, pts, progress, fill=INK, dot=8, gap=24, width=5, arrow=True):
    progress = clamp(progress)
    if progress <= 0:
        return
    lengths = []
    total = 0
    for a, b in zip(pts, pts[1:]):
        l = math.hypot(b[0] - a[0], b[1] - a[1])
        lengths.append(l)
        total += l
    limit = total * progress

    def point_at(distance):
        rem = distance
        for (a, b), l in zip(zip(pts, pts[1:]), lengths):
            if rem <= l:
                r = rem / l if l else 0
                return (a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r), math.atan2(b[1] - a[1], b[0] - a[0])
            rem -= l
        a, b = pts[-2], pts[-1]
        return pts[-1], math.atan2(b[1] - a[1], b[0] - a[0])

    d = 0
    while d <= limit:
        p, _ = point_at(d)
        draw.ellipse((p[0] - dot, p[1] - dot, p[0] + dot, p[1] + dot), fill=rgba(fill, 190))
        d += gap
    if arrow and progress > 0.12:
        p, ang = point_at(limit)
        size = width * 6
        pts_arrow = [
            (p[0], p[1]),
            (p[0] - math.cos(ang - 0.48) * size, p[1] - math.sin(ang - 0.48) * size),
            (p[0] - math.cos(ang + 0.48) * size, p[1] - math.sin(ang + 0.48) * size),
        ]
        draw.polygon(pts_arrow, fill=rgba(fill, 210))


def camera_layer(layer: Image.Image, t_local: float, zoom_from=1.04, zoom_to=1.0, dx=0, dy=0) -> Image.Image:
    z = zoom_from + (zoom_to - zoom_from) * ease_io(clamp(t_local))
    sw, sh = int(W * z), int(H * z)
    scaled = layer.resize((sw, sh), Image.Resampling.BICUBIC)
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    out.alpha_composite(scaled, (int((W - sw) / 2 + dx), int((H - sh) / 2 + dy)))
    return out


def title_scene(base: Image.Image, t: float):
    a = scene_a(t, 0, 4.2)
    if not a:
        return
    local = t / 4.2
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    text_center(d, (960, 465), "The Shopify\nPlaybook", F["hero"], rgba(INK, int(245 * a)), spacing=10)
    text_center(d, (960, 665), "a clean agency explainer", F["body"], rgba(INK_FADED, int(230 * a)))
    dotted_arrow(d, [(650, 730), (850, 810), (1105, 770), (1248, 720)], ease((t - 0.75) / 1.1), fill=GREEN, dot=6, gap=34, width=4)
    if t > 1.25:
        s = ease((t - 1.25) / 0.35)
        st, pos = stamp(d, (1270, 705), "3 months support", int(180 * a * s), angle=-7, scale=0.74, color=GREEN)
        layer.alpha_composite(st, pos)
    base.alpha_composite(camera_layer(layer, local, 1.05, 1.0, dx=-20, dy=14))


def proof_scene(base: Image.Image, t: float):
    a = scene_a(t, 3.7, 8.0)
    if not a:
        return
    local = t - 3.7
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.text((260, 240), "Earned through", font=F["serif"], fill=rgba(INK_FADED, int(230 * a)))
    d.text((260, 325), "multi-million dollar", font=F["title"], fill=rgba(INK, int(245 * a)))
    d.text((260, 455), "brand work.", font=F["title"], fill=rgba(INK, int(245 * a)))
    route = [(1040, 720), (1130, 625), (1260, 650), (1395, 500), (1575, 420)]
    dotted_arrow(d, route, ease((local - 0.9) / 1.35), fill=GREEN, dot=9, gap=38, width=5)
    for i, (x, y) in enumerate(route):
        p = ease((local - 1.05 - i * 0.18) / 0.35)
        if p > 0:
            r = 15 + 8 * p
            d.ellipse((x - r, y - r, x + r, y + r), outline=rgba(GREEN, int(210 * a)), width=5)
            d.ellipse((x - 5, y - 5, x + 5, y + 5), fill=rgba(GREEN, int(210 * a)))
    if local > 2.25:
        s = ease((local - 2.25) / 0.28)
        st, pos = stamp(d, (485, 650), "case notes", int(155 * a * s), angle=5, scale=0.72, color=RED)
        layer.alpha_composite(st, pos)
    base.alpha_composite(camera_layer(layer, local / 4.3, 1.0, 1.045, dx=12, dy=-8))


def playbook_scene(base: Image.Image, t: float):
    a = scene_a(t, 7.5, 12.4)
    if not a:
        return
    local = t - 7.5
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.text((285, 195), "The playbook is simple.", font=F["title"], fill=rgba(INK, int(245 * a)))
    d.text((292, 335), "Build the right store. Improve the funnel. Scale what works.", font=F["body"], fill=rgba(INK_FADED, int(220 * a)))
    chapters = [("01", "Build"), ("02", "Optimize"), ("03", "Scale")]
    for i, (num, label) in enumerate(chapters):
        p = ease((local - 0.65 - i * 0.62) / 0.65)
        if p <= 0:
            continue
        x = 360 + i * 445
        y = 595
        alpha = int(225 * a * p)
        d.rounded_rectangle((x, y, x + 320, y + 255), radius=8, fill=rgba((205, 177, 125), int(72 * a * p)), outline=rgba(INK, int(120 * a * p)), width=3)
        d.text((x + 45, y + 52), num, font=F["number"], fill=rgba(GOLD, alpha))
        d.text((x + 45, y + 158), label, font=F["serif_b"], fill=rgba(INK, alpha))
        d.line((x + 45, y + 220, x + 275, y + 220), fill=rgba(INK_FADED, int(120 * a * p)), width=4)
    dotted_arrow(d, [(660, 720), (760, 690), (850, 720)], ease((local - 1.1) / 0.55), fill=INK_FADED, dot=6, gap=28, width=4)
    dotted_arrow(d, [(1105, 720), (1205, 690), (1295, 720)], ease((local - 1.72) / 0.55), fill=INK_FADED, dot=6, gap=28, width=4)
    base.alpha_composite(camera_layer(layer, local / 4.9, 1.035, 1.0, dx=-10, dy=0))


def support_scene(base: Image.Image, t: float):
    a = scene_a(t, 11.9, 16.2)
    if not a:
        return
    local = t - 11.9
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.text((240, 230), "Then we stay active", font=F["serif"], fill=rgba(INK_FADED, int(225 * a)))
    d.text((240, 330), "for 3 months.", font=F["title"], fill=rgba(INK, int(245 * a)))
    d.text((245, 470), "support, fixes,\nguidance, iteration", font=F["body"], fill=rgba(INK_FADED, int(220 * a)), spacing=12)
    x0, y0 = 1110, 245
    dotted_arrow(d, [(610, 610), (790, 700), (1010, 545), (1110, 505)], ease((local - 0.4) / 1.0), fill=GREEN, dot=7, gap=34, width=4)
    d.rounded_rectangle((x0, y0, x0 + 520, y0 + 590), radius=12, fill=rgba((207, 181, 132), int(85 * a)), outline=rgba(INK, int(120 * a)), width=4)
    d.rectangle((x0, y0, x0 + 520, y0 + 92), fill=rgba(RED, int(118 * a)))
    d.text((x0 + 260, y0 + 50), "SUPPORT WINDOW", font=F["small"], fill=rgba((242, 223, 183), int(240 * a)), anchor="mm")
    for i, label in enumerate(["MONTH 1", "MONTH 2", "MONTH 3"]):
        y = y0 + 160 + i * 125
        d.line((x0 + 55, y + 78, x0 + 465, y + 78), fill=rgba(INK_FADED, int(90 * a)), width=2)
        d.text((x0 + 75, y), label, font=F["body"], fill=rgba(INK, int(230 * a)))
        p = ease((local - 0.75 - i * 0.42) / 0.30)
        if p > 0:
            st, pos = stamp(d, (x0 + 372, y + 32), "active", int(150 * a * p), angle=-5, scale=0.43, color=GREEN)
            layer.alpha_composite(st, pos)
    dotted_arrow(d, [(x0 + 130, y0 + 520), (x0 + 270, y0 + 545), (x0 + 405, y0 + 520)], ease((local - 2.0) / 0.9), fill=INK_FADED, dot=5, gap=26, width=3)
    base.alpha_composite(camera_layer(layer, local / 4.3, 1.0, 1.04, dx=16, dy=0))


def final_scene(base: Image.Image, t: float):
    a = scene_a(t, 15.7, 19.0)
    if not a:
        return
    local = t - 15.7
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    text_center(d, (960, 405), "A proven playbook.", F["hero"], rgba(INK, int(245 * a)))
    text_center(d, (960, 565), "Active support.", F["title"], rgba(GREEN, int(225 * a)))
    text_center(d, (960, 710), "Less guesswork.", F["title"], rgba(INK, int(235 * a)))
    if local > 0.65:
        s = ease((local - 0.65) / 0.35)
        st, pos = stamp(d, (960, 845), "shopify agency", int(175 * a * s), angle=-4, scale=0.86, color=RED)
        layer.alpha_composite(st, pos)
    base.alpha_composite(camera_layer(layer, local / 3.3, 1.04, 1.0, dx=0, dy=0))


def render_frame(i: int) -> Image.Image:
    t = i / FPS
    img = paper_bg(t)
    title_scene(img, t)
    proof_scene(img, t)
    playbook_scene(img, t)
    support_scene(img, t)
    final_scene(img, t)
    add_film(img, t)
    return img.convert("RGB")


def make_gear_audio():
    sr = 44100
    n = int(DURATION * sr)
    audio = np.zeros(n, dtype=np.float32)
    rng = np.random.default_rng(13)
    t = np.arange(n) / sr
    audio += 0.018 * np.sin(2 * np.pi * 58 * t)
    audio += 0.010 * np.sin(2 * np.pi * 116 * t + 0.4)

    click_times = []
    beat = 0.42
    x = 0.2
    while x < DURATION:
        click_times.append(x)
        x += beat + rng.uniform(-0.035, 0.035)
    for ct in click_times:
        start = int(ct * sr)
        length = int(0.055 * sr)
        if start + length >= n:
            continue
        env = np.exp(-np.linspace(0, 6.5, length))
        tone = np.sin(2 * np.pi * rng.uniform(620, 980) * np.arange(length) / sr)
        grit = rng.normal(0, 0.45, length)
        audio[start : start + length] += (tone * 0.08 + grit * 0.055) * env

    for ct in [1.35, 4.2, 8.1, 12.2, 16.1]:
        start = int(ct * sr)
        length = int(0.18 * sr)
        if start + length >= n:
            continue
        env = np.exp(-np.linspace(0, 5, length))
        scrape = rng.normal(0, 0.11, length)
        audio[start : start + length] += scrape * env

    fade = int(0.6 * sr)
    audio[:fade] *= np.linspace(0, 1, fade)
    audio[-fade:] *= np.linspace(1, 0, fade)
    audio = np.tanh(audio * 1.8) * 0.55
    pcm = (audio * 32767).astype(np.int16)
    with wave.open(str(AUDIO), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())


def main():
    FRAMES.mkdir(exist_ok=True)
    for p in FRAMES.glob("frame_*.png"):
        p.unlink()
    for i in range(TOTAL_FRAMES):
        frame = render_frame(i)
        frame.save(FRAMES / f"frame_{i:04d}.png", optimize=False)
        if i == int(FPS * 17.2):
            frame.save(POSTER)
        if i % 60 == 0:
            print(f"rendered {i}/{TOTAL_FRAMES}", flush=True)

    make_gear_audio()
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
    print(f"wrote {OUT}", flush=True)
    for p in FRAMES.glob("frame_*.png"):
        p.unlink()
    FRAMES.rmdir()


if __name__ == "__main__":
    main()
