from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.validate import router as validate_router
from .routers.words import router as words_router
from .routers.stats import router as stats_router

app = FastAPI(
    title="Vocabulary Practice API",
    version="1.0.0",
    description="API for vocabulary practice and learning"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(validate_router, prefix="/api")
app.include_router(words_router, prefix="/api")
app.include_router(stats_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "API is running"}