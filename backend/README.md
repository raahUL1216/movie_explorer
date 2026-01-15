#### Initialize alembic (not required if already initialized)
> poetry run alembic init alembic

#### add mock data (not required if data is present)
> poetry run alembic revision --autogenerate -m "create movie explorer tables"
> poetry run alembic upgrade head

### Launch backend server
> poetry install && poetry run python -m main
