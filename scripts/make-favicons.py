#!/usr/bin/env python3
"""
Generate Google-friendly favicon files for HOTFIX d.o.o.

Source: public/logo.png (master brand mark on a mostly-white canvas).
Target: true 1:1 square icons that stay recognisable at 32x32 and below.

Google requires a square (1:1) favicon and recommends >= 48x48 px so it
looks good on every search surface (regular SERP, AI Overviews, mobile,
Knowledge Panel). The shipped icon used to be a 661x377 landscape PNG
that got letterboxed into an illegible smear; this script produces the
replacements.

See docs/seo/site-name-and-favicon-fix.md for the full background.

Outputs:
  app/icon.png        — 512x512, primary Next.js icon
  app/apple-icon.png  — 180x180, iOS touch icon
  public/favicon.ico  — multi-size legacy ICO (16,32,48,64,128,256)
"""

import os
from pathlib import Path

from PIL import Image

REPO_ROOT = Path(__file__).resolve().parents[1]
SRC = REPO_ROOT / "public" / "logo.png"
OUT_ICON = REPO_ROOT / "app" / "icon.png"
OUT_APPLE = REPO_ROOT / "app" / "apple-icon.png"
OUT_ICO = REPO_ROOT / "public" / "favicon.ico"

# 10% padding on each side around the trimmed mark. Keeps the brand
# visually breathing room at small sizes and stays inside the safe area
# Google uses when rendering favicons in rounded surfaces.
PADDING = 0.10

# White background — matches Google's "Make sure the image looks how you
# intend it to look on a purely white background" recommendation for
# Organization-schema logos, and avoids iOS auto-filling transparency
# with white anyway in apple-touch-icon contexts.
BG = (255, 255, 255, 255)


def trim_to_content(img: Image.Image) -> Image.Image:
    """Crop to the bounding box of meaningfully-non-white pixels."""
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    w, h = rgba.size
    # Any RGB channel below this counts as "content". Tight enough to
    # ignore PNG anti-aliasing noise around the mark.
    threshold = 240
    bbox = None
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a > 8 and (r < threshold or g < threshold or b < threshold):
                if bbox is None:
                    bbox = [x, y, x, y]
                else:
                    bbox[0] = min(bbox[0], x)
                    bbox[1] = min(bbox[1], y)
                    bbox[2] = max(bbox[2], x)
                    bbox[3] = max(bbox[3], y)
    if bbox is None:
        return rgba
    return rgba.crop((bbox[0], bbox[1], bbox[2] + 1, bbox[3] + 1))


def make_square(mark: Image.Image, size: int) -> Image.Image:
    """Place the trimmed mark on a square white canvas with even padding."""
    mw, mh = mark.size
    target = int(size * (1 - 2 * PADDING))
    scale = target / max(mw, mh)
    new_size = (max(1, int(mw * scale)), max(1, int(mh * scale)))
    resized = mark.resize(new_size, Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), BG)
    offset = ((size - new_size[0]) // 2, (size - new_size[1]) // 2)
    canvas.paste(resized, offset, resized)
    return canvas


def main() -> None:
    src = Image.open(SRC)
    print(f"Source: {SRC.relative_to(REPO_ROOT)}  {src.size[0]}x{src.size[1]} {src.mode}")
    mark = trim_to_content(src)
    print(f"Trimmed mark: {mark.size[0]}x{mark.size[1]}")

    icon_512 = make_square(mark, 512)
    icon_512.save(OUT_ICON, "PNG", optimize=True)
    print(f"Wrote {OUT_ICON.relative_to(REPO_ROOT)}  ({os.path.getsize(OUT_ICON)} bytes)")

    apple = make_square(mark, 180)
    apple.save(OUT_APPLE, "PNG", optimize=True)
    print(f"Wrote {OUT_APPLE.relative_to(REPO_ROOT)}  ({os.path.getsize(OUT_APPLE)} bytes)")

    # Pillow's ICO writer takes one base image plus a list of sizes and
    # internally produces the multi-resolution container.
    ico_base = make_square(mark, 256)
    ico_base.save(
        OUT_ICO,
        "ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
    print(f"Wrote {OUT_ICO.relative_to(REPO_ROOT)}  ({os.path.getsize(OUT_ICO)} bytes)")


if __name__ == "__main__":
    main()
