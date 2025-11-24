from fastapi import FastAPI
from database import Base, engine
from routes.movies import router as movies_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Movie API")

app.include_router(movies_router)

@app.get("/")
def root():
    return {"message": "Movie API is running"}
