from abc import ABC, abstractmethod
from typing import List
from app.domain.entities import Movie, Review

class MovieRepositoryPort(ABC):
    @abstractmethod
    def save_review(self, imdb_id: str, review: Review) -> None:
        pass

    @abstractmethod
    def get_reviews_by_imdb_id(self, imdb_id: str) -> List[Review]:
        pass

class MovieProviderPort(ABC):
    @abstractmethod
    def get_movie_details_by_imdb(self, imdb_id: str) -> Movie | None:
        pass
    @abstractmethod
    def get_movie_details(self, title: str,year: str) -> Movie | None:
        pass
    
class UsuarioRepositoryPort(ABC):
    @abstractmethod
    def get_login(self, user_name: str, pwd: str) -> str | None:
        """Returns a token if the user is authenticated, otherwise None."""
        pass
