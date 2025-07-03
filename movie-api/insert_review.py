# movie-api/insert_review.py
# Script para inserir uma review de exemplo na tabela 'reviews'

# Importa SessionLocal para obter a sessão do banco de dados
# Ajuste o caminho de importação conforme sua estrutura real,
# se 'infrastructure.db.db' for um módulo diferente de 'app.db'.
from infrastructure.db.db import SessionLocal

# Importa o modelo ReviewModel
# Ajuste o caminho de importação conforme sua estrutura real,
# se 'infrastructure.models.base' for um módulo diferente de 'app.adapters.repository.models'.
from infrastructure.models.review_model import ReviewModel # Assumindo que ReviewModel está aqui

def insert_sample_review():
    """
    Insere uma review de exemplo na tabela 'reviews'.
    """
    db = SessionLocal() # Obtém uma nova sessão de banco de dados
    try:
        print("Attempting to insert a sample review...")

        # Crie uma lista de instâncias do seu modelo ReviewModel com os dados das reviews
        sample_reviews = [
            ReviewModel(imdb_id="tt0133093", user_opinion="Um filme revolucionário! Ação e filosofia na medida certa.", user_rating=10),
            ReviewModel(imdb_id="tt0110912", user_opinion="Diálogos incríveis e narrativa não linear.", user_rating=9),
            ReviewModel(imdb_id="tt0468569", user_opinion="O melhor Coringa do cinema.", user_rating=10),
            ReviewModel(imdb_id="tt0109830", user_opinion="Uma história emocionante e inspiradora.", user_rating=9),
            ReviewModel(imdb_id="tt1375666", user_opinion="Roteiro complexo e visual impressionante.", user_rating=8),
            ReviewModel(imdb_id="tt0137523", user_opinion="Um clássico cult com reviravoltas.", user_rating=9),
            ReviewModel(imdb_id="tt0120737", user_opinion="Fantasia épica e personagens marcantes.", user_rating=10),
            ReviewModel(imdb_id="tt0167260", user_opinion="Continuação à altura do primeiro filme.", user_rating=9),
            ReviewModel(imdb_id="tt0080684", user_opinion="A melhor sequência da saga Star Wars.", user_rating=10),
            ReviewModel(imdb_id="tt0102926", user_opinion="Animação tocante e inesquecível.", user_rating=8),
        ]

        # Adiciona todas as reviews à sessão
        db.add_all(sample_reviews)
        # Confirma a transação no banco de dados
        db.commit()
        # Atualiza os objetos para obter os IDs gerados pelo banco de dados
        for review in sample_reviews:
            db.refresh(review)
            print(f"Review inserida com sucesso! ID: {review.id}, IMDb ID: {review.imdb_id}")

        # Adiciona a review à sessão
        db.add(sample_review)
        # Confirma a transação no banco de dados
        db.commit()
        # Atualiza o objeto para obter o ID gerado pelo banco de dados
        db.refresh(sample_review)

        print(f"Review inserida com sucesso! ID: {sample_review.id}, IMDb ID: {sample_review.imdb_id}")

    except Exception as e:
        db.rollback() # Em caso de erro, desfaz a transação
        print(f"Erro ao inserir review: {e}")
    finally:
        db.close() # Garante que a sessão do banco de dados seja fechada

if __name__ == "__main__":
    insert_sample_review()