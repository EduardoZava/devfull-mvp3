# movie-api/create_tables.py
# Script para criar as tabelas no banco de dados

from infrastructure.db.db import engine # Importa a Base e o engine do SQLAlchemy
from infrastructure.models.base import BaseModel
from infrastructure.models.movie_model import MovieModel
from infrastructure.models.review_model import ReviewModel
from infrastructure.models.usuario_model import UsuarioModel  # Importa todos os modelos definidos no módulo __all_model

def create_tables():
    """
    Cria todas as tabelas definidas na Base do SQLAlchemy no banco de dados.
    """
    print("Creating tables in the database")
    # Base.metadata.create_all(bind=engine) cria as tabelas no DB
    BaseModel.metadata.create_all(bind=engine)
    print("Tables created successfully.")

if __name__ == "__main__":
    create_tables()