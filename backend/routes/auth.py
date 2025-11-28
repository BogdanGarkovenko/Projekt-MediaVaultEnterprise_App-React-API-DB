from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
from config import ADMIN_USER, ADMIN_PASS, JWT_SECRET, JWT_ALG

router = APIRouter()

class LoginData(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(data: LoginData):
    if data.username != ADMIN_USER or data.password != ADMIN_PASS:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode(
        {"user": data.username, "exp": datetime.utcnow() + timedelta(hours=12)},
        JWT_SECRET,
        algorithm=JWT_ALG
    )

    return {"token": token}