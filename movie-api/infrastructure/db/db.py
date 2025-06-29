# infrastructure/db/db.py
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
import os

db_password = os.getenv("DB_PASSWORD", "xpto1234")  # Use environment variable or default
ip_local = "localhost" # Placeholder for local IP, replace with actual IP if needed

# Define the database URL using environment variables or default values
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"postgresql+psycopg2://postgres:{db_password}@{ip_local}:5432/moviedb"
)

# Create the SQLAlchemy engine and session local factory
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, bind=engine)

Base = declarative_base()

# This function provides a session to interact with the database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
