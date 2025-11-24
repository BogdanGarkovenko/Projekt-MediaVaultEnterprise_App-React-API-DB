from pydantic import BaseModel, Field

class MovieBase(BaseModel):
    title: str = Field(..., min_length=1)
    genre: str
    year: int
    rating: float = Field(..., ge=0, le=10)
    description: str | None = None
    poster_url: str | None = None

class MovieCreate(MovieBase):
    pass

class MovieUpdate(MovieBase):
    pass

class MovieOut(MovieBase):
    id: int

    class Config:
        orm_mode = True
