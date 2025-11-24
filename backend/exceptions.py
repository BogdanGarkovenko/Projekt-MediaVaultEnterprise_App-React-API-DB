from fastapi import HTTPException, status

def movie_not_found():
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Movie not found"
    )
