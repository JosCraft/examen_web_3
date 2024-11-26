from fastapi import APIRouter, Depends, HTTPException, status
from src.controllers.auth_controller import AuthController
from src.models.user_model import User
from src.services.jwt_service import generar_token
from src.view.dtoAuth import authDTO

auth_router = APIRouter(prefix="/api/v1", tags=["auth"])

@auth_router.post("/login", response_model=str)
async def login(
    auth_dto: authDTO,
    auth_controller: AuthController = Depends()):
    """
    Iniciar sesión con un usuario existente.
    """
    token = await auth_controller.login(
        auth_dto.correo,
        auth_dto.contrasena
    )
    print(token)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Correo o contraseña incorrectos")
    return token