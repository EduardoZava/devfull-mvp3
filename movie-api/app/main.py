from fastapi import FastAPI
from app.api.v1.endpoints import router as v1_router
from app.core.config import get_api_v1_str, get_project_name
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=get_project_name())

# Configuração do CORS
origins = [
    "http://localhost:8000",  # ONDE SEU BACKEND ESTÁ RODANDO
    "http://localhost:3000",  # ONDE SEU APP REACT ESTÁ RODANDO
    # Adicione outras origens aqui se seu frontend for deployado em outro domínio/porta
    # "http://seu-dominio-frontend.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Permitir cookies/credenciais se você os usa
    allow_methods=["*"],     # Permitir todos os métodos (GET, POST, PUT, DELETE, OPTIONS, etc.)
    allow_headers=["*"],     # Permitir todos os cabeçalhos
)

app.include_router(v1_router, prefix=get_api_v1_str(), tags=["v1"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="localhost", port=8000, log_level="info", reload=True)
# To run the application, use the command:
# uvicorn app.main:app --reload
# uvicorn app.main:app --host localhost --port 8000 --reload

