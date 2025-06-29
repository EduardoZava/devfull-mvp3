from sqlalchemy import Column, Integer, String, Text
from infrastructure.models.base import BaseModel


class MovieModel(BaseModel):
    __tablename__ = "movies"
    id = Column(Integer, primary_key=True)
    imdb_id = Column(String, unique=True, index=True)
    title = Column(String, index=True)
    year = Column(Integer)
