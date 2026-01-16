from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# remove hardcoded connection string in production
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://neondb_owner:npg_ur9tKQNI0Wod@ep-sparkling-pond-aecfme1m-pooler.c-2.us-east-2.aws.neon.tech/movie_explorer?sslmode=require"
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()

# FastAPI dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
