# -------------------------
# Base image with Python + Poetry
# -------------------------
FROM python:3.11-slim AS base

ENV POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=true \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/poetry/bin:$PATH"

# Install system dependencies for building Python packages
RUN apt-get update && apt-get install -y curl build-essential && \
    curl -sSL https://install.python-poetry.org | python3 - && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# -------------------------
# Dependencies stage
# -------------------------
FROM base AS deps

# Copy pyproject.toml, poetry.lock, and README.md
COPY pyproject.toml poetry.lock README.md ./

# Install all dependencies including dev dependencies (pytest, httpx)
RUN poetry install --no-interaction --no-ansi --with dev

# -------------------------
# Test stage
# -------------------------
FROM deps AS test

# Copy source code and tests
COPY . .

# Add poetry virtualenv to PATH
ENV PATH="/app/.venv/bin:$PATH"

# Optional: make tests a package to avoid pytest warnings
RUN touch tests/__init__.py || true

# Run pytest with verbose logs; fail build if tests fail
RUN poetry run pytest tests -vv -s

# Marker file so runtime depends on this stage
RUN echo "tests-passed" > /tests-passed.txt

# -------------------------
# Runtime stage
# -------------------------
FROM python:3.11-slim AS runtime

WORKDIR /app

# Copy only if tests passed
COPY --from=test /tests-passed.txt /tests-passed.txt

# Copy virtualenv and source code
COPY --from=deps /app/.venv /app/.venv
COPY . .

# Add poetry venv to PATH
ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1

# Run FastAPI app
CMD ["python", "-m", "app.main"]
