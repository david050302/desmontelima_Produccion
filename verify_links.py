from pathlib import Path
from urllib.parse import urlparse
import re

root = Path(".").resolve()
broken = []

for html_path in sorted(root.rglob("*.html")):
    text = html_path.read_text(encoding="utf-8")
    for match in re.finditer(r'(?:href|src)=(["\'])(.*?)\1', text, re.IGNORECASE):
        url = match.group(2).strip()
        if not url:
            continue
        parsed = urlparse(url)
        if parsed.scheme or parsed.netloc:
            continue
        if url.startswith("#"):
            continue
        if url.startswith("javascript:"):
            continue
        if url.startswith("mailto:") or url.startswith("tel:"):
            continue

        clean_url = parsed.path
        if clean_url.startswith("/"):
            candidate = root / clean_url.lstrip("/")
        else:
            candidate = (html_path.parent / clean_url).resolve()

        candidates = [candidate, candidate.with_suffix(".html"), candidate / "index.html"]
        if not any(c.exists() for c in candidates):
            broken.append((html_path.relative_to(root), url, [str(c.relative_to(root)) for c in candidates]))

if not broken:
    print("OK: no broken internal references detected.")
else:
    print(f"BROKEN: {len(broken)} broken references found.")
    for html, url, candidates in broken:
        print(f"{html} -> {url} => {candidates}")
