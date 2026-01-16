from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.movie import Genre

router = APIRouter(prefix="/genres", tags=["Genres"])

@router.get("/")
def list_genres(db: Session = Depends(get_db)):
    return db.query(Genre).all()
