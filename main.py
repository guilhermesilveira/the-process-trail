import json
from pathlib import Path
from tqdm import tqdm

from git import clone
from log import Log, process_output


def get_logs(folder: Path) -> list[Log]:
    format_param = """--format=%h|||%an|||%ad"""
    cmd = ["git", "log", "--reflog", "--reverse", "--no-decorate", format_param]
    result = process_output(cmd, folder)
    logs = result.splitlines()
    logs = [Log(line) for line in logs]
    return logs


def analyze(logs: list[Log], folder: Path):
    name = folder.parent / f"{folder.name}.json"
    results = []

    file_map = {}
    authors = {}
    for log in tqdm(logs):
        results.append(log.resume(folder, file_map, authors))

    with open(name, "w") as fp:
        json.dump(results, fp)


def process(uri: str):
    folder = clone(uri)
    logs = get_logs(folder)
    analyze(logs, folder)


def main(git_source:str):
    process(git_source)


if __name__ == '__main__':
    main("https://github.com/processing/processing4")
