ERROR_KEYWORDS = [
    "ERROR",
    "EXCEPTION",
    "FATAL",
    "CRITICAL",
    "TRACEBACK"
]

def extract_error_context(log_path, context_lines=20):

    with open(log_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    for i, line in enumerate(lines):

        if any(keyword in line.upper() for keyword in ERROR_KEYWORDS):

            start = max(0, i - context_lines)
            end = min(len(lines), i + context_lines + 1)

            return "".join(lines[start:end])

    return "No errors found."