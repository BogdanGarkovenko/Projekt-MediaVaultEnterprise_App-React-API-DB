from fastapi import HTTPException

def not_found(entity: str = "Obiekt"):
    raise HTTPException(
        status_code=404,
        detail=f"{entity} nie został znaleziony."
    )
def bad_request(message: str = "Nieprawidłowe żądanie."):
    raise HTTPException(
        status_code=400,
        detail=message
    )