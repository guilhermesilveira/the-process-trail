from pathlib import Path


def process_output(cmd: list[str], folder: Path) -> str:
    import subprocess
    result = subprocess.run(cmd, cwd=folder, capture_output=True)
    return result.stdout.decode("UTF-8")


class Log:
    def __init__(self, line: str):
        p1 = line.index("|||")
        p2 = line.rindex("|||")
        self.hash = line[:p1]
        self.author = line[p1 + 3:p2]
        self.moment = line[p2 + 3:]

    def files(self, folder: Path) -> dict[str, int]:
        diff = process_output(f"git diff --numstat {self.hash}~ {self.hash}".split(" "), folder).splitlines()
        all_files = {}
        for delta in diff:
            parts = delta.split("\t")
            if parts[0] == '-':
                # binary
                delta_number = 1
            else:
                delta_number = int(parts[0]) + int(parts[1])
            file_name = parts[2]
            all_files[file_name] = delta_number
        return all_files

    def __repr__(self):
        return f"Log {self.hash} {self.author} {self.moment}"

    def resume(self, folder: Path, file_map: dict[str, int], authors: dict[str, int]) -> dict:
        # TODO use the delta from time?
        delta = 1
        files = self.files(folder)

        file_numbers = dict[int, int]()
        for file in files.keys():
            if file not in file_map:
                file_map[file] = len(file_map) + 1
            k = file_map[file]
            file_numbers[k] = files[file]

        if self.author not in authors:
            authors[self.author] = len(authors) + 1

        return {
            "author": authors[self.author],
            "delta": delta,
            "files": file_numbers
        }
