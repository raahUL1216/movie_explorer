from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db import Base

# Association tables
movie_genres = Table(
    "movie_genres",
    Base.metadata,
    Column("movie_id", ForeignKey("movies.id"), primary_key=True),
    Column("genre_id", ForeignKey("genres.id"), primary_key=True),
)

movie_actors = Table(
    "movie_actors",
    Base.metadata,
    Column("movie_id", ForeignKey("movies.id"), primary_key=True),
    Column("actor_id", ForeignKey("actors.id"), primary_key=True),
)

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    director_id = Column(Integer, ForeignKey("directors.id"))

    director = relationship("Director", back_populates="movies")
    genres = relationship("Genre", secondary=movie_genres, back_populates="movies")
    actors = relationship("Actor", secondary=movie_actors, back_populates="movies")

class Actor(Base):
    __tablename__ = "actors"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    movies = relationship("Movie", secondary=movie_actors, back_populates="actors")

class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

    movies = relationship("Movie", secondary=movie_genres, back_populates="genres")

class Director(Base):
    __tablename__ = "directors"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)

    movies = relationship("Movie", back_populates="director")
