from fastapi import APIRouter
from app.api.v1.endpoints import endpoints


router = APIRouter()
router.include_router(endpoints.router, prefix="/movie", tags=["movie"])


