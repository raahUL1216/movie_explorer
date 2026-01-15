# --- Stage 1: Builder ---
FROM python:3.11-slim AS builder

ENV POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=true \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    PATH="/opt/poetry/bin:$PATH"

RUN apt-get update && apt-get install -y curl && \
    curl -sSL https://install.python-poetry.org | python3 -

WORKDIR /app

# Install dependencies into a local .venv folder
COPY pyproject.toml poetry.lock ./
RUN $POETRY_HOME/bin/poetry install --no-interaction --no-ansi --no-root --only main

# --- Stage 2: Final Runtime ---
FROM python:3.11-slim

WORKDIR /app

# Copy only the installed dependencies from the builder
COPY --from=builder /app/.venv /app/.venv
COPY . .

# Set environment variables to use the virtualenv
ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1

CMD ["python", "-m", "main"]