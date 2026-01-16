def test_list_genres(client, seed_data):
    response = client.get("/genres/")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Sci-Fi"
