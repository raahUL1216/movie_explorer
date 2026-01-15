from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.movie import Director

router = APIRouter(prefix="/directors", tags=["Directors"])

@router.get("/{director_id}")
def list_directors(
    director_id: int,
    db: Session = Depends(get_db)
):
    director = db.query(Director).filter(Director.id == director_id).first()

    if not director:
        raise HTTPException(status_code=404, detail="Director not found")

    return director