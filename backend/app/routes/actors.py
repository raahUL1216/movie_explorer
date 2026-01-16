from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

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

@router.get("/{actor_id}", response_model=None)
def get_actor(
    actor_id: int,
    db: Session = Depends(get_db)
):
    actor = db.query(Actor).options(
        joinedload(Actor.movies)
    ).filter(Actor.id == actor_id).first()

    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")

    return actor
