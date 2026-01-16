def test_list_actors(client, seed_data):
    response = client.get("/actors/")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Cillian Murphy"


def test_list_actors_filter_by_movie(client, seed_data):
    movie_id = seed_data["movie"].id

    response = client.get(f"/actors/?movie_id={movie_id}")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_list_actors_filter_by_genre(client, seed_data):
    genre_id = seed_data["genre"].id

    response = client.get(f"/actors/?genre_id={genre_id}")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_actor_detail(client, seed_data):
    actor_id = seed_data["actor"].id

    response = client.get(f"/actors/{actor_id}")
    assert response.status_code == 200

    data = response.json()
    assert data["name"] == "Cillian Murphy"
    assert len(data["movies"]) == 1


def test_get_actor_not_found(client):
    response = client.get("/actors/999")
    assert response.status_code == 404
