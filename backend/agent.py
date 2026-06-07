import google.generativeai as genai

GEMINI_API_KEY = "AQ.Ab8RN6JKV9F2So4iZBVN0aq8y2cQbd4ko0x0CAR0w5VELbNUDw"

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

def explain_log(log_text):

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

    response = model.generate_content(prompt)

    return response.text