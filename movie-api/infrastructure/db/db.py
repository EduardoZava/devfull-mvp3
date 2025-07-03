# infrastructure/db/db.py
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
import os

# Define the SQLite database URL (file-based)
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./moviedb.sqlite3"
)

# Create the SQLAlchemy engine and session local factory
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, bind=engine)

Base = declarative_base()

# This function provides a session to interact with the database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
