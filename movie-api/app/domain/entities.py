from typing import List
from dataclasses import dataclass, field

@dataclass
class Review:
    imdb_id: str  # noqa: N806  # Ignore linter warning for 'imdb'
    user_opinion: str
    user_rating: int

    def __post_init__(self):
        if not self.imdb_id or not isinstance(self.imdb_id, str):
            raise ValueError("imdb_id deve ser uma string não vazia")
        if not self.user_opinion or not isinstance(self.user_opinion, str):
            raise ValueError("user_opinion deve ser uma string não vazia")
        if not isinstance(self.user_rating, int) or not (1 <= self.user_rating <= 10):
            raise ValueError("user_rating deve ser um inteiro entre 1 e 10")
        
    
@dataclass
class Usuario:
    nome: str
    sobrenome: str
    senha: str
    email: str
    eh_admin: bool = False

    def __post_init__(self):
        if not self.nome or not self.sobrenome:
            raise ValueError("Nome e sobrenome são obrigatórios")
        if "@" not in self.email:
            raise ValueError("Email deve conter '@'")
        if len(self.senha) < 6:
            raise ValueError("Senha deve ter pelo menos 6 caracteres")  


@dataclass
class Movie:
    imdb_id: str
    title: str
    year: int
    genre: str
    director: str
    actors: List[str]
    imdb_rating: str
    plot: str
    poster: str = ""
    reviews: List[Review] = field(default_factory=list)

    def add_review(self, review: Review):
        self.reviews.append(review)
