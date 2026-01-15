from app.database.db import SessionLocal
from app.models.movie import (
    Movie,
    Actor,
    Director,
    Genre,
    MovieReview,
)

db = SessionLocal()

# --------------------
# Genres
# --------------------
action = Genre(
    name="Action",
    slug="action",
    description="High-energy films with stunts, chases, and explosions"
)

drama = Genre(
    name="Drama",
    slug="drama",
    description="Emotion-driven storytelling with character depth"
)

sci_fi = Genre(
    name="Science Fiction",
    slug="science-fiction",
    description="Futuristic concepts, technology, and speculative science"
)

thriller = Genre(
    name="Thriller",
    slug="thriller",
    description="Suspenseful films designed to keep audiences on edge"
)

# --------------------
# Actors
# --------------------
leo = Actor(name="Leonardo DiCaprio")
joseph = Actor(name="Joseph Gordon-Levitt")
ellen = Actor(name="Elliot Page")
matt = Actor(name="Matt Damon")

# --------------------
# Directors
# --------------------
nolan = Director(name="Christopher Nolan")
villeneuve = Director(name="Denis Villeneuve")

# --------------------
# Movies
# --------------------
inception = Movie(
    title="Inception",
    release_year=2010,
    director=nolan,
    genres=[action, sci_fi, thriller],
    actors=[leo, joseph, ellen],
)

interstellar = Movie(
    title="Interstellar",
    release_year=2014,
    director=nolan,
    genres=[sci_fi, drama],
    actors=[leo],
)

dune = Movie(
    title="Dune",
    release_year=2021,
    director=villeneuve,
    genres=[sci_fi, drama],
    actors=[matt],
)

# --------------------
# Reviews
# --------------------
reviews = [
    MovieReview(
        movie=inception,
        reviewer_name="Alice",
        rating=5,
        comment="Mind-bending and visually stunning."
    ),
    MovieReview(
        movie=inception,
        reviewer_name="Bob",
        rating=4,
        comment="Complex but rewarding experience."
    ),
    MovieReview(
        movie=interstellar,
        reviewer_name="Charlie",
        rating=5,
        comment="Emotional and scientifically ambitious."
    ),
    MovieReview(
        movie=dune,
        reviewer_name="Dana",
        rating=4,
        comment="Epic world-building and visuals."
    ),
]

# --------------------
# Persist Data
# --------------------
db.add_all([
    action,
    drama,
    sci_fi,
    thriller,
    leo,
    joseph,
    ellen,
    matt,
    nolan,
    villeneuve,
    inception,
    interstellar,
    dune,
    *reviews,
])

db.commit()
db.close()

print("✅ Mock data inserted successfully.")
