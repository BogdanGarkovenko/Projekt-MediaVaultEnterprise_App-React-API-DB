from sqlalchemy import Column, Integer, String, Float, Text
from database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    studio = Column(String, nullable=True)
    cast = Column(Text, nullable=True)
    director = Column(String, nullable=True)
    genre = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    rating = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    poster_url = Column(String, nullable=True)