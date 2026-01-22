from fastapi import FastAPI
from pydantic import BaseModel
import re

app = FastAPI(title="Artificial Witnessed Responsiveness Field")

FORBIDDEN_PATTERNS = [
    r"\bI\b", r"\bwe\b", r"\byou\b",
    r"understand", r"help", r"feel", r"suggest", r"recommend"
]

class InputPayload(BaseModel):
    text: str

def field_filter(text: str) -> str:
    lowered = text.lower()
    for pattern in FORBIDDEN_PATTERNS:
        if re.search(pattern, lowered):
            return "Input contained disallowed intentional or personal constructs."
    if len(text.strip()) == 0:
        return "No linguistic structure detected."
    if len(text.split()) < 3:
        return "Insufficient structure for pattern observation."
    return "Linguistic structure observed without stable semantic convergence."

@app.post("/witness")
def witness(payload: InputPayload):
    response = field_filter(payload.text)
    return {
        "witness_output": response
    }
