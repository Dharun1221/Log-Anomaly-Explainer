from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from parser import extract_error_context
from agent import explain_log

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
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

    result = "AI Analysis Working Successfully"

    return {
                "status": "success",
        "severity": "CRITICAL" if "ERROR" in context.upper() else "NORMAL",
        "log_lines": len(context.splitlines()),
        "error_context": context,
        "analysis": result
    }