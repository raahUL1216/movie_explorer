from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.movie import Actor, Movie, Genre

router = APIRouter(prefix="/actors", tags=["Actors"])

@router.get("/", response_model=None)
def get_actors(
    movie_id: int | None = Query(None),
    genre_id: int | None = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Actor)

    if movie_id:
        query = query.join(Actor.movies).filter(Movie.id == movie_id)

    if genre_id:
        query = query.join(Actor.movies).join(Movie.genres).filter(Genre.id == genre_id)

    return query.distinct().all()
