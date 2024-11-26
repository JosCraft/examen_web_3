import jwt
from datetime import datetime, timedelta
from src.models.user_model import User

SECRET_KEY = "XrkLgy5qnB"
ALGORITHM = "HS256"

def generar_token(correo:str,nombre:str) -> str:
    payload = {
        "sub": correo,
        "nombre": nombre,
        "exp": datetime.utcnow() + timedelta(hours=1),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
