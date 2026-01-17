import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# load env variables
from dotenv import load_dotenv
load_dotenv()

from app.database.db import get_db
from app.routes import movies, actors, genres, directors


app = FastAPI(
    title="Movie Explorer API",
    description="Explore movies, actors, directors, and genres",
    version="1.0.0"
)

app.include_router(movies.router)
app.include_router(actors.router)
app.include_router(genres.router)
app.include_router(directors.router)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/health')
def health_check(db: Session = Depends(get_db)):
    return {'message': 'Movie Explorer service is up 🚀'}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
