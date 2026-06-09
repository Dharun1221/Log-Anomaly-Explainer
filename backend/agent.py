import logging
import os

from google import genai
from google.genai import types
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load from backend/.env (falls back to environment variable if already set)
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

_client = None


def get_client():
    global _client

    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        return None

    if _client is None:
        _client = genai.Client(
            api_key=api_key,
            http_options=types.HttpOptions(timeout=30000),
        )

    return _client

def _fallback_analysis(log_text, reason):
    text = log_text.lower()

    root_cause = "The log indicates a failure in the application path; inspect the first error line and its surrounding context."
    if "database" in text or "sql" in text or "connection" in text:
        root_cause = "A database or dependency connection problem is likely causing the failure, such as slow queries, exhausted pools, or timeout errors."
    elif "timeout" in text:
        root_cause = "A request or dependency timeout is blocking the service, likely due to latency or resource exhaustion."
    elif "memory" in text or "out of memory" in text:
        root_cause = "The service appears to be under memory pressure, which can cause failures or slowdowns."
    elif "permission" in text or "access denied" in text:
        root_cause = "The application is hitting an authorization or permission issue in its environment or dependency."

    impact = "This incident can cause failed requests, delayed processing, and degraded user experience until the underlying fault is fixed."
    fix = "Review the failing dependency, add explicit retries/timeouts, confirm configuration, and monitor resource usage to prevent recurrence."

    if "database" in text or "sql" in text:
        fix = "Inspect the slow query or database connection usage, optimize the query, and increase or tune the connection pool if needed."
    elif "timeout" in text:
        fix = "Reduce latency in the dependent service, tune timeout settings, and add retry/backoff handling for transient failures."

    return (
        "Gemini API key is not configured, so a local fallback analysis is being returned.\n"
        f"Reason: {reason}\n\n"
        "1. Root Cause: " + root_cause + "\n"
        "2. Impact: " + impact + "\n"
        "3. Suggested Fix: " + fix + "\n\n"
        "Detected log context:\n" + log_text
    )


def explain_log(log_text):
    if not log_text or log_text.strip() in ("No errors found.", ""):
        return "No errors detected in this log file. Nothing to analyze."

    client = get_client()
    if client is None:
        return _fallback_analysis(log_text, "GEMINI_API_KEY is not set in the environment.")

    prompt = f"""
You are a senior DevOps engineer.

Analyze this log.

Provide:
1. Root Cause
2. Impact
3. Suggested Fix

Log:
{log_text}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        return response.text
    except Exception as exc:
        logger.warning("Gemini analysis failed: %s", exc, exc_info=True)
        return _fallback_analysis(log_text, f"Gemini API request failed: {exc}")