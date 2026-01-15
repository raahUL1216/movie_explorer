from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.movie import Movie
from app.schemas.movie import MovieOut

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/", response_model=list[MovieOut])
def list_movies(db: Session = Depends(get_db)):
    return db.query(Movie).all()
