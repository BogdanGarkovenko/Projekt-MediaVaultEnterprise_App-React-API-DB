from sqlalchemy.orm import Session
from models import Movie
from schemas import MovieCreate, MovieUpdate
from sqlalchemy import asc, desc


def get_movies(db: Session):
    return db.query(Movie).all()


def get_movie(db: Session, movie_id: int):
    return db.query(Movie).filter(Movie.id == movie_id).first()


def create_movie(db: Session, movie: MovieCreate):
    db_movie = Movie(**movie.dict())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie


def update_movie(db: Session, movie_id: int, movie: MovieUpdate):
    db_movie = get_movie(db, movie_id)
    if not db_movie:
        return None

    for field, value in movie.dict().items():
        setattr(db_movie, field, value)

    db.commit()
    db.refresh(db_movie)
    return db_movie


def delete_movie(db: Session, movie_id: int):
    db_movie = get_movie(db, movie_id)
    if not db_movie:
        return None

    db.delete(db_movie)
    db.commit()
    return True


def get_movies_filtered(
    db,
    search=None,
    genre=None,
    director=None,
    year=None,
    min_rating=None,
    max_rating=None,
    sort_by=None,
    order=None,
    page: int = 1,
    limit: int = 12,
):
    query = db.query(Movie)

    if search:
        query = query.filter(Movie.title.ilike(f"%{search}%"))

    if genre:
        query = query.filter(Movie.genre.ilike(f"%{genre}%"))

    if director:
        query = query.filter(Movie.director.ilike(f"%{director}%"))

    if year:
        query = query.filter(Movie.year == year)

    if min_rating:
        query = query.filter(Movie.rating >= min_rating)

    if max_rating:
        query = query.filter(Movie.rating <= max_rating)

    # Sortowanie
    if sort_by:
        field = getattr(Movie, sort_by)
        query = query.order_by(field.asc() if order == "asc" else field.desc())

    # paginacja
    offset = (page - 1) * limit
    query = query.offset(offset).limit(limit)

    return query.all()