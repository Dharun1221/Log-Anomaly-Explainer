from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from parser import extract_error_context
from agent import explain_log

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    file_path = file.filename

    with open(file_path, "wb") as f:
        f.write(await file.read())

    context = extract_error_context(file_path)

    result = explain_log(context)

    return {
                "status": "success",
        "severity": "CRITICAL" if "ERROR" in context.upper() else "NORMAL",
        "log_lines": len(context.splitlines()),
        "error_context": context,
        "analysis": result
    }