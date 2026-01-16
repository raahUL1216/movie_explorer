def test_list_directors(client, seed_data):
    response = client.get("/directors/")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Christopher Nolan"


def test_get_director_detail(client, seed_data):
    director_id = seed_data["director"].id

    response = client.get(f"/directors/{director_id}")
    assert response.status_code == 200

    data = response.json()
    assert data["name"] == "Christopher Nolan"
    assert len(data["movies"]) == 1


def test_get_director_not_found(client):
    response = client.get("/directors/999")
    assert response.status_code == 404
