from sqlalchemy import Column, Integer, String, Float
from database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    studio = Column(String, nullable=True)
    cast = Column(String, nullable=True)
    director = Column(String, nullable=True)
    genre = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    rating = Column(Float, nullable=False)
    description = Column(String, nullable=True)
    poster_url = Column(String, nullable=True)