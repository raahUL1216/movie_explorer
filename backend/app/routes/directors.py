from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.database.db import get_db
from app.models.movie import Director

router = APIRouter(prefix="/directors", tags=["Directors"])

@router.get("/")
def list_directors(
    db: Session = Depends(get_db)
):
    query = db.query(Director)

    return query.distinct().all()


@router.get("/{director_id}")
def get_director(
    director_id: int,
    db: Session = Depends(get_db)
):
    director = db.query(Director).options(
        joinedload(Director.movies)
    ).filter(Director.id == director_id).first()

    if not director:
        raise HTTPException(status_code=404, detail="Director not found")

    return director