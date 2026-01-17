#### Initialize alembic (not required, alembic is already initialized. for reference only)
> poetry run alembic init alembic

#### Run data migrations
> poetry run alembic revision --autogenerate -m "create movie explorer tables"

> poetry run alembic upgrade head

### Launch backend server
> poetry install 

> poetry run python -m app.main
