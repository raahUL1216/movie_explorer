from app.database.db import SessionLocal
from app.models.movie import (
    Movie,
    Actor,
    Director,
    Genre,
    MovieReview,
)

db = SessionLocal()

def get_or_create_genre(name, slug, description):
    genre = db.query(Genre).filter_by(name=name).first()
    if not genre:
        genre = Genre(name=name, slug=slug, description=description)
        db.add(genre)
        db.flush()  # Push to DB so it's available for relationships
    return genre

def get_or_create_director(name):
    director = db.query(Director).filter_by(name=name).first()
    if not director:
        director = Director(name=name)
        db.add(director)
        db.flush()
    return director

def get_or_create_actor(name):
    actor = db.query(Actor).filter_by(name=name).first()
    if not actor:
        actor = Actor(name=name)
        db.add(actor)
        db.flush()
    return actor

try:
    # --------------------
    # 1. Fetch or Create Genres
    # --------------------
    action = get_or_create_genre("Action", "action", "High-energy films")
    sci_fi = get_or_create_genre("Science Fiction", "science-fiction", "Futuristic concepts")
    drama = get_or_create_genre("Drama", "drama", "Emotion-driven storytelling")
    thriller = get_or_create_genre("Thriller", "thriller", "Suspenseful films")
    
    crime = get_or_create_genre("Crime", "crime", "Criminal acts and justice")
    mystery = get_or_create_genre("Mystery", "mystery", "Solving puzzles or crimes")
    biography = get_or_create_genre("Biography", "biography", "Life stories of real people")

    # --------------------
    # 2. Fetch or Create Directors
    # --------------------
    nolan = get_or_create_director("Christopher Nolan")
    villeneuve = get_or_create_director("Denis Villeneuve")
    scorsese = get_or_create_director("Martin Scorsese")
    oppenheimer_dir = get_or_create_director("Christopher Nolan") # Same as nolan

    # --------------------
    # 3. Fetch or Create Actors
    # --------------------
    leo = get_or_create_actor("Leonardo DiCaprio")
    matt = get_or_create_actor("Matt Damon")
    cillian = get_or_create_actor("Cillian Murphy")
    emily = get_or_create_actor("Emily Blunt")
    bale = get_or_create_actor("Christian Bale")
    gosling = get_or_create_actor("Ryan Gosling")
    ana = get_or_create_actor("Ana de Armas")

    # --------------------
    # 4. Define New Movies
    # --------------------
    new_movies = [
        Movie(
            title="Oppenheimer",
            release_year=2023,
            director=nolan,
            genres=[drama, biography, thriller],
            actors=[cillian, emily, matt]
        ),
        Movie(
            title="The Dark Knight",
            release_year=2008,
            director=nolan,
            genres=[action, crime, thriller],
            actors=[bale, get_or_create_actor("Heath Ledger")]
        ),
        Movie(
            title="Blade Runner 2049",
            release_year=2017,
            director=villeneuve,
            genres=[sci_fi, drama, mystery],
            actors=[gosling, ana, get_or_create_actor("Harrison Ford")]
        ),
        Movie(
            title="The Departed",
            release_year=2006,
            director=scorsese,
            genres=[crime, thriller, drama],
            actors=[leo, matt, get_or_create_actor("Jack Nicholson")]
        ),
        Movie(
            title="Arrival",
            release_year=2016,
            director=villeneuve,
            genres=[sci_fi, drama, mystery],
            actors=[get_or_create_actor("Amy Adams"), get_or_create_actor("Jeremy Renner")]
        ),
        Movie(
            title="The Wolf of Wall Street",
            release_year=2013,
            director=scorsese,
            genres=[biography, crime, drama],
            actors=[leo, get_or_create_actor("Jonah Hill"), get_or_create_actor("Margot Robbie")]
        )
    ]

    db.add_all(new_movies)
    db.flush() # Get IDs for the movies to link reviews

    # --------------------
    # 5. Add Reviews
    # --------------------
    for movie in new_movies:
        review = MovieReview(
            movie=movie,
            reviewer_name="DataBot",
            rating=5,
            comment=f"Automated review for {movie.title}."
        )
        db.add(review)

    db.commit()
    print("✅ 6 new movies (and associated data) verified and inserted successfully.")

except Exception as e:
    db.rollback()
    print(f"❌ An error occurred: {e}")
finally:
    db.close()