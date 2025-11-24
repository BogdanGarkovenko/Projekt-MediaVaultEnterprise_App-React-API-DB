from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session
import crud
import exceptions
from schemas import MovieOut, MovieCreate, MovieUpdate

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("/", response_model=list[MovieOut])
def list_movies(
    search: str | None = None,
    genre: str | None = None,
    db: Session = Depends(get_db)
):
    return crud.get_movies(db, search, genre)

@router.get("/{movie_id}", response_model=MovieOut)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = crud.get_movie(db, movie_id)
    if not movie:
        exceptions.movie_not_found()
    return movie

@router.post("/", response_model=MovieOut)
def create_movie(data: MovieCreate, db: Session = Depends(get_db)):
    return crud.create_movie(db, data)

@router.put("/{movie_id}", response_model=MovieOut)
def update_movie(movie_id: int, data: MovieUpdate, db: Session = Depends(get_db)):
    movie = crud.get_movie(db, movie_id)
    if not movie:
        exceptions.movie_not_found()
    return crud.update_movie(db, movie, data)

@router.delete("/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = crud.get_movie(db, movie_id)
    if not movie:
        exceptions.movie_not_found()
    crud.delete_movie(db, movie)
    return {"message": "Movie deleted"}
