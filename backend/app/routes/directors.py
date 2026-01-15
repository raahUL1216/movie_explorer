from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.movie import Director

router = APIRouter(prefix="/directors", tags=["Directors"])

@router.get("/")
def list_directors(db: Session = Depends(get_db)):
    return db.query(Director).all()
