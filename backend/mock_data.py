from app.database.db import SessionLocal
from app.models.movie import Movie, Actor, Director, Genre

db = SessionLocal()

# Genres
action = Genre(name="Action")
drama = Genre(name="Drama")
drama = Genre(name="Drama")

# Actors
actor1 = Actor(name="Leonardo DiCaprio")
actor2 = Actor(name="Joseph Gordon-Levitt")

# Director
director = Director(name="Christopher Nolan")

# Movie
movie = Movie(
    title="Inception",
    director=director,
    genres=[action, drama],
    actors=[actor1, actor2]
)

db.add(movie)
db.commit()
db.close()

print("Mock data inserted successfully.")
