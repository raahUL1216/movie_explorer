from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class GenreOut(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)

class ActorOut(BaseModel):
    id: int
    name: str
    
    model_config = ConfigDict(from_attributes=True)

class DirectorOut(BaseModel):
    id: int
    name: str
    
    model_config = ConfigDict(from_attributes=True)

class MovieOut(BaseModel):
    id: int
    title: str
    release_year: int
    director: DirectorOut
    genres: List[GenreOut]
    actors: List[ActorOut]
    
    model_config = ConfigDict(from_attributes=True)

class MovieReviewOut(BaseModel):
    id: int
    reviewer_name: str
    rating: int
    comment: Optional[str]
    
    model_config = ConfigDict(from_attributes=True)

class MovieDetailOut(BaseModel):
    id: int
    title: str
    release_year: int
    director: DirectorOut
    genres: List[GenreOut]
    actors: List[ActorOut]
    reviews: List[MovieReviewOut]
    
    model_config = ConfigDict(from_attributes=True)
    