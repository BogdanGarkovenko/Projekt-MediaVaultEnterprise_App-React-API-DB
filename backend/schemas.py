from pydantic import BaseModel
from typing import Optional

class MovieBase(BaseModel):
    title: str
    studio: Optional[str] = None
    cast: Optional[str] = None
    director: Optional[str] = None
    genre: str
    year: int
    rating: float
    description: Optional[str] = None
    poster_url: Optional[str] = None

class MovieCreate(MovieBase):
    pass

class MovieUpdate(BaseModel):
    title: Optional[str] = None
    studio: Optional[str] = None
    cast: Optional[str] = None
    director: Optional[str] = None
    genre: Optional[str] = None
    year: Optional[int] = None
    rating: Optional[float] = None
    description: Optional[str] = None
    poster_url: Optional[str] = None

class MovieOut(MovieBase):
    id: int

    class Config:
        from_attributes = True