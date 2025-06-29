# Movie Opinion API

API RESTful para gerenciar opiniões e avaliações de usuários sobre filmes, integrando dados da OMDb API.

## Requisitos

# alembic

 pip3 install alembic
 alembic init alembic
 alembic revision -m "first"
 alembic revision -m "second"
 alembic upgrade head
 

## ambiente do postgresql


 necessitei remover e instalar novamente o postgres no localhost

 systemctl stop postgresql
 systemctl status postgresql

 

Remove PostgreSQL packages:
Open a terminal and run the following command to remove the main package: sudo apt-get --purge remove postgresql.
To remove any remaining PostgreSQL packages, use the following command: sudo apt-get --purge remove postgresql*.
Alternatively, you can list all PostgreSQL packages using dpkg -l | grep postgres and then remove them individually using sudo apt-get --purge remove <package_name>.

ezava@ezava-Lenovo:~/dsv/Projetos/architecture_challenge/movie-api$ dpkg -l | grep postgres
ezava@ezava-Lenovo:~/dsv/Projetos/architecture_challenge/movie-api$ sudo rm -rf /var/lib/postgresql/
ezava@ezava-Lenovo:~/dsv/Projetos/architecture_challenge/movie-api$ sudo rm -rf /var/log/postgresql/
ezava@ezava-Lenovo:~/dsv/Projetos/architecture_challenge/movie-api$ sudo rm -rf /etc/postgresql/
ezava@ezava-Lenovo:~/dsv/Projetos/architecture_challenge/movie-api$ sudo deluser postgres.

instalei novamente
https://documentation.ubuntu.com/server/how-to/databases/install-postgresql/index.html


## Instalando Python 

sudo apt install python3-venv
venv
 
 python3 -m venv arch_venv
 source arch_venv/bin/activate
 pip3 install -r requirements.txt

 se der erro remova e crie novamente 
 rm -rf /home/ezava/dsv/Projetos/Architecture_Challenge/movie-api/arch_vevv

 python3 -m venv archvenv
 note que corrigi o nome do ambiente

 fastapi run app/main.py primeiro deu um erro pedindo para instalar fastapi standart

 RuntimeError: To use the fastapi command, please install "fastapi[standard]":

        pip install "fastapi[standard]"

 Agora novamente :

 fastapi run app/main.py

  FastAPI   Starting production server 🚀
 
             Searching for package file structure from directories with __init__.py files
             Importing from /home/ezava/dsv/Projetos/Achitecture_Challenge/movie-api/app
 
    module   🐍 main.py
 
      code   Importing the FastAPI app object from the module with the following code:
 
             from main import app
 
       app   Using import string: main:app
 
    server   Server started at http://0.0.0.0:8000
    server   Documentation at http://0.0.0.0:8000/docs
 
             Logs:
 
      INFO   Started server process [17503]
      INFO   Waiting for application startup.
      INFO   Application startup complete.
      INFO   Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)

#bibliotecas adicionais 

pip3 install pydantic_settings
pip3 freeze > requirements.txt

# executando projeto

uvicorn app.main:app --host   localhost --port 8000

#chamada aos endpoints
http://localhost:8000/api/v1/search-movie

## salva no repositorio pela primeira vez

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/EduardoZava/movi-api.git
git push -u origin main

## sequencia de atualização do codigo no github

git pull
git status
git add .
git commit -m "alguns ajustes no Readme para ajustar a doc"
git push

## Docker e Docker Compose

o docker compose veio com um erro de tabulação e foi ajustado





## Chave OMDb API (http://www.omdbapi.com/)

## Configuração

Crie um arquivo `.env` na raiz do projeto:

