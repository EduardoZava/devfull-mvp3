from typing import List
from pydantic_settings import BaseSettings

from sqlalchemy.ext.declarative import declarative_base

class Settings(BaseSettings):
    PROJECT_NAME: str = "Movie Review API"
    API_V1_STR: str = "/api/v1"
    IP_LOCAL: str = "localhost"  # Default IP, can be overridden by environment variable
    DB_PASSWORD: str = "xpto1234"  # Default password, can be overridden by environment variable

    @property
    def DB_URL(self) -> str:
        return f"postgresql+psycopg2://postgres:{self.DB_PASSWORD}@{self.IP_LOCAL}:5432/moviedb"

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"
settings = Settings()
Base = declarative_base()
def get_settings() -> Settings:
    return settings
def get_database_url() -> str:
    return settings.DB_URL
def get_api_v1_str() -> str:
    return settings.API_V1_STR
def get_project_name() -> str:
    return settings.PROJECT_NAME
def get_db_password() -> str:
    return settings.DB_PASSWORD
def get_allowed_hosts() -> List[str]:
    return ["localhost"]  # Add more allowed hosts as needed

