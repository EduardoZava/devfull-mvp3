from typing import List
from sqlalchemy.orm import Session
from app.application.ports import MovieRepositoryPort
from infrastructure.models.review_model import ReviewModel
from app.domain.entities import Review

class PostgresMovieRepository(MovieRepositoryPort):
    def __init__(self, session: Session):
        self.session = session

    def save_review(self, imdb_id: str, review: Review) -> None:
        review_model = ReviewModel(
            imdb_id=imdb_id,
            user_opinion=review.user_opinion,
            user_rating=review.user_rating
        )
        self.session.add(review_model)
        self.session.commit()

    def get_reviews_by_imdb_id(self, imdb_id: str) -> List[Review]:
        # Retrieves all reviews from the database and returns them as Review entities.

        review_models = self.session.query(ReviewModel).filter(ReviewModel.imdb_id == imdb_id).all()
        reviews = []
        for review_model in review_models:
            review = Review(
                imdb_id=review_model.imdb_id,
                user_opinion=review_model.user_opinion,
                user_rating=review_model.user_rating
            )
            reviews.append(review)
        return reviews
    

