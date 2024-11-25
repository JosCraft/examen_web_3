import jwt
from datetime import datetime, timedelta
from fastapi import Depends, Security
from src.models.user_model import UsuarioDomain

SECRET_KEY = "XrkLgy5qnB"  
ALGORITHM = "HS256"

def generar_token(user :UsuarioDomain) -> str:
    payload = {
        "sub": user.idUsuario,
        "nombre": user.nombre,
        "exp": datetime.utcnow() + timedelta(hours=2)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

