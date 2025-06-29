from pydantic import BaseModel as ScBaseModel
from pydantic import model_validator
from typing import List, Optional

class ReviewCreate(ScBaseModel):
    imdb_id: str
    user_opinion: str
    user_rating: int

class ReviewResponse(ScBaseModel):
    user_opinion: str
    user_rating: int

class MovieResponse(ScBaseModel):
    title: str
    year: int
    imdb_id: str
    genre: str
    director: str
    actors: List[str]
    imdb_rating: str
    plot: str
    poster: str = ""
    reviews: List[ReviewResponse]

class MovieSearchRequest(ScBaseModel):
    imdb_id: Optional[str] = None
    title: Optional[str] = None
    year: Optional[int] = None

    @model_validator(mode="after")
    def validate_search(self):
        if self.imdb_id:
            return self
        if self.title and self.year:
            return self
        raise ValueError("Você deve informar imdb_id OU title e year juntos.")
    
class LoginRequest(ScBaseModel):
    user_name: str
    pwd: str
    
class UsuarioResponse(ScBaseModel):
    nome: str
    sobrenome: str
    email: str
    eh_admin: str
    auth_token: str 
    