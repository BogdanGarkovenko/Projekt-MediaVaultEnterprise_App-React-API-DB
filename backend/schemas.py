from pydantic import BaseModel, validator, HttpUrl
from typing import Optional

def _sanitize_text(v: Optional[str]) -> Optional[str]:
    if v is None:
        return v
    # minimal sanitization: escape angle brackets and remove script/onerror
    return (
        v.replace("<", "&lt;")
         .replace(">", "&gt;")
         .replace("script", "")
         .replace("onerror", "")
         .replace("onload", "")
         .strip()
    )

class MovieBase(BaseModel):
    title: str
    studio: Optional[str] = None
    cast: Optional[str] = None
    director: Optional[str] = None
    genre: Optional[str] = None
    year: Optional[int] = None
    rating: Optional[float] = None
    description: Optional[str] = None
    poster_url: Optional[HttpUrl] = None

    _sanitize_title = validator("title", allow_reuse=True)(_sanitize_text)
    _sanitize_studio = validator("studio", allow_reuse=True)(_sanitize_text)
    _sanitize_cast = validator("cast", allow_reuse=True)(_sanitize_text)
    _sanitize_director = validator("director", allow_reuse=True)(_sanitize_text)
    _sanitize_genre = validator("genre", allow_reuse=True)(_sanitize_text)
    _sanitize_description = validator("description", allow_reuse=True)(_sanitize_text)
    # poster_url validated as HttpUrl automatically

class MovieCreate(MovieBase):
    pass

class MovieUpdate(MovieBase):
    pass

class MovieOut(MovieBase):
    id: int

    class Config:
        orm_mode = True