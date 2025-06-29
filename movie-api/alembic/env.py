import os
import sys
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# Adiciona o diretório raiz ao path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Importa o Base das models
from infrastructure.models.review_model import BaseModel  # Ajuste o caminho se necessário

# Configuração do Alembic
config = context.config

# Carrega configuração de log
if config.config_file_name:
    fileConfig(config.config_file_name)
    
# Importa o modelo Base para metadata
target_metadata = BaseModel.metadata

# Pega a variável de ambiente DATABASE_URL
db_password = os.getenv("DB_PASSWORD", 'xpto1234')  # Use environment variable or default
ip_local = "127.0.0.1" # Placeholder for local IP, replace with actual IP if needed

# Define the database URL using environment variables or default values
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"postgresql+psycopg2://postgres:{db_password}@{ip_local}:5432/moviedb"
)
#db_url = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/moviedb")
config.set_main_option("sqlalchemy.url", DATABASE_URL)


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    context.configure(
        url=db_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
