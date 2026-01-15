from pydantic import BaseModel, ConfigDict
from typing import List

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
    director: DirectorOut
    genres: List[GenreOut]
    actors: List[ActorOut]
    
    model_config = ConfigDict(from_attributes=True)
