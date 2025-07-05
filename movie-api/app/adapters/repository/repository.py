from typing import List
from sqlalchemy.orm import Session
from app.application.ports import MovieRepositoryPort
from infrastructure.models.review_model import ReviewModel
from app.domain.entities import Review

class SqlliteMovieRepository(MovieRepositoryPort):
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
        
    def update_review(self, imdb_id: str, review: Review) -> None:
            # Atualiza um review existente baseado no imdb_id e user_opinion
            review_model = self.session.query(ReviewModel).filter(
                ReviewModel.imdb_id == imdb_id,
                ReviewModel.user_opinion == review.user_opinion
            ).first()
            if review_model:
                review_model.user_rating = review.user_rating
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
    
    def get_reviews_by_id(self, id: str) -> List[Review]:
    # Retrieves all reviews from the database and returns them as Review entities.

        review_models = self.session.query(ReviewModel).filter(ReviewModel.id == id).all()
        reviews = []
        for review_model in review_models:
            review = Review(
                imdb_id=review_model.imdb_id,
                user_opinion=review_model.user_opinion,
                user_rating=review_model.user_rating
            )
            reviews.append(review)
        return reviews
    

