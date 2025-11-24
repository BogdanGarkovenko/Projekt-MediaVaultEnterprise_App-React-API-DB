from sqlalchemy import Column, Integer, String, Float, Text
from database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    genre = Column(String(50), nullable=False)
    year = Column(Integer, nullable=False)
    rating = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    poster_url = Column(String(255), nullable=True)
