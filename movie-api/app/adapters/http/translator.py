from app.domain.entities import Movie

def convert_omdb_to_movie(data: dict) -> Movie:
    actors = [a.strip() for a in data.get("Actors", "").split(",")] if data.get("Actors") else []
    return Movie(
        imdb_id=data.get("imdbID"),
        title=data.get("Title"),
        year=int(data.get("Year", "0").split("–")[0]),
        genre=data.get("Genre", ""),
        director=data.get("Director", ""),
        actors=actors,
        imdb_rating=data.get("imdbRating", ""),
        plot=data.get("Plot", ""),
        poster= "",
        reviews=[]
    )
