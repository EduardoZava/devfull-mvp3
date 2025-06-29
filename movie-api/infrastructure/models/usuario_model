from sqlalchemy import Column, Integer, String, Text, Boolean
from infrastructure.models.base import BaseModel


class UsuarioModel(BaseModel):
    __tablename__ = "usuarios"
    nome = Column(String, index=True)
    sobrenome = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    senha = Column(String, index=True)
    eh_admin = Column(String, index=True)
    id = Column(Integer, primary_key=True, autoincrement=True)