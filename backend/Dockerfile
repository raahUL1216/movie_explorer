# --- Stage 1: Builder ---
FROM python:3.11-slim AS builder

ENV POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=true \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    PATH="/opt/poetry/bin:$PATH"

RUN apt-get update && apt-get install -y curl && \
    curl -sSL https://install.python-poetry.org | python3 -

# Use /src or /backend as the root so the "app" folder is a CHILD of this directory
WORKDIR /src

COPY pyproject.toml poetry.lock ./
RUN $POETRY_HOME/bin/poetry install --no-interaction --no-ansi --no-root

# --- Stage 2: Tester ---
FROM builder AS tester

# Copy all files into /src
COPY . .

# Install everything including dev deps and the root package
RUN $POETRY_HOME/bin/poetry install --no-interaction --no-ansi

# Set PYTHONPATH to the WORKDIR (/src) so that "import app" finds the folder ./app
ENV PYTHONPATH=/src
RUN $POETRY_HOME/bin/poetry run pytest -vv -s && touch .tests-passed

# --- Stage 3: Final Runtime ---
FROM python:3.11-slim

WORKDIR /src

COPY --from=tester /src/.venv /src/.venv
COPY --from=tester /src/.tests-passed .tests-passed
COPY . .

ENV PATH="/src/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/src

# Run using the module path
CMD ["python", "-m", "app.main"]