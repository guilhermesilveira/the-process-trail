import os
from pathlib import Path


def clone(gituri) -> Path:
    import subprocess

    name = gituri[gituri.rindex("/") + 1:]
    folder = Path("output") / f"{name}-log"

    if os.path.exists(folder):
        return folder

    os.makedirs(folder.parent, exist_ok=True)
    cmd = ["git", "clone", gituri, folder]
    p = subprocess.Popen(cmd)
    p.wait()
    return folder
