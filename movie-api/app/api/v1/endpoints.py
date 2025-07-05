# File: app/api/v1/endpoints.py
from fastapi import APIRouter, Depends, HTTPException, status, Body
from typing import List
from app.application.services import MovieService
from app.api.v1.schemas import  ReviewCreate, ReviewResponse, ReviewRequest, MovieResponse, MovieRequest, LoginRequest, UsuarioResponse
from app.adapters.http.omdb_client import OMDbMovieProvider
from app.adapters.repository.repository import SqlliteMovieRepository
from infrastructure.db.db import get_db
from sqlalchemy.orm import Session

router = APIRouter()

def get_movie_service(db: Session = Depends(get_db)) -> MovieService:
    repo = SqlliteMovieRepository(db)
    # OMDb API key should come from environment/config in real app
    provider = OMDbMovieProvider(api_key="38e11782")
    service = MovieService(repo, provider)
    return service

@router.post("/create-review", status_code=201)
def create_review(review: ReviewCreate, service: MovieService = Depends(get_movie_service)):
    service.add_review(review.imdb_id, review.user_opinion, review.user_rating)
    return {"message": "Review Incluido com sucesso !"}

@router.post("/search-movie", response_model=List[MovieResponse])
def search_movies(search: MovieRequest,service: MovieService = Depends(get_movie_service)):
    if search.imdb_id:
        movie = service.get_consolidated_movie_by_imdb(search.imdb_id)
        movie.poster = service.provider.get_poster_by_imdb(search.imdb_id)
    else:
       if search.title and search.year:
          movie = service.get_consolidated_movie(search.title, search.year)
          movie.poster = service.provider.get_poster_by_imdb(movie.imdb_id)
       else:
          raise HTTPException(status_code=400, detail="imdbid or title and year query parameter required")
    
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    # Convert movie to response model
    #movie_response = MovieResponse.from_domain(movie)
    # Return a list with a single movie response
    return [movie]

# NOVO ENDPOINT: Pesquisar reviews por IMDb ID
@router.post("/search-review", response_model=List[ReviewResponse])
def search_reviews_by_imdb_id_post(imdb_id: str = Body(..., embed=True), service: MovieService = Depends(get_movie_service)):
    """
    Search reviews by IMDb ID of a movie.
    """
    reviews_entity = service.get_reviews(imdb_id)
    if not reviews_entity:
        return []  # Returns an empty list if no review is found

    # Convert each Review entity to the ReviewResponse schema
    return [ReviewResponse.model_validate(r.__dict__) for r in reviews_entity]

# NOVO ENDPOINT: Pesquisar reviews por IMDb ID
@router.put("/update-review", response_model=List[ReviewResponse])
def update_reviews_by_imdb_id_post(imdb_id: str = Body(..., embed=True), service: MovieService = Depends(get_movie_service)):
    """
    Search reviews by IMDb ID of a movie.
    """
    reviews_entity = service.get_reviews(imdb_id)
    if not reviews_entity:
        return []  # Returns an empty list if no review is found
    
    # Convert each Review entity to the ReviewResponse schema
    return [ReviewResponse.model_validate(r.__dict__) for r in reviews_entity]

@router.post("/login", response_model=UsuarioResponse) # <--- Definir o response_model com o schema de usuário
async def login(search: LoginRequest):
    # 1. Validação básica para o mock:
    user_name_stripped = search.user_name.strip()
    pwd_stripped = search.pwd.strip()

    if not user_name_stripped or not pwd_stripped:
        raise HTTPException(
            status_code=400,
            detail="Usuário e senha são obrigatórios e não podem ser vazios."
        )
    
    if "@" not in user_name_stripped:
        raise HTTPException(
            status_code=400,
            detail="Usuário deve ser um email válido (conter '@')."
        )

    # 2. Lógica hardcoded do mock para simular sucesso ou falha:
    if user_name_stripped == "eduardozava@gmail.com" and pwd_stripped == "xpto1234":
        user_logado_data = {
            "nome": "Eduardo",
            "sobrenome": "Zava",
            "email": "eduardozava@gmail.com",
            "eh_admin": "sim",
            "auth_token": "TokenForEduardoZava"  # Mock token
        }
        # Retorna uma instância do seu schema de resposta de usuário
        return UsuarioResponse(**user_logado_data)
    else:
        # Simula falha de autenticação
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha inválidos."
        )


