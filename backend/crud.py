from sqlalchemy.orm import Session
from models import Movie
from schemas import MovieCreate, MovieUpdate

def get_movies(db: Session, search: str | None, genre: str | None):
    query = db.query(Movie)

    if search:
        query = query.filter(Movie.title.ilike(f"%{search}%"))

    if genre:
        query = query.filter(Movie.genre == genre)

    return query.all()

def get_movie(db: Session, movie_id: int):
    return db.query(Movie).filter(Movie.id == movie_id).first()

def create_movie(db: Session, data: MovieCreate):
    movie = Movie(**data.dict())
    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie

def update_movie(db: Session, movie: Movie, data: MovieUpdate):
    for key, value in data.dict().items():
        setattr(movie, key, value)
    db.commit()
    db.refresh(movie)
    return movie

def delete_movie(db: Session, movie: Movie):
    db.delete(movie)
    db.commit()
