import os
import stat
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
out = root / "13thpencil-hostinger.zip"
skip_dirs = {"node_modules", ".next", ".git", ".playwright-mcp", ".cursor"}
skip_files = {"tsconfig.tsbuildinfo", ".env", ".env.local", "13thpencil-hostinger.zip"}

files = []
for dirpath, dirnames, filenames in os.walk(root):
    dirnames[:] = [d for d in dirnames if d not in skip_dirs]
    for name in filenames:
        if name in skip_files:
            continue
        full = Path(dirpath) / name
        rel = full.relative_to(root).as_posix()
        files.append((full, rel))

if out.exists():
    out.unlink()

with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED) as zf:
    dirs = set()
    for _, rel in files:
        parent = Path(rel).parent
        while parent.as_posix() not in {".", ""}:
            dirs.add(parent.as_posix())
            parent = parent.parent
    dirs = sorted(dirs)
    for directory in dirs:
        info = zipfile.ZipInfo(directory.rstrip("/") + "/")
        info.external_attr = (0o40755 << 16) | stat.FILE_ATTRIBUTE_DIRECTORY
        zf.writestr(info, "")
    for full, rel in files:
        info = zipfile.ZipInfo(rel)
        info.external_attr = 0o100644 << 16
        info.compress_type = zipfile.ZIP_DEFLATED
        zf.writestr(info, full.read_bytes())

print(f"wrote {out} ({out.stat().st_size} bytes, {len(files)} files)")
