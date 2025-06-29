
---

### tests/test_services.py (exemplo simples)

```python
import pytest
from app.application.services import MovieService
from app.domain.entities import Review, Movie

class DummyRepo:
    def __init__(self):
        self.saved = []
        self.reviews = []

    def save_review(self, imdb_id: str, review: Review) -> None:
        self.saved.append((imdb_id, review))

    def get_reviews_by_imdb_id(self, imdb_id: str):
        return self.reviews

class DummyProvider:
    def __init__(self):
        self.movie = Movie(
            imdb_id="tt1234567",
            title="Test Movie",
            year=2020,
            genre="Drama",
            director="Director",
            actors=["Actor 1", "Actor 2"],
            imdb_rating="8.0",
            plot="A test plot",
            reviews=[]
        )

    def get_movie_details(self, imdb_id: str):
        if imdb_id == self.movie.imdb_id:
            return self.movie
        return None

def test_add_review_and_get_movie():
    repo = DummyRepo()
    provider = DummyProvider()
    service = MovieService(repo, provider)

    service.add_review("tt1234567", "Great movie!", 9)
    repo.reviews.append(Review(user_opinion="Great movie!", user_rating=9))

    movie = service.get_consolidated_movie("tt1234567")
    assert movie is not None
    assert movie.imdb_id == "tt1234567"
    assert len(movie.reviews) == 1
    assert movie.reviews[0].user_rating == 9
