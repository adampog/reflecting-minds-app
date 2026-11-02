#!/usr/bin/env python3
"""Build the original stroke-based RMA entry icon set."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ICON = {
    "list": '<path d="M4 5h.1M8 5h12M4 12h.1M8 12h12M4 19h.1M8 19h12"/>',
    "reel": '<rect x="3.5" y="4" width="17" height="16" rx="3"/><path d="m10 8 5 4-5 4z"/>',
    "surprise": '<path d="M6 3.5h8l4 4v13H6zM14 4v4h4"/><path d="M9 12q.4-2 2.6-2t2.4 1.8q.1 1.4-2 2.4v1.2m0 2v.1"/>',
    "fictional": '<path d="M4 5q4-2 8 0v15q-4-2-8 0zM20 5q-4-2-8 0v15q4-2 8 0zM7 9h2m4 0h4M7 13h2m4 0h4"/>',
    "personal": '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 3.5v17m4-10h.1"/>',
    "neutral": '<circle cx="12" cy="12" r="8.5"/><path d="M8 12h8"/>',
    "back": '<path d="M11 5 4 12l7 7M5 12h15"/>',
    "close": '<path d="m6 6 12 12M18 6 6 18"/>',
    "info": '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5m0-8h.1"/>',
    "door": '<path d="M5 21V4q0-1 1-1h13v18H5zm8-15v14m0-14 5 2v10l-5 2"/>',
    "leave": '<path d="M15 4H7v16h8M3 12h13m-4-4 4 4-4 4M15 4v16h5"/>',
    "notice": '<circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="8.2"/>',
    "motivation": '<circle cx="12" cy="13" r="2"/><path d="M12 11V5m-2.5 6.5L6 8m8.5 3.5L18 8M12 15v5"/>',
    "compare": '<rect x="3" y="5" width="8" height="14" rx="2"/><rect x="13" y="5" width="8" height="14" rx="2"/><path d="M5.5 9h3m-3 4h3m7-4h3m-3 4h3"/>',
    "discern": '<circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5M7 10h6m-3-3v6"/>',
    "respond": '<path d="M4 17q4-10 12-8"/><path d="m13 5 4 4-4 4M4 20h16"/>',
    "review": '<path d="M4 4h11l5 5v7M15 4v5h5M7 12h7M7 15h5"/><path d="M18 17a3.5 3.5 0 1 1-2.9 1.5M18 15v2.5h-2.5"/>',
    "save": '<path d="M5 3.5h14v17l-7-4-7 4z"/>',
    "export": '<path d="M12 15V4m-4 4 4-4 4 4M5 13v7h14v-7"/>',
    "delete": '<path d="M4 7h16M9 7V4h6v3m-9 0 1 13h10l1-13M10 10v7m4-7v7"/>',
    "report": '<path d="M5 3.5h10l4 4v13H5zM15 4v4h4M8 12h8m-8 4h5"/>',
    "device": '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M9 5.5h6m-3 13h.1"/>',
    "pause": '<path d="M8 5v14M16 5v14"/>',
    "play": '<path d="m8 5 10 7-10 7z"/>',
    "privacy": '<circle cx="12" cy="12" r="9" stroke-dasharray="1.2 2"/><rect x="9" y="6" width="6" height="12" rx="1.5"/><path d="M11 8h2m-1 8h.1"/>',
}
CATEGORIES = {
    "entry": ["list", "reel", "surprise", "fictional", "personal", "neutral", "back", "close", "info", "door", "leave"],
    "stages": ["notice", "motivation", "compare", "discern", "respond", "review"],
    "utility": ["save", "export", "delete", "report", "device", "pause", "play", "privacy"],
}

def svg(path):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{path}</svg>\n'

def main():
    (ROOT / "icons").mkdir(exist_ok=True)
    for name, path in ICON.items():
        (ROOT / "icons" / f"{name}.svg").write_text(svg(path), encoding="utf-8")
    symbols = "".join(f'<symbol id="{name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">{path}</symbol>' for name, path in ICON.items())
    (ROOT / "sprite.svg").write_text(f'<svg xmlns="http://www.w3.org/2000/svg">{symbols}</svg>\n', encoding="utf-8")
    cols, cell_w, cell_h = 5, 100, 76
    rows = (len(ICON) + cols - 1) // cols
    tiles = []
    for index, name in enumerate(ICON):
        x, y = (index % cols) * cell_w, (index // cols) * cell_h
        tiles.append(f'<use href="#{name}" x="{x+36}" y="{y+5}" width="28" height="28" color="#394941"/><text x="{x+50}" y="{y+59}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#29332F">{name}</text>')
    preview = f'<svg xmlns="http://www.w3.org/2000/svg" width="{cols*cell_w}" height="{rows*cell_h}" viewBox="0 0 {cols*cell_w} {rows*cell_h}"><rect width="100%" height="100%" fill="#FFF8EE"/><defs>{symbols}</defs>{"".join(tiles)}</svg>\n'
    preview_path = ROOT / "preview.svg"
    preview_path.write_text(preview, encoding="utf-8")
    import subprocess
    subprocess.run(["rsvg-convert", "-o", str(ROOT / "preview.png"), str(preview_path)], check=True)
    metadata = {"status": "proposed, review-only", "grid": "24x24", "stroke": "currentColor", "fill": "none", "stroke_width": 1.75, "categories": CATEGORIES, "icons": list(ICON), "stage_icons_are_navigation_only": True, "completion_state_or_reward_marks": False, "source": "original hand-built SVG paths, rounded layered-paper direction A"}
    (ROOT / "ICONS.json").write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    entries = []
    for p in sorted(ROOT.rglob("*")):
        if p.is_file() and p.name != "MANIFEST.sha256":
            entries.append(f"{hashlib.sha256(p.read_bytes()).hexdigest()}  {p.relative_to(ROOT).as_posix()}")
    (ROOT / "MANIFEST.sha256").write_text("\n".join(entries) + "\n", encoding="utf-8")
    assert len(ICON) == 25 and sum(map(len, CATEGORIES.values())) == 25
    assert all('stroke="currentColor"' in svg(path) and 'fill="none"' in svg(path) for path in ICON.values())
    print(f"Built {len(ICON)} icons; manifest has {len(entries)} files")

if __name__ == "__main__":
    main()
