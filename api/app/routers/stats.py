from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import os
from pathlib import Path

router = APIRouter()

STATS_FILE = Path("stats.json")

from typing import List, Optional

class StatsResponse(BaseModel):
    streak: int
    total_minutes_learned: int
    history: List[float] = []

class ProgressUpdate(BaseModel):
    minutes: int = 5
    score: Optional[float] = None

def load_stats():
    if not STATS_FILE.exists():
        return {"streak": 0, "total_minutes_learned": 0, "history": []}
    try:
        with open(STATS_FILE, "r") as f:
            data = json.load(f)
            if "history" not in data:
                data["history"] = []
            return data
    except json.JSONDecodeError:
        return {"streak": 0, "total_minutes_learned": 0, "history": []}

def save_stats(stats):
    with open(STATS_FILE, "w") as f:
        json.dump(stats, f)

@router.get("/stats", response_model=StatsResponse)
async def get_stats():
    return load_stats()

@router.post("/stats/progress", response_model=StatsResponse)
async def update_progress(update: ProgressUpdate):
    stats = load_stats()
    stats["streak"] += 1
    stats["total_minutes_learned"] += update.minutes
    if update.score is not None:
        stats["history"].append(update.score)
        if len(stats["history"]) > 10:
             stats["history"] = stats["history"][-10:]
    save_stats(stats)
    return stats
