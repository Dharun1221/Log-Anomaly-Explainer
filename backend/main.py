import logging
import os
import uuid

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from agent import explain_log
from parser import extract_error_context

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

MAX_FILE_SIZE = 50 * 1024 * 1024
SEVERITY_KEYWORDS = ["FATAL", "CRITICAL", "ERROR", "EXCEPTION", "TRACEBACK"]

app = FastAPI(title="Log Anomaly Explainer API")

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
allow_origins = [origin.strip() for origin in origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 50 MB.")

    safe_name = f"{uuid.uuid4()}.log"
    file_path = os.path.join(UPLOAD_DIR, safe_name)

    try:
        with open(file_path, "wb") as handle:
            handle.write(contents)

        context = extract_error_context(file_path)
        analysis = explain_log(context)

        is_critical = any(keyword in context.upper() for keyword in SEVERITY_KEYWORDS)

        return {
            "status": "success",
            "severity": "CRITICAL" if is_critical else "NORMAL",
            "log_lines": len(context.splitlines()),
            "error_context": context,
            "analysis": analysis,
        }
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Analysis failed")
        raise HTTPException(status_code=500, detail="Analysis failed. Please check your log file and try again.") from exc
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)