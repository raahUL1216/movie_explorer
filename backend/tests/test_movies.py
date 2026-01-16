def test_list_movies(client, seed_data):
    response = client.get("/movies/")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Oppenheimer"


def test_list_movies_filter_by_genre(client, seed_data):
    genre_id = seed_data["genre"].id

    response = client.get(f"/movies/?genre_id={genre_id}")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_list_movies_filter_by_actor(client, seed_data):
    actor_id = seed_data["actor"].id

    response = client.get(f"/movies/?actor_id={actor_id}")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_list_movies_filter_by_director(client, seed_data):
    director_id = seed_data["director"].id

    response = client.get(f"/movies/?director_id={director_id}")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_movie_detail(client, seed_data):
    movie_id = seed_data["movie"].id

    response = client.get(f"/movies/{movie_id}")
    assert response.status_code == 200

    data = response.json()
    assert data["title"] == "Oppenheimer"
    assert data["director"]["name"] == "Christopher Nolan"
    assert len(data["genres"]) == 1
    assert len(data["actors"]) == 1


def test_get_movie_detail_not_found(client):
    response = client.get("/movies/999")
    assert response.status_code == 404
