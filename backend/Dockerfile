#!/bin/bash

FROM python:3.11.6-slim
WORKDIR /app

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.6.1

RUN pip install "poetry==$POETRY_VERSION"

COPY poetry.lock pyproject.toml ./

RUN poetry config virtualenvs.create true \
    && poetry install --no-interaction --no-ansi

COPY . .

EXPOSE 5000

# Run Flask app
CMD ["poetry", "run", "waitress-serve", "--port", "5000", "wsgi:app"]