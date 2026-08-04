from pathlib import Path
import re

root = Path('.').resolve()
changed = []

distrito_pattern = re.compile(r'href="/distritos/(surco|miraflores|san-isidro|san-borja|la-molina|surquillo|san-luis|magdalena)"')
for html_path in sorted(root.rglob('*.html')):
    text = html_path.read_text(encoding='utf-8')
    new_text = distrito_pattern.sub(lambda m: f'href="/desmonte-{m.group(1)}"', text)
    if new_text != text:
        html_path.write_text(new_text, encoding='utf-8')
        changed.append(str(html_path))

trabajos_path = root / 'trabajos' / 'index.html'
if trabajos_path.exists():
    text = trabajos_path.read_text(encoding='utf-8')
    removed = text.replace(
        '                    <a href="/desmonte-barranco">\n                        Barranco\n                    </a>\n\n                    <a href="/desmonte-chorrillos">\n                        Chorrillos\n                    </a>\n\n',
        ''
    )
    if removed != text:
        trabajos_path.write_text(removed, encoding='utf-8')
        changed.append(str(trabajos_path))

print('changed', len(changed))
for p in changed:
    print(p)
