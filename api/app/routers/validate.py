from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import os

router = APIRouter()

class SentenceRequest(BaseModel):
    sentence: str
    word: str

class SentenceResponse(BaseModel):
    score: float
    level: str
    suggestion: str
    corrected_sentence: str

@router.post("/validate-sentence", response_model=SentenceResponse)
async def validate_sentence(data: SentenceRequest):
    async with httpx.AsyncClient() as client:
        try:
            payload = {
                "sentence": data.sentence,
                "word": data.word
            }
            
            # Use 127.0.0.1 to avoid localhost resolution issues
            # We urge the user to check if n8n is listening
            n8n_url = "http://127.0.0.1:5678/webhook-test/98edddd2-8016-4bef-b8d4-f96dc00c9f60"
            print(f"Connecting to n8n at: {n8n_url}")
            
            response = await client.post(
                n8n_url,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30.0
            )
            print(f"n8n Response Status: {response.status_code}")
            print(f"n8n Response Body: {response.text}")
            
            response.raise_for_status()
            result = response.json()
            
            # If n8n returns a list (sometimes happens), take the first item
            if isinstance(result, list):
                result = result[0]
                
            return SentenceResponse(**result)

        except httpx.ConnectError as e:
             print(f"n8n Connection Refused: {e}")
             raise HTTPException(status_code=503, detail="Could not connect to n8n. Is it running?")
        except httpx.HTTPStatusError as e:
            print(f"n8n HTTP Error: {e.response.text}")
            raise HTTPException(status_code=e.response.status_code, detail="Upstream service error")
        except Exception as e:
            print(f"Validation Error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")