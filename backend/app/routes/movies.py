from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.database.db import get_db

from app.models.movie import Actor, Genre, Movie
from app.schemas.movie import MovieDetailOut, MovieOut

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/", response_model=list[MovieOut])
def list_movies(
    genre_id: int | None = None,
    actor_id: int | None = None,
    director_id: int | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Movie)

    if genre_id:
        query = query.join(Movie.genres).filter(Genre.id == genre_id)

    if actor_id:
        query = query.join(Movie.actors).filter(Actor.id == actor_id)

    if director_id:
        query = query.filter(Movie.director_id == director_id)

    return query.distinct().all()

@router.get("/{movie_id}", response_model=MovieDetailOut)
def get_movie_detail(movie_id: int, db: Session = Depends(get_db)):
    movie = (
        db.query(Movie)
        .options(
            joinedload(Movie.director),
            joinedload(Movie.genres),
            joinedload(Movie.actors),
            joinedload(Movie.reviews),
        )
        .filter(Movie.id == movie_id)
        .first()
    )

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    return movie
