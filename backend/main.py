from fastapi import FastAPI, Depends, Request
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from typing import Optional

import crud
from database import Base, engine, get_db
from schemas import MovieCreate, MovieUpdate, MovieOut


app = FastAPI(title="MediaVault API")

# -----------------------
# DATABASE INIT
# -----------------------
Base.metadata.create_all(bind=engine)


# -----------------------
# CORS (frontend → backend)
# -----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Trusted Hosts
# -----------------------
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "*"]
)


# -----------------------
# GLOBAL ANTI-XSS FILTER
# (broni przed <script>, event handlers w URL, itp.)
# -----------------------
def sanitize_query(value: Optional[str]) -> Optional[str]:
    if value is None:
        return None
    return (
        value.replace("<", "")
             .replace(">", "")
             .replace("script", "")
             .replace("onerror", "")
             .replace("onload", "")
    )


# -----------------------
# MOVIE ENDPOINTS
# -----------------------

@app.get("/movies", response_model=list[MovieOut])
def get_movies(
    db: Session = Depends(get_db),
    search: Optional[str] = None,
    genre: Optional[str] = None,
    director: Optional[str] = None,
    year: Optional[int] = None,
    min_rating: Optional[float] = None,
    max_rating: Optional[float] = None,
    sort_by: Optional[str] = None,
    order: Optional[str] = "asc",
    page: int = 1,
    limit: int = 12,
):
    # sanitize GET params
    search = sanitize_query(search)
    genre = sanitize_query(genre)
    director = sanitize_query(director)
    sort_by = sanitize_query(sort_by)
    order = sanitize_query(order)

    return crud.get_movies_filtered(
        db=db,
        search=search,
        genre=genre,
        director=director,
        year=year,
        min_rating=min_rating,
        max_rating=max_rating,
        sort_by=sort_by,
        order=order,
        page=page,
        limit=limit,
    )


@app.post("/movies", response_model=MovieOut)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    return crud.create_movie(db=db, movie=movie)


@app.put("/movies/{movie_id}", response_model=MovieOut)
def update_movie(movie_id: int, movie: MovieUpdate, db: Session = Depends(get_db)):
    return crud.update_movie(db=db, movie_id=movie_id, movie=movie)


@app.delete("/movies/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    return crud.delete_movie(db=db, movie_id=movie_id)
@app.get("/movies/{movie_id}", response_model=MovieOut)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    return crud.get_movie(db=db, movie_id=movie_id)