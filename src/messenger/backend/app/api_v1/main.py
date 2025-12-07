from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()

public_path = Path(__file__).parent.parent.parent.parent / "frontend" / "public"

app.mount("/static", StaticFiles(directory=public_path), name="static")

@app.get("/")
async def root():
    return FileResponse(public_path / "index.html")