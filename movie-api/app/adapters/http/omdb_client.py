import requests
from app.adapters.http.translator import convert_omdb_to_movie
from app.domain.entities import Movie

class OMDbMovieProvider:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "http://www.omdbapi.com/"
        self.poster_url = "https://img.omdbapi.com/"

    
    def get_movie_details_by_imdb(self, imdb_id: str) -> Movie | None:
        params = {"apikey": self.api_key, "i": imdb_id, "plot": "full"}
        try:
            resp = requests.get(self.base_url, params=params, timeout=100)
            if resp.status_code != 200:
                return None
            data = resp.json()
            if data.get("Response") == "False":
                return None
            return convert_omdb_to_movie(data)
        except requests.RequestException:
            return None
        #return self.get_movie_by_imdb_id(imdb_id)
        
    def get_poster_by_imdb(self, imdb_id: str) -> str | None:
        params = {"apikey": self.api_key, "i": imdb_id}
        try:
            resp = requests.get(self.poster_url, params=params)
            if resp.status_code != 200:
                return None         
            return requests.get(self.poster_url, params=params).url
        except requests.RequestException:
            return None
        #return self.get_movie_by_imdb_id(imdb_id)

    def get_movie_details(self, title: str, year: int) -> Movie | None:
        params = {"apikey": self.api_key, "t": title, "y": year, "plot": "full"}
        try:
            resp = requests.get(self.base_url, params=params, timeout=100)
            if resp.status_code != 200:
                return None
            data = resp.json()
            if data.get("Response") == "False":
                return None
            return convert_omdb_to_movie(data)
        except requests.RequestException:
            return None
        
    

