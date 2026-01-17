from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.database.db import get_db

from app.models.movie import Actor, Genre, Movie, Director
from app.schemas.movie import MovieDetailOut, MovieOut

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/", response_model=list[MovieOut])
def list_movies(
    searchTerm: str | None = None,
    db: Session = Depends(get_db)
):
    query = (
        db.query(Movie)
        .outerjoin(Movie.genres)
        .outerjoin(Movie.actors)
        .outerjoin(Movie.director)
    )

    print(searchTerm)
    if searchTerm:
        term = f"%{searchTerm.strip()}%"
        query = query.filter(
            or_(
                Movie.title.ilike(term),
                Genre.name.ilike(term),
                Actor.name.ilike(term),
                Director.name.ilike(term),
            )
        )
        print(query)

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
